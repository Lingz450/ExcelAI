import { Metadata } from "next";
import Link from "next/link";
import { Book, MessageCircle, Mail, FileQuestion } from "lucide-react";

export const metadata: Metadata = {
  title: "Support - ExcelAI",
  description: "Get help with ExcelAI",
};

export default function SupportPage() {
  const faqs = [
    {
      question: "How do I upload a file?",
      answer: "Go to the Workspace page and drag & drop your Excel file, or click to browse. We support .xlsx, .xlsm, and .xls files up to 100MB.",
    },
    {
      question: "What can I ask the AI to do?",
      answer: "Type requests in plain English like 'Remove duplicates', 'Create pivot table by region', or 'Split names into first and last'. Check our Recipe Gallery for examples.",
    },
    {
      question: "Is my data safe?",
      answer: "Yes! Files are encrypted during upload and automatically deleted after 24 hours. We never use your data to train AI models.",
    },
    {
      question: "How much does it cost?",
      answer: "Free tier includes 3 jobs per day. Pro ($19/month) offers unlimited jobs. Team ($99/month) adds collaboration features. See our Pricing page for details.",
    },
    {
      question: "Can I undo changes?",
      answer: "Yes! We create a new version for each transformation. You can download the original or any previous version anytime.",
    },
    {
      question: "What Excel features do you support?",
      answer: "We support modern Excel 365 features including XLOOKUP, FILTER, dynamic arrays, pivot tables, and more. Check our Formula Atlas for the complete list.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          How Can We Help?
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Find answers, get support, or reach out to our team
        </p>
      </div>

      {/* Support Options */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <Link
          href="/formulas"
          className="p-6 bg-white dark:bg-slate-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-excel-green transition-all group"
        >
          <Book className="h-10 w-10 text-excel-green mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Formula Atlas</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Browse 80+ Excel formulas with examples and explanations
          </p>
        </Link>

        <Link
          href="/recipes"
          className="p-6 bg-white dark:bg-slate-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-excel-green transition-all group"
        >
          <FileQuestion className="h-10 w-10 text-excel-green mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Recipe Gallery</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Pre-built automations for common Excel tasks
          </p>
        </Link>

        <Link
          href="/contact"
          className="p-6 bg-white dark:bg-slate-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-excel-green transition-all group"
        >
          <MessageCircle className="h-10 w-10 text-excel-green mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Contact Us</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Send us a message and we'll respond within 24 hours
          </p>
        </Link>
      </div>

      {/* FAQs */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
            >
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                {faq.question}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Still Need Help */}
      <div className="text-center p-8 bg-gradient-to-br from-excel-green/10 to-primary-100/10 rounded-2xl border border-excel-green/30">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Still need help?
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Our support team is here to assist you
        </p>
        <Link
          href="/contact"
          className="inline-block px-8 py-3 bg-excel-green hover:bg-excel-darkgreen text-white rounded-lg font-semibold transition-all"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
}


