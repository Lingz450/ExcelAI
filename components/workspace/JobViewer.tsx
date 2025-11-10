"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Download, Clock, AlertTriangle, FileText, Eye } from "lucide-react";
import { formatDuration } from "@/lib/utils";
import { ProgressIndicator, type ProgressStep } from "@/components/ui/ProgressIndicator";

interface JobViewerProps {
  jobId: string;
}

export function JobViewer({ jobId }: JobViewerProps) {
  const [status, setStatus] = useState<"pending" | "processing" | "completed" | "failed">("processing");
  const [downloading, setDownloading] = useState(false);
  const [steps, setSteps] = useState<ProgressStep[]>([
    { id: "1", title: "Analyzing file structure", description: "Reading sheets and columns", status: "completed", duration: "0.5s" },
    { id: "2", title: "Cleaning text fields", description: "Applying TRIM and CLEAN functions", status: "completed", duration: "1.2s" },
    { id: "3", title: "Removing duplicate rows", description: "Found and removed 12 duplicates", status: "completed", duration: "0.8s" },
    { id: "4", title: "Creating summary sheet", description: "Building pivot table", status: "in_progress" },
    { id: "5", title: "Applying formatting", description: "Number formats and conditional formatting", status: "pending" },
  ]);

  // Calculate progress from steps
  const progress = Math.round((steps.filter(s => s.status === "completed").length / steps.length) * 100);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const response = await fetch(`/api/jobs/${jobId}/download`);
      
      if (!response.ok) {
        throw new Error("Failed to download file");
      }

      // Get the filename from the Content-Disposition header
      const contentDisposition = response.headers.get("Content-Disposition");
      let filename = "processed-file.xlsx";
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }

      // Create blob and download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download file. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  useEffect(() => {
    // Simulate job processing
    let currentStepIndex = 3; // Start at step 4 (index 3) which is in_progress
    
    const interval = setInterval(() => {
      setSteps(prevSteps => {
        const newSteps = [...prevSteps];
        
        // Complete current step
        if (currentStepIndex < newSteps.length) {
          newSteps[currentStepIndex].status = "completed";
          newSteps[currentStepIndex].duration = "1.0s";
          
          // Start next step
          currentStepIndex++;
          if (currentStepIndex < newSteps.length) {
            newSteps[currentStepIndex].status = "in_progress";
          } else {
            // All steps completed
            setStatus("completed");
            clearInterval(interval);
          }
        }
        
        return newSteps;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const mockDiff = {
    sheetsModified: ["Data", "Summary"],
    sheetsAdded: ["Clean_Data"],
    cellsChanged: 245,
    rowsDeleted: 12,
    formulasAdded: 3,
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Status Card */}
      <div className="bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            {status === "processing" && (
              <>
                <div className="w-10 h-10 border-3 border-gray-200 dark:border-gray-700 border-t-excel-green rounded-full animate-spin" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Processing...</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{progress}% complete</p>
                </div>
              </>
            )}
            {status === "completed" && (
              <>
                <div className="p-2 bg-excel-green/10 rounded-full">
                  <CheckCircle className="h-6 w-6 text-excel-green" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Completed!</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Your file is ready</p>
                </div>
              </>
            )}
          </div>
          
          {status === "completed" && (
            <button 
              onClick={handleDownload}
              disabled={downloading}
              className="px-4 py-2 bg-excel-green hover:bg-excel-darkgreen disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              {downloading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Downloading...</span>
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Progress bar */}
        {status === "processing" && (
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-excel-green transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Execution Plan with Progress Indicator */}
      <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
          <FileText className="h-5 w-5" />
          <span>Execution Plan</span>
        </h3>
        
        <ProgressIndicator steps={steps} showDuration={true} />
      </div>

      {/* Changes Summary */}
      {status === "completed" && (
        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
            <Eye className="h-5 w-5" />
            <span>Changes Made</span>
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                {mockDiff.cellsChanged}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Cells Changed</div>
            </div>
            
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                {mockDiff.sheetsAdded.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Sheets Added</div>
            </div>
            
            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 mb-1">
                {mockDiff.rowsDeleted}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Rows Deleted</div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Modified sheets:</strong> {mockDiff.sheetsModified.join(", ")}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
              <strong>New sheets:</strong> {mockDiff.sheetsAdded.join(", ")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

