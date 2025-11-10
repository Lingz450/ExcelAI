import { Metadata } from "next";
import { Target, Users, Zap, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us - ExcelAI",
  description: "Learn about ExcelAI and our mission to make Excel accessible to everyone",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          About ExcelAI
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Making Excel accessible to everyone through the power of AI
        </p>
      </div>

      <div className="prose prose-lg dark:prose-invert mx-auto">
        <h2 className="flex items-center space-x-2">
          <Target className="h-6 w-6 text-excel-green" />
          <span>Our Mission</span>
        </h2>
        <p>
          ExcelAI was founded on a simple observation: Excel is incredibly powerful, but most people find it overwhelming. 
          We believe that everyone should be able to harness the power of spreadsheets without needing to become an Excel expert.
        </p>

        <h2 className="flex items-center space-x-2">
          <Zap className="h-6 w-6 text-excel-green" />
          <span>What We Do</span>
        </h2>
        <p>
          We've built an AI-powered platform that understands plain English requests and translates them into Excel operations. 
          Whether you need to clean data, create pivot tables, or modernize formulas, just tell us what you want, and we'll make it happen.
        </p>

        <h2 className="flex items-center space-x-2">
          <Users className="h-6 w-6 text-excel-green" />
          <span>Our Values</span>
        </h2>
        <ul>
          <li><strong>Excel-First:</strong> We focus exclusively on spreadsheets. No distractions, no feature creep.</li>
          <li><strong>Educational:</strong> We help users learn Excel while solving their problems.</li>
          <li><strong>Transparent:</strong> You see exactly what we'll do before we do it.</li>
          <li><strong>Privacy-First:</strong> Your data is encrypted, auto-deleted, and never used for training.</li>
          <li><strong>Quality:</strong> We build features that actually work, with real error handling and recovery.</li>
        </ul>

        <h2 className="flex items-center space-x-2">
          <Heart className="h-6 w-6 text-excel-green" />
          <span>Join Us</span>
        </h2>
        <p>
          We're on a mission to transform how people work with Excel. Whether you're a beginner struggling with formulas 
          or a power user looking to automate complex workflows, ExcelAI is here to help.
        </p>

        <div className="not-prose mt-12 text-center">
          <a
            href="/workspace"
            className="inline-block px-8 py-4 bg-excel-green hover:bg-excel-darkgreen text-white rounded-xl font-semibold text-lg transition-all"
          >
            Start Using ExcelAI Free
          </a>
        </div>
      </div>
    </div>
  );
}


