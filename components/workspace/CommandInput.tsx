"use client";

import { useState, useEffect } from "react";
import { Send, Sparkles, Loader2, BookOpen } from "lucide-react";
import toast from "react-hot-toast";

interface CommandInputProps {
  workbookId: string;
  onJobCreated: (jobId: string) => void;
}

export function CommandInput({ workbookId, onJobCreated }: CommandInputProps) {
  const [command, setCommand] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);

  // Check for selected recipe from Recipe Gallery
  useEffect(() => {
    const savedRecipe = localStorage.getItem("excelai_selectedRecipe");
    if (savedRecipe) {
      const recipe = JSON.parse(savedRecipe);
      setSelectedRecipe(recipe);
      setCommand(recipe.description);
      toast.success(`Recipe "${recipe.title}" loaded!`);
      // Clear after loading
      localStorage.removeItem("excelai_selectedRecipe");
    }
  }, []);

  console.log("CommandInput rendering with workbookId:", workbookId); // Debug log

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!command.trim()) {
      toast.error("Please describe what you want to do");
      return;
    }

    setLoading(true);

    try {
      // Call API to create job with AI parsing
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          workbookId,
          requestText: command,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create job");
      }

      if (!data.success) {
        throw new Error(data.error || "Job creation failed");
      }
      
      // Check if clarification is needed
      if (data.needsClarification) {
        toast.error(`Need more info: ${data.clarifications.join(", ")}`);
        return;
      }

      // Success - job created
      onJobCreated(data.job.id);
      toast.success("Processing your request...");
      setCommand("");
    } catch (error: any) {
      console.error("Failed to create job:", error);
      toast.error(error.message || "Failed to process request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const quickCommands = [
    "Remove duplicates and clean data",
    "Create pivot table by region",
    "Split names into first and last",
    "Standardize phone numbers",
  ];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header to make it obvious */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          What do you want to do with your file?
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Type your request in plain English below
        </p>
      </div>

      {/* Show if recipe is loaded */}
      {selectedRecipe && (
        <div className="mb-4 p-4 bg-excel-green/10 border border-excel-green/30 rounded-xl flex items-start space-x-3">
          <BookOpen className="h-5 w-5 text-excel-green mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Recipe: {selectedRecipe.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This recipe will be applied to your file when you click "Process File"
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Main input */}
        <div className="relative">
          <div className="absolute left-4 top-4 z-10">
            <Sparkles className="h-5 w-5 text-excel-green" />
          </div>
          
          <textarea
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="Type your command here...&#10;&#10;Example: Split the Full Name column into First Name and Last Name, remove duplicates, and create a pivot table showing sales by region and month"
            className="w-full pl-12 pr-4 py-4 min-h-[150px] bg-white dark:bg-slate-800 border-2 border-excel-green dark:border-excel-green rounded-2xl focus:border-excel-green focus:ring-4 focus:ring-excel-green/20 outline-none transition-all resize-none text-gray-900 dark:text-white text-lg"
            disabled={loading}
            autoFocus
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading || !command.trim()}
          className="w-full px-6 py-4 bg-excel-green hover:bg-excel-darkgreen disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white rounded-xl font-semibold transition-all flex items-center justify-center space-x-2 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              <span>Process File</span>
            </>
          )}
        </button>
      </form>

      {/* Quick commands */}
      <div className="mt-6">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Quick commands:
        </p>
        <div className="grid grid-cols-2 gap-2">
          {quickCommands.map((cmd, index) => (
            <button
              key={index}
              onClick={() => setCommand(cmd)}
              disabled={loading}
              className="text-left px-4 py-2 bg-gray-50 dark:bg-slate-900 hover:bg-excel-green/10 dark:hover:bg-excel-green/20 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors text-sm text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

