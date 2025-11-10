"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FileSpreadsheet, Upload, X, CheckCircle, AlertCircle } from "lucide-react";
import { formatBytes } from "@/lib/utils";
import toast from "react-hot-toast";
import { FilePreview } from "./FilePreview";

interface FileUploadProps {
  onUploadComplete: (fileId: string) => void;
}

export function FileUpload({ onUploadComplete }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: number } | null>(null);
  const [progress, setProgress] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [pendingFileId, setPendingFileId] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    
    if (!file) return;

    // Validate file
    const maxSize = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
      toast.error("File too large. Maximum size is 100MB.");
      return;
    }

    const validExtensions = [".xlsx", ".xlsm", ".xls"];
    const isValid = validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
    
    if (!isValid) {
      toast.error("Invalid file type. Please upload .xlsx, .xlsm, or .xls files.");
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      // Real API upload with progress tracking
      const formData = new FormData();
      formData.append("file", file);

      // Create XMLHttpRequest for progress tracking
      const xhr = new XMLHttpRequest();
      
      // Track upload progress
      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          setProgress(percentComplete);
        }
      });

      // Make the upload request
      const uploadPromise = new Promise<any>((resolve, reject) => {
        xhr.addEventListener("load", () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(new Error(xhr.statusText));
          }
        });
        
        xhr.addEventListener("error", () => reject(new Error("Upload failed")));
        
        xhr.open("POST", "/api/upload");
        xhr.send(formData);
      });

      const response = await uploadPromise;
      
      if (!response.success) {
        throw new Error(response.error || "Upload failed");
      }
      
      setProgress(100);
      setUploadedFile({ name: file.name, size: file.size });
      setPendingFileId(response.workbook.id);
      
      // Skip preview - directly proceed to command input
      onUploadComplete(response.workbook.id);
      toast.success("✅ File uploaded! Type your command below.");
    } catch (error: any) {
      console.error("Upload failed:", error);
      toast.error(error.message || "Failed to upload file. Please try again.");
      setProgress(0);
    } finally {
      setUploading(false);
    }
  }, []);

  const handlePreviewConfirm = () => {
    if (pendingFileId) {
      // Confirm the upload to parent
      onUploadComplete(pendingFileId);
      setShowPreview(false);
      // Keep uploadedFile set so this component knows to hide
      toast.success("File ready! Type your command below.");
    }
  };

  const handlePreviewCancel = () => {
    setShowPreview(false);
    setUploadedFile(null);
    setPendingFileId(null);
    setProgress(0);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel.sheet.macroEnabled.12': ['.xlsm'],
      'application/vnd.ms-excel': ['.xls'],
    },
    maxFiles: 1,
    disabled: uploading,
  });

  // If file is uploaded and confirmed, hide this component - parent will show CommandInput
  if (uploadedFile && !showPreview) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer
          transition-all duration-200
          ${isDragActive 
            ? "border-excel-green bg-excel-green/10 scale-105" 
            : "border-gray-300 dark:border-gray-700 hover:border-excel-green hover:bg-excel-green/5"
          }
          ${uploading ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center">
          {uploading ? (
            <>
              <div className="mb-4 relative">
                <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 border-t-excel-green rounded-full animate-spin" />
              </div>
              <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Uploading... {progress}%
              </p>
              <div className="w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-excel-green transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </>
          ) : (
            <>
              <div className="mb-4 p-4 bg-excel-green/10 rounded-full">
                {isDragActive ? (
                  <Upload className="h-12 w-12 text-excel-green animate-bounce" />
                ) : (
                  <FileSpreadsheet className="h-12 w-12 text-excel-green" />
                )}
              </div>
              
              <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {isDragActive ? "Drop your file here" : "Upload your Excel file"}
              </p>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Drag and drop or click to browse
              </p>
              
              <div className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  .xlsx, .xlsm, .xls • Max 100MB
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Security notice */}
      <div className="mt-4 flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400">
        <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
        <p>
          Your file is encrypted during upload and automatically deleted after 24 hours. 
          We never use your data for training.
        </p>
      </div>

      {/* File Preview Modal */}
      {showPreview && uploadedFile && pendingFileId && (
        <FilePreview
          fileName={uploadedFile.name}
          fileSize={uploadedFile.size}
          fileId={pendingFileId}
          onConfirm={handlePreviewConfirm}
          onCancel={handlePreviewCancel}
        />
      )}
    </div>
  );
}

