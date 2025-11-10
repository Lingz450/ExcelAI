import { NextRequest, NextResponse } from "next/server";
import { readdir, unlink, stat } from "fs/promises";
import path from "path";
import { jobQueue } from "@/lib/queue";

const UPLOAD_DIR = path.join(process.cwd(), "uploads");
const MAX_AGE_HOURS = 24;

export async function POST(request: NextRequest) {
  try {
    // Verify this is an authorized cleanup request
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET || "dev-secret";
    
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    let filesDeleted = 0;
    let bytesFreed = 0;
    const now = Date.now();
    const maxAge = MAX_AGE_HOURS * 60 * 60 * 1000;

    // Clean up old uploaded files
    try {
      const files = await readdir(UPLOAD_DIR);
      
      for (const file of files) {
        const filePath = path.join(UPLOAD_DIR, file);
        const stats = await stat(filePath);
        const age = now - stats.mtimeMs;

        if (age > maxAge) {
          bytesFreed += stats.size;
          await unlink(filePath);
          filesDeleted++;
        }
      }
    } catch (error) {
      console.error("Error cleaning uploads:", error);
    }

    // Clean up old queue jobs
    const jobsRemoved = await jobQueue.cleanup();

    return NextResponse.json({
      success: true,
      filesDeleted,
      bytesFreed,
      jobsRemoved,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Cleanup error:", error);
    return NextResponse.json(
      { error: error.message || "Cleanup failed" },
      { status: 500 }
    );
  }
}

// Can also be called via cron
// Add to vercel.json:
// {
//   "crons": [{
//     "path": "/api/cleanup",
//     "schedule": "0 */6 * * *"
//   }]
// }

