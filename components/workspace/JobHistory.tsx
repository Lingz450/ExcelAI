"use client";

import { FileSpreadsheet, Clock, CheckCircle, XCircle } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface JobHistoryProps {
  onSelectJob: (jobId: string) => void;
}

export function JobHistory({ onSelectJob }: JobHistoryProps) {
  const mockJobs = [
    {
      id: "job-1",
      filename: "sales_data_2024.xlsx",
      request: "Create pivot table by region and month, remove duplicates",
      status: "completed" as const,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      duration: "3.2s",
    },
    {
      id: "job-2",
      filename: "customer_list.xlsx",
      request: "Split full names, standardize phone numbers to +234 format",
      status: "completed" as const,
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      duration: "2.1s",
    },
    {
      id: "job-3",
      filename: "inventory_report.xlsx",
      request: "Remove near-duplicates using fuzzy matching",
      status: "completed" as const,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      duration: "5.8s",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Job History</h2>
        <p className="text-gray-600 dark:text-gray-400">
          View and manage your recent Excel transformations
        </p>
      </div>

      {mockJobs.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-2xl">
          <FileSpreadsheet className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">No jobs yet</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
            Upload a file to get started
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {mockJobs.map((job) => (
            <div
              key={job.id}
              onClick={() => onSelectJob(job.id)}
              className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-excel-green hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="p-3 bg-excel-green/10 rounded-lg group-hover:scale-110 transition-transform">
                    <FileSpreadsheet className="h-6 w-6 text-excel-green" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {job.filename}
                      </h3>
                      {job.status === "completed" && (
                        <CheckCircle className="h-5 w-5 text-excel-green" />
                      )}
                      {job.status === "failed" && (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {job.request}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{formatDate(job.createdAt)}</span>
                      </span>
                      <span>Duration: {job.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

