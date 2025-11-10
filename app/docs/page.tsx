import { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Code, Rocket, Settings } from "lucide-react";

export const metadata: Metadata = {
  title: "Documentation - ExcelAI",
  description: "Complete documentation for ExcelAI",
};

const docSections = [
  {
    title: "Getting Started",
    icon: Rocket,
    docs: [
      { title: "Quick Start Guide", href: "/docs/quickstart", description: "Get up and running in 5 minutes" },
      { title: "Uploading Files", href: "/docs/uploading", description: "Learn how to upload and preview Excel files" },
      { title: "Making Requests", href: "/docs/requests", description: "How to tell ExcelAI what you need" },
    ],
  },
  {
    title: "Features",
    icon: BookOpen,
    docs: [
      { title: "Formula Atlas", href: "/formulas", description: "Browse 80+ Excel formulas" },
      { title: "Recipe Gallery", href: "/recipes", description: "Pre-built automation workflows" },
      { title: "AI Processing", href: "/docs/ai", description: "How AI understands your requests" },
    ],
  },
  {
    title: "API Reference",
    icon: Code,
    docs: [
      { title: "Authentication", href: "/docs/api/auth", description: "OAuth and API keys" },
      { title: "File Upload API", href: "/docs/api/upload", description: "Programmatic file uploads" },
      { title: "Processing API", href: "/docs/api/process", description: "Submit processing jobs" },
    ],
  },
  {
    title: "Advanced",
    icon: Settings,
    docs: [
      { title: "Version Control", href: "/docs/versions", description: "Manage workbook versions" },
      { title: "Webhooks", href: "/docs/webhooks", description: "Get notified of job completion" },
      { title: "Custom Recipes", href: "/docs/custom-recipes", description: "Create your own automations" },
    ],
  },
];

export default function DocsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Documentation
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Everything you need to know about using ExcelAI
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {docSections.map((section) => (
          <div
            key={section.title}
            className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-excel-green/10 rounded-lg">
                <section.icon className="h-6 w-6 text-excel-green" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {section.title}
              </h2>
            </div>

            <div className="space-y-4">
              {section.docs.map((doc) => (
                <Link
                  key={doc.title}
                  href={doc.href}
                  className="block p-4 bg-gray-50 dark:bg-slate-900 rounded-lg hover:bg-excel-green/10 dark:hover:bg-excel-green/20 transition-all group"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-excel-green transition-colors">
                    {doc.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {doc.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* GitHub & Community */}
      <div className="mt-16 text-center p-8 bg-gradient-to-br from-excel-green/10 to-primary-100/10 rounded-2xl border border-excel-green/30">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Need more help?
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Join our community or check out the complete guides on GitHub
        </p>
        <div className="flex items-center justify-center space-x-4">
          <Link
            href="/support"
            className="px-6 py-3 bg-excel-green hover:bg-excel-darkgreen text-white rounded-lg font-semibold transition-all"
          >
            Contact Support
          </Link>
          <a
            href="https://github.com/yourusername/excelai"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-semibold transition-all"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}


