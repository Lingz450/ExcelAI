"use client";

import { Component, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: any;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("Error caught by boundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4">
          <div className="max-w-2xl w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
            {/* Error Icon */}
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-full">
                <AlertTriangle className="h-12 w-12 text-red-600 dark:text-red-400" />
              </div>
            </div>

            {/* Error Message */}
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-4">
              Oops! Something went wrong
            </h1>
            
            <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
              We encountered an unexpected error. Don't worry - your data is safe and nothing was changed.
            </p>

            {/* Error Details (Development mode) */}
            {process.env.NODE_ENV === "development" && this.state.error && (
              <div className="mb-6 p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Error Details (dev mode):
                </p>
                <code className="text-xs text-red-600 dark:text-red-400 block overflow-auto">
                  {this.state.error.toString()}
                </code>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={this.handleReset}
                className="px-6 py-3 bg-excel-green hover:bg-excel-darkgreen text-white rounded-lg font-medium transition-all flex items-center space-x-2"
              >
                <RefreshCw className="h-5 w-5" />
                <span>Try Again</span>
              </button>
              
              <Link
                href="/"
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-medium transition-all flex items-center space-x-2"
              >
                <Home className="h-5 w-5" />
                <span>Go Home</span>
              </Link>
            </div>

            {/* Support Info */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                If this problem persists, please contact us at{" "}
                <a href="mailto:support@excelai.com" className="text-excel-green hover:underline">
                  support@excelai.com
                </a>
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

