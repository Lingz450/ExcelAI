"use client";

import Link from "next/link";
import { FileUp, Sparkles, Zap } from "lucide-react";

export function HeroSimple() {
  return (
    <section className="relative py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-excel-green/10 border border-excel-green/20 rounded-full mb-8">
            <Sparkles className="h-4 w-4 text-excel-green mr-2" />
            <span className="text-sm font-medium text-excel-green">AI-Powered Excel Assistant</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            Excel, but{" "}
            <span className="bg-gradient-to-r from-excel-green via-excel-lightgreen to-primary-400 bg-clip-text text-transparent">
              actually friendly
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Type what you need, upload your file, and let AI handle the complexity. 
            From formulas to pivots, we speak Excel so you don't have to.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/workspace"
              className="group px-8 py-4 bg-excel-green hover:bg-excel-darkgreen text-white rounded-xl font-semibold text-lg transition-all flex items-center space-x-2"
            >
              <FileUp className="h-5 w-5" />
              <span>Start Now - It's Free</span>
            </Link>
            
            <Link
              href="/formulas"
              className="px-8 py-4 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 rounded-xl font-semibold text-lg transition-all flex items-center space-x-2"
            >
              <Zap className="h-5 w-5" />
              <span>Browse Formulas</span>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-excel-green mb-2">80+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Excel Functions</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-excel-green mb-2">22+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Ready Recipes</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-excel-green mb-2">10k+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Files Processed</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


