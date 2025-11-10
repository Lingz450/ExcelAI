"use client";

import { CheckCircle, Clock, Loader2, AlertCircle } from "lucide-react";

export type ProgressStep = {
  id: string;
  title: string;
  description?: string;
  status: "pending" | "in_progress" | "completed" | "failed";
  duration?: string;
  error?: string;
};

interface ProgressIndicatorProps {
  steps: ProgressStep[];
  currentStep?: number;
  showDuration?: boolean;
}

export function ProgressIndicator({ steps, currentStep = 0, showDuration = true }: ProgressIndicatorProps) {
  const getStepIcon = (step: ProgressStep) => {
    switch (step.status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-excel-green" />;
      case "in_progress":
        return <Loader2 className="h-5 w-5 text-excel-green animate-spin" />;
      case "failed":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getProgressPercentage = () => {
    const completedSteps = steps.filter(s => s.status === "completed").length;
    return Math.round((completedSteps / steps.length) * 100);
  };

  return (
    <div className="space-y-4">
      {/* Overall Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-gray-900 dark:text-white">
            Overall Progress
          </span>
          <span className="text-gray-600 dark:text-gray-400">
            {getProgressPercentage()}%
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-excel-green to-excel-lightgreen transition-all duration-500"
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>
      </div>

      {/* Step List */}
      <div className="space-y-3">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`flex items-start space-x-3 p-4 rounded-lg transition-all ${
              step.status === "in_progress"
                ? "bg-excel-green/10 border-2 border-excel-green"
                : step.status === "completed"
                ? "bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-gray-700"
                : step.status === "failed"
                ? "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                : "bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-gray-700 opacity-60"
            }`}
          >
            {/* Step Number */}
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-gray-700 font-semibold text-sm">
              {index + 1}
            </div>

            {/* Status Icon */}
            <div className="flex-shrink-0 mt-1">
              {getStepIcon(step)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {step.title}
                </h4>
                {showDuration && step.duration && step.status === "completed" && (
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                    {step.duration}
                  </span>
                )}
              </div>
              
              {step.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {step.description}
                </p>
              )}

              {step.error && step.status === "failed" && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                  ⚠ {step.error}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-900 rounded-lg text-sm">
        <span className="text-gray-700 dark:text-gray-300">
          {steps.filter(s => s.status === "completed").length} of {steps.length} steps completed
        </span>
        {steps.every(s => s.status === "completed") && (
          <span className="flex items-center text-excel-green font-medium">
            <CheckCircle className="h-4 w-4 mr-1" />
            All done!
          </span>
        )}
      </div>
    </div>
  );
}

