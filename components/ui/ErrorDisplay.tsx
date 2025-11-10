"use client";

import { AlertTriangle, AlertCircle, Info, XCircle } from "lucide-react";
import type { ErrorMessage } from "@/lib/error-messages";

interface ErrorDisplayProps {
  error: ErrorMessage;
  onAction?: () => void;
  onDismiss?: () => void;
}

export function ErrorDisplay({ error, onAction, onDismiss }: ErrorDisplayProps) {
  const severityConfig = {
    error: {
      icon: XCircle,
      bgColor: "bg-red-50 dark:bg-red-900/20",
      borderColor: "border-red-200 dark:border-red-800",
      iconColor: "text-red-600 dark:text-red-400",
      titleColor: "text-red-900 dark:text-red-100",
      textColor: "text-red-800 dark:text-red-200",
      buttonColor: "bg-red-600 hover:bg-red-700 text-white",
    },
    warning: {
      icon: AlertTriangle,
      bgColor: "bg-amber-50 dark:bg-amber-900/20",
      borderColor: "border-amber-200 dark:border-amber-800",
      iconColor: "text-amber-600 dark:text-amber-400",
      titleColor: "text-amber-900 dark:text-amber-100",
      textColor: "text-amber-800 dark:text-amber-200",
      buttonColor: "bg-amber-600 hover:bg-amber-700 text-white",
    },
    info: {
      icon: Info,
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-800",
      iconColor: "text-blue-600 dark:text-blue-400",
      titleColor: "text-blue-900 dark:text-blue-100",
      textColor: "text-blue-800 dark:text-blue-200",
      buttonColor: "bg-blue-600 hover:bg-blue-700 text-white",
    },
  };

  const config = severityConfig[error.severity];
  const Icon = config.icon;

  return (
    <div className={`${config.bgColor} border ${config.borderColor} rounded-lg p-4 animate-fade-in`}>
      <div className="flex items-start space-x-3">
        {/* Icon */}
        <div className="flex-shrink-0">
          <Icon className={`h-6 w-6 ${config.iconColor}`} />
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className={`font-semibold ${config.titleColor} mb-1`}>
            {error.title}
          </h3>
          <p className={`text-sm ${config.textColor} mb-2`}>
            {error.message}
          </p>
          
          {error.suggestion && (
            <p className={`text-sm ${config.textColor} mb-3`}>
              💡 <strong>Suggestion:</strong> {error.suggestion}
            </p>
          )}

          {/* Action Button */}
          {error.action && onAction && (
            <button
              onClick={onAction}
              className={`px-4 py-2 ${config.buttonColor} rounded-lg font-medium text-sm transition-all`}
            >
              {error.action}
            </button>
          )}
        </div>

        {/* Dismiss Button */}
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 p-1 hover:bg-white/50 dark:hover:bg-black/20 rounded transition-colors"
          >
            <XCircle className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        )}
      </div>
    </div>
  );
}

