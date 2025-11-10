"use client";

import { useEffect, useState } from "react";
import { FileSpreadsheet, Clock, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

interface JobHistoryProps {
  onSelectJob: (jobId: string) => void;
}

interface Job {
  id: string;
  workbook: {
    originalFilename: string;
  };
  requestText: string;
  status: string;
  startedAt: string;
  executionTimeMs?: number;
}

export function JobHistoryReal({ onSelectJob }: JobHistoryProps) {
  // Fetch real job history from API
  const { data, isLoading, error } = useQuery({
    queryKey: ["jobs"],
    queryFn: async (): Promise<Job[]> => {
      const response = await fetch("/api/jobs");
      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }
      const data = await response.json();
      return data.jobs || [];
    },
    refetchInterval: 5000, // Refetch every 5 seconds
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 text-excel-green animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-white dark:bg-slate-800 border border-red-200 dark:border-red-800 rounded-2xl">
        <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <p className="text-red-600 dark:text-red-400">Failed to load job history</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {(error as Error).message}
        </p>
      </div>
    );
  }

  const jobs = data || [];

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-2xl">
        <FileSpreadsheet className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-400">No jobs yet</p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
          Upload a file to get started
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Job History</h2>
        <p className="text-gray-600 dark:text-gray-400">
          View and manage your recent Excel transformations ({jobs.length} total)
        </p>
      </div>

      <div className="space-y-4">
        {jobs.map((job: Job) => (
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
                      {job.workbook.originalFilename}
                    </h3>
                    {job.status === "COMPLETED" && (
                      <CheckCircle className="h-5 w-5 text-excel-green" />
                    )}
                    {job.status === "FAILED" && (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    {job.status === "PROCESSING" && (
                      <Loader2 className="h-5 w-5 text-excel-green animate-spin" />
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {job.requestText}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatDate(new Date(job.startedAt))}</span>
                    </span>
                    {job.executionTimeMs && (
                      <span>Duration: {(job.executionTimeMs / 1000).toFixed(1)}s</span>
                    )}
                    <span className={`px-2 py-0.5 rounded-full ${
                      job.status === "COMPLETED" ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300" :
                      job.status === "FAILED" ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300" :
                      "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"
                    }`}>
                      {job.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

