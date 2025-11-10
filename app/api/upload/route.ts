import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { generateId } from "@/lib/utils";
import { logger, generateRequestId } from "@/lib/logger";

// Ensure uploads directory exists
const UPLOAD_DIR = path.join(process.cwd(), "uploads");

async function ensureUploadDir() {
  if (!existsSync(UPLOAD_DIR)) {
    await mkdir(UPLOAD_DIR, { recursive: true });
  }
}

export async function POST(request: NextRequest) {
  const requestId = generateRequestId();
  const endTimer = logger.upload.startTimer("File upload");
  
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      logger.upload.warn("Upload failed: No file provided", { requestId });
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    logger.upload.info("Upload started", {
      requestId,
      fileName: file.name,
      fileSize: file.size,
    });

    // Validate file type
    const validExtensions = [".xlsx", ".xlsm", ".xls"];
    const isValid = validExtensions.some((ext) =>
      file.name.toLowerCase().endsWith(ext)
    );

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid file type. Only .xlsx, .xlsm, and .xls files are allowed." },
        { status: 400 }
      );
    }

    // Validate file size (100MB max)
    const maxSize = 100 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 100MB." },
        { status: 400 }
      );
    }

    // Ensure upload directory exists
    await ensureUploadDir();

    // Generate unique filename with clean extension
    const fileId = generateId();
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Extract extension and create clean filename
    const extension = file.name.toLowerCase().endsWith(".xlsx") ? ".xlsx" :
                     file.name.toLowerCase().endsWith(".xlsm") ? ".xlsm" : ".xls";
    const cleanFilename = `${fileId}-${file.name.replace(/\.(xlsx|xlsm|xls)$/i, "")}${extension}`;

    // Save to uploads directory
    const filePath = path.join(UPLOAD_DIR, cleanFilename);
    await writeFile(filePath, buffer);

    // Calculate expiration (24 hours)
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    // Return workbook metadata
    const workbook = {
      id: fileId,
      originalFilename: file.name,
      fileSize: file.size,
      storageKey: filePath,
      uploadedAt: new Date().toISOString(),
      expiresAt: expiresAt.toISOString(),
    };

    logger.upload.info("Upload successful", {
      requestId,
      fileId,
      fileName: file.name,
      fileSize: file.size,
    });
    
    endTimer();

    return NextResponse.json({
      success: true,
      workbook,
    });
  } catch (error: any) {
    logger.upload.error("Upload failed", error, { requestId });
    endTimer();
    
    return NextResponse.json(
      { error: error.message || "Failed to upload file" },
      { status: 500 }
    );
  }
}

