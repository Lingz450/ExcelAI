"use client";

import { useState } from "react";
import { Play, FileSpreadsheet } from "lucide-react";
import { motion } from "framer-motion";

export function QuickDemo() {
  const [isPlaying, setIsPlaying] = useState(false);

  const examples = [
    "Split full name into first and last, trim spaces",
    "Create pivot table of sales by region and month",
    "Remove duplicates and standardize phone numbers",
    "Convert all VLOOKUP to XLOOKUP with error handling",
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Demo window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {/* Window header */}
            <div className="bg-gradient-to-r from-excel-green to-excel-lightgreen px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileSpreadsheet className="h-5 w-5 text-white" />
                <span className="font-semibold text-white">ExcelAI Workspace</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-white/30" />
                <div className="w-3 h-3 rounded-full bg-white/30" />
                <div className="w-3 h-3 rounded-full bg-white/30" />
              </div>
            </div>

            {/* Demo content */}
            <div className="p-8">
              {/* Command input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  What do you need to do?
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Type your request in plain English..."
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-excel-green focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              {/* Example requests */}
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Try one of these:
                </p>
                <div className="grid gap-2">
                  {examples.map((example, index) => (
                    <button
                      key={index}
                      className="text-left px-4 py-3 bg-gray-50 dark:bg-slate-900 hover:bg-excel-green/10 dark:hover:bg-excel-green/20 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors group"
                    >
                      <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-excel-green">
                        {example}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Upload area */}
              <div className="mt-6 p-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl text-center hover:border-excel-green hover:bg-excel-green/5 transition-all cursor-pointer">
                <FileSpreadsheet className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Drop your Excel file here
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  or click to browse (.xlsx, .xlsm, .xls up to 100MB)
                </p>
              </div>
            </div>
          </motion.div>

          {/* Trust indicators */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-excel-green rounded-full" />
              <span>Files auto-deleted after 24h</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-excel-green rounded-full" />
              <span>Encrypted storage</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-excel-green rounded-full" />
              <span>No data training</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

