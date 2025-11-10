import { Metadata } from "next";
import Link from "next/link";
import { Play, Clock, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Tutorials - ExcelAI",
  description: "Step-by-step Excel tutorials and guides",
};

const tutorials = [
  {
    id: 1,
    title: "Getting Started with XLOOKUP",
    duration: "5 min",
    difficulty: "Beginner",
    description: "Learn how to use Excel's most powerful lookup function",
    topics: ["XLOOKUP", "Data lookup", "Modern Excel"],
  },
  {
    id: 2,
    title: "Creating Dynamic Pivot Tables",
    duration: "10 min",
    difficulty: "Intermediate",
    description: "Build pivot tables that update automatically with new data",
    topics: ["Pivot tables", "Dynamic ranges", "Analysis"],
  },
  {
    id: 3,
    title: "Mastering Dynamic Arrays",
    duration: "15 min",
    difficulty: "Advanced",
    description: "Use FILTER, SORT, UNIQUE and other array functions",
    topics: ["Dynamic arrays", "FILTER", "SORT", "UNIQUE"],
  },
  {
    id: 4,
    title: "Data Cleaning Masterclass",
    duration: "12 min",
    difficulty: "Beginner",
    description: "Clean messy data with TRIM, CLEAN, and text functions",
    topics: ["Data cleaning", "Text functions", "Best practices"],
  },
  {
    id: 5,
    title: "Building a Financial Model",
    duration: "20 min",
    difficulty: "Advanced",
    description: "Create a professional financial model with validation",
    topics: ["Financial functions", "PMT", "NPV", "IRR"],
  },
  {
    id: 6,
    title: "Introduction to LET Function",
    duration: "8 min",
    difficulty: "Intermediate",
    description: "Write cleaner, faster formulas with LET",
    topics: ["LET", "Lambda", "Performance"],
  },
];

export default function TutorialsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Excel Tutorials
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Step-by-step guides to master Excel
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tutorials.map((tutorial) => (
          <div
            key={tutorial.id}
            className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all group"
          >
            {/* Thumbnail placeholder */}
            <div className="h-48 bg-gradient-to-br from-excel-green/20 to-primary-400/20 flex items-center justify-center">
              <Play className="h-16 w-16 text-excel-green group-hover:scale-110 transition-transform" />
            </div>

            <div className="p-6">
              {/* Meta info */}
              <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{tutorial.duration}</span>
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  tutorial.difficulty === "Beginner" ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300" :
                  tutorial.difficulty === "Intermediate" ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300" :
                  "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                }`}>
                  {tutorial.difficulty}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-excel-green transition-colors">
                {tutorial.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {tutorial.description}
              </p>

              {/* Topics */}
              <div className="flex flex-wrap gap-2 mb-4">
                {tutorial.topics.map((topic) => (
                  <span
                    key={topic}
                    className="text-xs px-2 py-1 bg-gray-100 dark:bg-slate-900 text-gray-600 dark:text-gray-400 rounded"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <button className="w-full px-4 py-2 bg-excel-green hover:bg-excel-darkgreen text-white rounded-lg font-medium transition-all flex items-center justify-center space-x-2">
                <Play className="h-4 w-4" />
                <span>Start Tutorial</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Learning Path */}
      <div className="mt-16 p-8 bg-gradient-to-br from-excel-green/10 to-primary-100/10 rounded-2xl border border-excel-green/30">
        <div className="flex items-start space-x-4">
          <Award className="h-8 w-8 text-excel-green flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Excel Mastery Learning Path
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Follow our structured learning path from beginner to advanced. 
              Complete tutorials, earn badges, and become an Excel power user!
            </p>
            <Link
              href="/workspace"
              className="inline-block px-6 py-3 bg-excel-green hover:bg-excel-darkgreen text-white rounded-lg font-semibold transition-all"
            >
              Start Learning
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


