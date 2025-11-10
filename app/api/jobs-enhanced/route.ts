import { NextRequest, NextResponse } from "next/server";
import { apiClient } from "@/lib/api-client";
import { OpenAIInterpreter } from "@/lib/ai-openai";
import { db } from "@/lib/db";
import { getUserFriendlyError } from "@/lib/error-messages";
import { checkSubscriptionLimits } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { workbookId, requestText, userId } = body;

    if (!workbookId || !requestText) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check rate limits (if user is authenticated)
    if (userId) {
      const user = await db.users.findByEmail(userId);
      const usage = await db.usage.getToday(userId);
      
      const subscription = user?.subscription || "FREE";
      const jobsToday = usage?.jobsRun || 0;
      
      // Get workbook for file size
      const workbook = await db.workbooks.findById(workbookId);
      const fileSize = workbook?.fileSize || 0;

      const limitCheck = checkSubscriptionLimits(subscription, {
        jobsToday,
        fileSize,
      });

      if (!limitCheck.allowed) {
        return NextResponse.json(
          { error: limitCheck.reason },
          { status: 429 }
        );
      }
    }

    // Parse request using OpenAI (with fallback to rule-based)
    const parseResult = await OpenAIInterpreter.parseRequest(requestText);

    // If confidence is low, ask for clarification
    if (parseResult.confidence < 0.6) {
      return NextResponse.json({
        success: false,
        needsClarification: true,
        clarifications: parseResult.clarifications,
        suggestedPlan: parseResult.plan,
      });
    }

    // Create job in database
    const job = await db.jobs.create({
      userId: userId || "anonymous",
      workbookId,
      requestText,
      plan: parseResult.plan,
    });

    // Process file asynchronously via backend
    try {
      await db.jobs.updateStatus(job.id, "PROCESSING");
      await db.logs.add({
        jobId: job.id,
        level: "INFO",
        message: "Job started",
        details: { plan: parseResult.plan },
      });

      // Call Python backend
      const processResult = await apiClient.processFile(workbookId, requestText);

      // Update job status
      await db.jobs.complete(job.id, processResult.executionTimeMs);

      // Save output metadata
      await db.outputs.create({
        jobId: job.id,
        outputStorageKey: processResult.outputPath,
        diffSummary: processResult.diffSummary,
        version: 1,
      });

      // Track usage
      if (userId) {
        await db.usage.track(userId);
      }

      return NextResponse.json({
        success: true,
        job: {
          id: job.id,
          status: "completed",
          plan: parseResult.plan,
          result: processResult,
        },
      });
    } catch (processingError: any) {
      // Job failed
      await db.jobs.updateStatus(job.id, "FAILED");
      await db.logs.add({
        jobId: job.id,
        level: "ERROR",
        message: "Job failed",
        details: { error: processingError.message },
      });

      throw processingError;
    }
  } catch (error: any) {
    console.error("Job creation error:", error);
    const errorMsg = getUserFriendlyError(error);
    
    return NextResponse.json(
      { error: errorMsg.message, details: errorMsg },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get("id");
    const userId = searchParams.get("userId");

    if (jobId) {
      // Get specific job
      const job = await db.jobs.findById(jobId);

      if (!job) {
        return NextResponse.json(
          { error: "Job not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        job,
      });
    }

    if (userId) {
      // Get user's job history
      const jobs = await db.jobs.findByUser(userId);

      return NextResponse.json({
        success: true,
        jobs,
      });
    }

    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Job fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

