"use client";

import { Zap, TrendingUp, AlertTriangle } from "lucide-react";
import type { Formula } from "@/types";

interface FormulaCardProps {
  formula: Formula;
  onClick: () => void;
}

export function FormulaCard({ formula, onClick }: FormulaCardProps) {
  const categoryColors: Record<string, string> = {
    lookup: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    text: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
    "dynamic-array": "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
    logical: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300",
    math: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
    date: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300",
    lambda: "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300",
  };

  return (
    <div
      onClick={onClick}
      className="group bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-excel-green hover:shadow-lg transition-all cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-excel-green transition-colors">
            {formula.name}
          </h3>
          <span
            className={`inline-block text-xs font-medium px-2 py-1 rounded-full mt-2 ${
              categoryColors[formula.category] || "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
            }`}
          >
            {formula.category.replace("-", " ").toUpperCase()}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {formula.isModern && (
            <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-full" title="Excel 365+">
              <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
          )}
          {formula.isVolatile && (
            <div className="p-1.5 bg-amber-100 dark:bg-amber-900/30 rounded-full" title="Volatile">
              <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
        {formula.description}
      </p>

      {/* Syntax preview */}
      <div className="bg-gray-50 dark:bg-slate-900 rounded-lg p-3 mb-4">
        <code className="text-xs text-gray-700 dark:text-gray-300 font-mono break-all">
          {formula.syntax}
        </code>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600 dark:text-gray-400">
          {formula.examples.length} {formula.examples.length === 1 ? "example" : "examples"}
        </span>
        <span className="text-excel-green group-hover:translate-x-1 transition-transform">
          View details →
        </span>
      </div>
    </div>
  );
}

