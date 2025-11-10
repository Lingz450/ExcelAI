"use client";

import { useState } from "react";
import { Search, Filter, Book } from "lucide-react";
import { FORMULAS, FORMULA_CATEGORIES } from "@/lib/formula-data";
import { FormulaCard } from "./FormulaCard";
import { FormulaDetail } from "./FormulaDetail";
import type { Formula } from "@/types";

export function FormulaAtlas() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFormula, setSelectedFormula] = useState<Formula | null>(null);

  const filteredFormulas = FORMULAS.filter((formula) => {
    const matchesSearch =
      formula.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      formula.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      formula.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || formula.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center px-4 py-2 bg-excel-green/10 border border-excel-green/20 rounded-full mb-4">
          <Book className="h-4 w-4 text-excel-green mr-2" />
          <span className="text-sm font-medium text-excel-green">Excel Formula Encyclopedia</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Formula Atlas
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Complete guide to Excel formulas with syntax, examples, pitfalls, and alternatives.
          From basics to advanced Lambda functions.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search formulas (e.g., XLOOKUP, pivot, text)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-excel-green focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            <Filter className="h-5 w-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
            {FORMULA_CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`
                  px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all flex-shrink-0
                  ${
                    selectedCategory === category.id
                      ? "bg-excel-green text-white"
                      : "bg-gray-100 dark:bg-slate-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700"
                  }
                `}
              >
                {category.name}
                <span className="ml-2 text-xs opacity-75">({category.count})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-6xl mx-auto">
        {filteredFormulas.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              No formulas found matching "{searchQuery}"
            </p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              {filteredFormulas.length} {filteredFormulas.length === 1 ? "formula" : "formulas"} found
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {filteredFormulas.map((formula) => (
                <FormulaCard
                  key={formula.id}
                  formula={formula}
                  onClick={() => setSelectedFormula(formula)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Formula Detail Modal */}
      {selectedFormula && (
        <FormulaDetail
          formula={selectedFormula}
          onClose={() => setSelectedFormula(null)}
        />
      )}
    </div>
  );
}

