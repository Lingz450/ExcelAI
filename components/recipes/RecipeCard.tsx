"use client";

import { Star, Users, Play } from "lucide-react";
import type { Recipe } from "@/types";
import { formatDate } from "@/lib/utils";

interface RecipeCardProps {
  recipe: Recipe;
  onUse: () => void;
}

export function RecipeCard({ recipe, onUse }: RecipeCardProps) {
  const categoryColors: Record<string, string> = {
    cleaning: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    transformation: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
    analysis: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
    formatting: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300",
    pivot: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
    lookup: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300",
    automation: "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300",
  };

  return (
    <div className="group bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-excel-green hover:shadow-lg transition-all">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-excel-green transition-colors">
            {recipe.title}
          </h3>
          <div className="flex items-center space-x-1 text-sm">
            <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">{recipe.rating}</span>
          </div>
        </div>
        
        <span
          className={`inline-block text-xs font-medium px-2 py-1 rounded-full ${
            categoryColors[recipe.category] || "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
          }`}
        >
          {recipe.category.toUpperCase()}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {recipe.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {recipe.tags.slice(0, 3).map((tag, index) => (
          <span
            key={index}
            className="text-xs px-2 py-1 bg-gray-100 dark:bg-slate-900 text-gray-600 dark:text-gray-400 rounded"
          >
            #{tag}
          </span>
        ))}
        {recipe.tags.length > 3 && (
          <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-slate-900 text-gray-600 dark:text-gray-400 rounded">
            +{recipe.tags.length - 3}
          </span>
        )}
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-1">
          <Users className="h-4 w-4" />
          <span>{recipe.usageCount.toLocaleString()} uses</span>
        </div>
        <div className="flex items-center space-x-1">
          <span>{recipe.planTemplate.length} steps</span>
        </div>
      </div>

      {/* Action */}
      <button
        onClick={onUse}
        className="w-full px-4 py-2 bg-excel-green hover:bg-excel-darkgreen text-white rounded-lg font-medium transition-all flex items-center justify-center space-x-2"
      >
        <Play className="h-4 w-4" />
        <span>Use This Recipe</span>
      </button>
    </div>
  );
}

