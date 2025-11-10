"use client";

import { useState } from "react";
import { GitBranch, Clock, Download, RotateCcw, Tag, GitCompare } from "lucide-react";
import type { WorkbookVersion } from "@/types/governance";
import { formatDate } from "@/lib/utils";

interface VersionControlProps {
  workbookId: string;
}

export function VersionControl({ workbookId }: VersionControlProps) {
  const [versions, setVersions] = useState<WorkbookVersion[]>([
    {
      id: "v1",
      workbookId,
      version: 3,
      commitNote: "Cleaned data and removed duplicates",
      createdBy: "user@example.com",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      storageKey: "path/to/v3",
      fileSize: 125000,
      changes: [
        { type: "cell", location: "A2:A100", before: "mixed", after: "cleaned", description: "Trimmed spaces" },
        { type: "formula", location: "B2", before: "=A2", after: "=TRIM(A2)", description: "Added TRIM" },
      ],
      tags: ["cleaned", "production"],
    },
    {
      id: "v2",
      workbookId,
      version: 2,
      commitNote: "Added pivot table for sales by region",
      createdBy: "user@example.com",
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      storageKey: "path/to/v2",
      fileSize: 98000,
      changes: [
        { type: "sheet", location: "Pivot_Sales", before: "", after: "created", description: "New pivot sheet" },
      ],
      tags: ["pivot"],
    },
    {
      id: "v1",
      workbookId,
      version: 1,
      commitNote: "Initial upload",
      createdBy: "user@example.com",
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      storageKey: "path/to/v1",
      fileSize: 87000,
      changes: [],
      tags: ["original"],
    },
  ]);

  const [compareMode, setCompareMode] = useState(false);
  const [selectedVersions, setSelectedVersions] = useState<string[]>([]);

  const handleRestore = async (versionId: string) => {
    if (!confirm("Are you sure you want to restore this version? Current changes will be saved as a new version.")) {
      return;
    }

    // TODO: Call API to restore version
    console.log("Restoring version:", versionId);
  };

  const handleCompare = () => {
    if (selectedVersions.length === 2) {
      // TODO: Show comparison view
      console.log("Comparing versions:", selectedVersions);
    }
  };

  const toggleVersionSelection = (versionId: string) => {
    setSelectedVersions(prev => {
      if (prev.includes(versionId)) {
        return prev.filter(id => id !== versionId);
      }
      if (prev.length < 2) {
        return [...prev, versionId];
      }
      return [prev[1], versionId]; // Replace oldest
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
            <GitBranch className="h-6 w-6" />
            <span>Version History</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {versions.length} saved versions
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCompareMode(!compareMode)}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-medium transition-all flex items-center space-x-2"
          >
            <GitCompare className="h-4 w-4" />
            <span>{compareMode ? "Cancel" : "Compare Versions"}</span>
          </button>
        </div>
      </div>

      {/* Compare Instructions */}
      {compareMode && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            Select two versions to compare. {selectedVersions.length}/2 selected.
          </p>
          {selectedVersions.length === 2 && (
            <button
              onClick={handleCompare}
              className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
            >
              Compare Selected Versions
            </button>
          )}
        </div>
      )}

      {/* Version List */}
      <div className="space-y-4">
        {versions.map((version, index) => (
          <div
            key={version.id}
            className={`bg-white dark:bg-slate-800 border rounded-xl p-6 transition-all ${
              compareMode && selectedVersions.includes(version.id)
                ? "border-excel-green shadow-lg"
                : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
          >
            <div className="flex items-start justify-between">
              {/* Version Info */}
              <div className="flex items-start space-x-4 flex-1">
                {/* Checkbox for compare mode */}
                {compareMode && (
                  <input
                    type="checkbox"
                    checked={selectedVersions.includes(version.id)}
                    onChange={() => toggleVersionSelection(version.id)}
                    className="mt-1 h-5 w-5 rounded border-gray-300 text-excel-green focus:ring-excel-green"
                  />
                )}

                <div className="flex-1">
                  {/* Version number & tags */}
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-sm font-mono font-semibold text-excel-green">
                      v{version.version}
                    </span>
                    {index === 0 && (
                      <span className="px-2 py-0.5 bg-excel-green text-white rounded-full text-xs font-medium">
                        Current
                      </span>
                    )}
                    {version.tags?.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs flex items-center space-x-1"
                      >
                        <Tag className="h-3 w-3" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>

                  {/* Commit note */}
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {version.commitNote}
                  </h3>

                  {/* Metadata */}
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{formatDate(version.createdAt)}</span>
                    </span>
                    <span>{version.createdBy}</span>
                    <span>{(version.fileSize / 1024).toFixed(0)} KB</span>
                    <span>{version.changes.length} changes</span>
                  </div>

                  {/* Changes summary */}
                  {version.changes.length > 0 && (
                    <div className="mt-3 p-3 bg-gray-50 dark:bg-slate-900 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Changes:
                      </p>
                      <ul className="space-y-1">
                        {version.changes.slice(0, 3).map((change, idx) => (
                          <li key={idx} className="text-sm text-gray-600 dark:text-gray-400">
                            • {change.description} ({change.location})
                          </li>
                        ))}
                        {version.changes.length > 3 && (
                          <li className="text-sm text-gray-500 dark:text-gray-500">
                            ... and {version.changes.length - 3} more
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              {!compareMode && index > 0 && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleRestore(version.id)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors group"
                    title="Restore this version"
                  >
                    <RotateCcw className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-excel-green" />
                  </button>
                  <a
                    href={`/api/download/version/${version.id}`}
                    download
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors group"
                    title="Download this version"
                  >
                    <Download className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-excel-green" />
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

