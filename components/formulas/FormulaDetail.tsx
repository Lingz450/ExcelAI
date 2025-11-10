"use client";

import { X, Copy, Check, AlertTriangle, Lightbulb, TrendingUp, Zap } from "lucide-react";
import { useState } from "react";
import type { Formula } from "@/types";
import toast from "react-hot-toast";

interface FormulaDetailProps {
  formula: Formula;
  onClose: () => void;
}

export function FormulaDetail({ formula, onClose }: FormulaDetailProps) {
  const [copiedExample, setCopiedExample] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedExample(index);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedExample(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4">
      <div className="relative w-full max-w-4xl my-8 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-excel-green to-excel-lightgreen rounded-t-2xl p-6 flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">{formula.name}</h2>
            <p className="text-white/90">{formula.description}</p>
            <div className="flex items-center space-x-2 mt-3">
              {formula.isModern && (
                <span className="inline-flex items-center px-3 py-1 bg-white/20 rounded-full text-sm text-white">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  Excel 365+
                </span>
              )}
              {formula.isVolatile && (
                <span className="inline-flex items-center px-3 py-1 bg-amber-500/30 rounded-full text-sm text-white">
                  <Zap className="h-4 w-4 mr-1" />
                  Volatile
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="h-6 w-6 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Syntax */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Syntax</h3>
            <div className="bg-gray-50 dark:bg-slate-900 rounded-lg p-4">
              <code className="text-sm text-gray-800 dark:text-gray-200 font-mono">
                {formula.syntax}
              </code>
            </div>
          </section>

          {/* Arguments */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Arguments</h3>
            <div className="space-y-3">
              {formula.arguments.map((arg, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-slate-900 rounded-lg">
                  <div className={`px-2 py-1 rounded text-xs font-medium ${arg.required ? "bg-excel-green text-white" : "bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300"}`}>
                    {arg.required ? "Required" : "Optional"}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {arg.name}
                      <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">({arg.type})</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{arg.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Examples */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Examples</h3>
            <div className="space-y-4">
              {formula.examples.map((example, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 dark:bg-slate-900 px-4 py-3 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-gray-900 dark:text-white">{example.title}</span>
                      <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                        example.level === "beginner"
                          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                          : example.level === "intermediate"
                          ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"
                          : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                      }`}>
                        {example.level}
                      </span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(example.formula, index)}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                    >
                      {copiedExample === index ? (
                        <Check className="h-4 w-4 text-excel-green" />
                      ) : (
                        <Copy className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      )}
                    </button>
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Formula</div>
                      <code className="block bg-excel-green/10 text-excel-green dark:text-excel-lightgreen p-2 rounded font-mono text-sm">
                        {example.formula}
                      </code>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Input</div>
                        <div className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-slate-900 p-2 rounded">
                          {example.input}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Output</div>
                        <div className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-slate-900 p-2 rounded">
                          {example.output}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 italic">{example.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Pitfalls */}
          {formula.pitfalls && formula.pitfalls.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                Common Pitfalls
              </h3>
              <ul className="space-y-2">
                {formula.pitfalls.map((pitfall, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm text-gray-700 dark:text-gray-300">
                    <span className="text-amber-500 mt-0.5">⚠</span>
                    <span>{pitfall}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Alternatives */}
          {formula.alternatives && formula.alternatives.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                <Lightbulb className="h-5 w-5 text-excel-green mr-2" />
                Alternatives
              </h3>
              <div className="flex flex-wrap gap-2">
                {formula.alternatives.map((alt, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-excel-green/10 text-excel-green rounded-full text-sm font-medium"
                  >
                    {alt}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Performance Notes */}
          {formula.performanceNotes && (
            <section>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                <Zap className="h-5 w-5 text-blue-500 mr-2" />
                Performance Notes
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                {formula.performanceNotes}
              </p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

