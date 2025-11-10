/**
 * API Client for communicating with FastAPI backend
 */

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export interface UploadResponse {
  success: boolean;
  fileId: string;
  filename: string;
  fileSize: number;
  storagePath: string;
  metadata: {
    sheets: string[];
    sheetCount: number;
  };
  uploadedAt: string;
  expiresAt: string;
}

export interface PreviewResponse {
  success: boolean;
  preview: {
    sheets: string[];
    activeSheet: string;
    headers: string[];
    rows: any[][];
    totalRows: number;
    totalColumns: number;
    issues: string[];
  };
}

export interface ProcessResponse {
  success: boolean;
  jobId: string;
  status: string;
  plan: any[];
  results: any;
  diffSummary: any;
  outputPath: string;
  executionTimeMs: number;
  completedAt: string;
}

export interface ParseResponse {
  success: boolean;
  plan: any[];
  summary: string;
}

export const apiClient = {
  /**
   * Upload Excel file to backend
   */
  async uploadFile(file: File): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${BACKEND_URL}/api/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Upload failed");
    }

    return response.json();
  },

  /**
   * Get file preview (first 10 rows)
   */
  async getPreview(fileId: string): Promise<PreviewResponse> {
    const formData = new FormData();
    formData.append("file_id", fileId);

    const response = await fetch(`${BACKEND_URL}/api/preview`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Preview failed");
    }

    return response.json();
  },

  /**
   * Process Excel file with natural language request
   */
  async processFile(fileId: string, requestText: string, onProgress?: (progress: number) => void): Promise<ProcessResponse> {
    const formData = new FormData();
    formData.append("file_id", fileId);
    formData.append("request_text", requestText);

    const response = await fetch(`${BACKEND_URL}/api/process`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Processing failed");
    }

    return response.json();
  },

  /**
   * Parse request into action plan (preview)
   */
  async parseRequest(requestText: string): Promise<ParseResponse> {
    const formData = new FormData();
    formData.append("request_text", requestText);

    const response = await fetch(`${BACKEND_URL}/api/parse`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Parse failed");
    }

    return response.json();
  },

  /**
   * Download processed file
   */
  getDownloadUrl(jobId: string): string {
    return `${BACKEND_URL}/api/download/${jobId}`;
  },

  /**
   * Download file directly
   */
  async downloadFile(jobId: string, filename: string = "result.xlsx") {
    const url = this.getDownloadUrl(jobId);
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Download failed");
    }

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  },
};

