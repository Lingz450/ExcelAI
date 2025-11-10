import Link from "next/link";
import { FileUp, Sparkles, Zap, Wand2, Shield, BookOpen } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-excel-green/10 border border-excel-green/20 rounded-full mb-8">
              <Sparkles className="h-4 w-4 text-excel-green mr-2" />
              <span className="text-sm font-medium text-excel-green">AI-Powered Excel Assistant</span>
            </div>

            {/* Main heading */}
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Excel, but{" "}
              <span className="text-excel-green">actually friendly</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
              Type what you need, upload your file, and let AI handle the complexity. 
              From formulas to pivots, we speak Excel so you don't have to.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                href="/workspace"
                className="px-8 py-4 bg-excel-green hover:bg-excel-darkgreen text-white rounded-xl font-semibold text-lg transition-all flex items-center space-x-2"
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
                <div className="text-4xl font-bold text-excel-green mb-2">80+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Excel Functions</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-excel-green mb-2">22+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Ready Recipes</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-excel-green mb-2">10k+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Files Processed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything Excel needs, nothing it doesn't
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Focused exclusively on spreadsheets. No distractions, no generic AI chat.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-6 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-excel-green transition-all">
              <div className="p-3 bg-excel-green/10 rounded-xl w-fit mb-4">
                <Wand2 className="h-6 w-6 text-excel-green" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Natural Language
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Just type what you want. "Remove duplicates and create pivot by region." Done.
              </p>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-excel-green transition-all">
              <div className="p-3 bg-excel-green/10 rounded-xl w-fit mb-4">
                <Shield className="h-6 w-6 text-excel-green" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Safe & Reversible
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Full audit trail, one-click undo, and your originals stay untouched.
              </p>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-excel-green transition-all">
              <div className="p-3 bg-excel-green/10 rounded-xl w-fit mb-4">
                <BookOpen className="h-6 w-6 text-excel-green" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Learn Excel
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                80+ formulas with examples, pitfalls, and alternatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-excel-green to-excel-darkgreen rounded-3xl p-12 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to make Excel simple?
            </h2>
            
            <p className="text-xl text-white/90 mb-8">
              Start with 3 free jobs per day. Upgrade anytime for unlimited processing.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/workspace"
                className="px-8 py-4 bg-white hover:bg-gray-100 text-excel-green rounded-xl font-semibold text-lg transition-all"
              >
                Get Started Free
              </Link>
              
              <Link
                href="/pricing"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 rounded-xl font-semibold text-lg transition-all"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

