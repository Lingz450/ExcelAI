"use client";

import { useState, useEffect } from "react";
import { FileUpload } from "./FileUpload";
import { CommandInput } from "./CommandInput";
import { JobHistory } from "./JobHistory";
import { JobViewer } from "./JobViewer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/Tabs";
import { Sparkles, History, FileUp } from "lucide-react";

export function WorkspaceMain() {
  const [activeJob, setActiveJob] = useState<string | null>(null);
  const [uploadedFileId, setUploadedFileId] = useState<string | null>(null);

  // Restore state from localStorage on mount
  useEffect(() => {
    const savedFileId = localStorage.getItem("excelai_uploadedFileId");
    const savedJobId = localStorage.getItem("excelai_activeJobId");
    
    if (savedFileId) {
      setUploadedFileId(savedFileId);
    }
    if (savedJobId) {
      setActiveJob(savedJobId);
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (uploadedFileId) {
      localStorage.setItem("excelai_uploadedFileId", uploadedFileId);
    } else {
      localStorage.removeItem("excelai_uploadedFileId");
    }
  }, [uploadedFileId]);

  useEffect(() => {
    if (activeJob) {
      localStorage.setItem("excelai_activeJobId", activeJob);
    } else {
      localStorage.removeItem("excelai_activeJobId");
    }
  }, [activeJob]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Your Excel Workspace
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Upload a file, describe what you need, and let AI handle the rest
        </p>
      </div>

      {/* Main workspace */}
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
          <TabsTrigger value="upload" className="flex items-center space-x-2">
            <FileUp className="h-4 w-4" />
            <span>New Job</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center space-x-2">
            <History className="h-4 w-4" />
            <span>History</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          {/* File Upload */}
          {!uploadedFileId && <FileUpload onUploadComplete={setUploadedFileId} />}

          {/* Command Input - Show after file uploaded */}
          {uploadedFileId && !activeJob && (
            <div className="space-y-6">
              {/* Show uploaded file info */}
              <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 border-2 border-excel-green rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-excel-green/10 rounded-lg">
                      <FileUp className="h-6 w-6 text-excel-green" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        File Ready
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Now tell us what you want to do
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setUploadedFileId(null)}
                    className="text-sm text-gray-500 hover:text-excel-green"
                  >
                    Upload different file
                  </button>
                </div>
              </div>
              
              <CommandInput
                workbookId={uploadedFileId}
                onJobCreated={setActiveJob}
              />
            </div>
          )}

          {/* Active Job Viewer */}
          {activeJob && <JobViewer jobId={activeJob} />}
        </TabsContent>

        <TabsContent value="history">
          <JobHistory onSelectJob={setActiveJob} />
        </TabsContent>
      </Tabs>

      {/* Quick actions */}
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-excel-green/10 to-primary-100/10 dark:from-excel-green/20 dark:to-primary-900/20 border border-excel-green/30 rounded-2xl p-6">
        <div className="flex items-start space-x-3">
          <Sparkles className="h-6 w-6 text-excel-green mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Not sure what to ask for?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
              Try these common requests:
            </p>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li>• "Remove duplicates and trim all text fields"</li>
              <li>• "Create a pivot table showing sales by region and month"</li>
              <li>• "Split Full Name column into First and Last Name"</li>
              <li>• "Convert all VLOOKUP formulas to XLOOKUP"</li>
              <li>• "Standardize phone numbers to +234 format"</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

