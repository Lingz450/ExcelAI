import { NextRequest, NextResponse } from "next/server";
import { apiClient } from "@/lib/api-client";
import { db } from "@/lib/db";
import { getUserFriendlyError } from "@/lib/error-messages";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const userId = formData.get("userId") as string; // From auth session

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    const validExtensions = [".xlsx", ".xlsm", ".xls"];
    const isValid = validExtensions.some((ext) =>
      file.name.toLowerCase().endsWith(ext)
    );

    if (!isValid) {
      const errorMsg = getUserFriendlyError(new Error("Invalid file type"));
      return NextResponse.json(
        { error: errorMsg.message, details: errorMsg },
        { status: 400 }
      );
    }

    // Validate file size
    const maxSize = 100 * 1024 * 1024; // 100MB
    
    if (file.size > maxSize) {
      const errorMsg = getUserFriendlyError(new Error("File too large"));
      return NextResponse.json(
        { error: errorMsg.message, details: errorMsg },
        { status: 400 }
      );
    }

    // Upload to Python backend
    const uploadResult = await apiClient.uploadFile(file);

    // Save to database (if user is authenticated)
    if (userId) {
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24);

      await db.workbooks.create({
        userId,
        originalFilename: file.name,
        storageKey: uploadResult.storagePath,
        fileSize: file.size,
        expiresAt,
      });
    }

    return NextResponse.json({
      success: true,
      workbook: {
        id: uploadResult.fileId,
        originalFilename: file.name,
        fileSize: file.size,
        metadata: uploadResult.metadata,
        uploadedAt: uploadResult.uploadedAt,
        expiresAt: uploadResult.expiresAt,
      },
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    const errorMsg = getUserFriendlyError(error);
    
    return NextResponse.json(
      { error: errorMsg.message, details: errorMsg },
      { status: 500 }
    );
  }
}

