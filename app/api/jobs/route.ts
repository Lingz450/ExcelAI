import { NextRequest, NextResponse } from "next/server";
import { generateId } from "@/lib/utils";
import { AIInterpreter } from "@/lib/ai-interpreter";
import { MultiAIService } from "@/lib/ai-multi-source";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { workbookId, requestText } = body;

    if (!workbookId || !requestText) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate job ID
    const jobId = generateId();

    // Parse request using Multi-AI (OpenAI, Gemini, GPT-5)
    console.log(`[Jobs API] Processing with Multi-AI sources...`);
    const multiAI = new MultiAIService();
    const aiResponse = await multiAI.parseRequest(requestText);
    const plan = aiResponse.plan;
    
    console.log(`[Jobs API] Selected ${aiResponse.source} with confidence ${(aiResponse.confidence * 100).toFixed(0)}%`);

    // Validate the plan
    const validation = AIInterpreter.validatePlan(plan);
    
    if (!validation.valid) {
      return NextResponse.json({
        success: false,
        error: "Invalid action plan",
        errors: validation.errors,
      }, { status: 400 });
    }

    // Generate human-readable summary
    const summary = AIInterpreter.summarizePlan(plan);

    // Create job object
    const job = {
      id: jobId,
      workbookId,
      requestText,
      status: "pending",
      plan,
      summary,
      createdAt: new Date().toISOString(),
    };

    // TODO: In production with database:
    // await db.jobs.create(job);
    // await queue.add('process-excel', { jobId });

    return NextResponse.json({
      success: true,
      job,
    });
  } catch (error: any) {
    console.error("Job creation error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create job" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get("id");

    if (!jobId) {
      // Return all jobs (in production, paginated and filtered by user)
      return NextResponse.json({
        success: true,
        jobs: [], // Mock empty array
      });
    }

    // Get specific job
    // In production: const job = await db.jobs.findById(jobId);

    const mockJob = {
      id: jobId,
      workbookId: "workbook-123",
      requestText: "Clean data and remove duplicates",
      status: "completed",
      plan: [],
      result: {
        outputFile: "result.xlsx",
        diff: {
          cellsChanged: 150,
          rowsDeleted: 12,
        },
      },
      createdAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      job: mockJob,
    });
  } catch (error) {
    console.error("Job fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch job" },
      { status: 500 }
    );
  }
}

