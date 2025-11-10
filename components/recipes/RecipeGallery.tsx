"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Filter, Sparkles } from "lucide-react";
import { RECIPES, RECIPE_CATEGORIES } from "@/lib/recipe-data";
import { RecipeCard } from "./RecipeCard";
import type { Recipe } from "@/types";
import toast from "react-hot-toast";

export function RecipeGallery() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<"popular" | "recent" | "rating">("popular");

  const filteredRecipes = RECIPES.filter((recipe) => {
    const matchesSearch =
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === "all" || recipe.category === selectedCategory;

    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === "popular") return b.usageCount - a.usageCount;
    if (sortBy === "rating") return b.rating - a.rating;
    return b.createdAt.getTime() - a.createdAt.getTime();
  });

  const handleUseRecipe = (recipe: Recipe) => {
    // Save recipe to localStorage so workspace can use it
    localStorage.setItem("excelai_selectedRecipe", JSON.stringify({
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      steps: recipe.steps
    }));

    toast.success(`✨ ${recipe.title} selected! Upload a file to apply it.`);
    
    // Navigate to workspace
    router.push("/workspace");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center px-4 py-2 bg-excel-green/10 border border-excel-green/20 rounded-full mb-4">
          <Sparkles className="h-4 w-4 text-excel-green mr-2" />
          <span className="text-sm font-medium text-excel-green">Ready-Made Automations</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Recipe Gallery
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Pre-built Excel automations for common tasks. Click to use instantly or customize to your needs.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 space-y-4">
          {/* Search */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search recipes (e.g., pivot, clean, split)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-excel-green focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-excel-green focus:border-transparent outline-none transition-all cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="recent">Most Recent</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            <Filter className="h-5 w-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
            {RECIPE_CATEGORIES.map((category) => (
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
        {filteredRecipes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              No recipes found matching "{searchQuery}"
            </p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              {filteredRecipes.length} {filteredRecipes.length === 1 ? "recipe" : "recipes"} found
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onUse={() => handleUseRecipe(recipe)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

