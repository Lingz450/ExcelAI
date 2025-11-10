import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function GET(
  request: NextRequest,
  { params }: { params: { jobId: string } }
) {
  try {
    const { jobId } = params;

    if (!jobId) {
      return NextResponse.json(
        { error: "Job ID is required" },
        { status: 400 }
      );
    }

    // In production, fetch job details from database
    // For now, we'll look for the file in the uploads directory
    const uploadsDir = join(process.cwd(), "uploads");
    
    // Try to find processed file (would have job ID or output ID in filename)
    // For demo, we'll return the original uploaded file
    // In production, this would be the processed output file
    
    // Mock: Find any .xlsx file in uploads as a demo
    const fs = require("fs");
    const files = fs.readdirSync(uploadsDir).filter((f: string) => f.endsWith(".xlsx"));
    
    if (files.length === 0) {
      return NextResponse.json(
        { error: "No file found for this job" },
        { status: 404 }
      );
    }

    // Get the most recent file
    const filename = files[files.length - 1];
    const filePath = join(uploadsDir, filename);

    if (!existsSync(filePath)) {
      return NextResponse.json(
        { error: "File not found" },
        { status: 404 }
      );
    }

    // Read the file
    const fileBuffer = await readFile(filePath);

    // Create a response with the file
    const response = new NextResponse(fileBuffer);
    
    // Create simple, clean filename that Windows will recognize
    // Extract original name without the timestamp prefix
    const originalName = filename.includes("-") 
      ? filename.split("-").slice(2).join("-") // Remove fileId prefix
      : filename;
    const baseName = originalName.replace(/\.(xlsx|xlsm|xls)$/i, "");
    const extension = filename.toLowerCase().endsWith(".xlsm") ? ".xlsm" :
                     filename.toLowerCase().endsWith(".xls") ? ".xls" : ".xlsx";
    
    // Simple format: processed-OriginalName.xlsx
    const downloadFilename = `processed-${baseName}${extension}`;
    
    // Set headers for download - Use exact Excel MIME type for proper Windows recognition
    response.headers.set("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    response.headers.set("Content-Disposition", `attachment; filename="${downloadFilename}"`);
    response.headers.set("Content-Length", fileBuffer.length.toString());
    response.headers.set("Cache-Control", "no-cache");

    return response;
  } catch (error: any) {
    console.error("Download error:", error);
    return NextResponse.json(
      { error: "Failed to download file", details: error.message },
      { status: 500 }
    );
  }
}

