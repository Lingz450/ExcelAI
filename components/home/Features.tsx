"use client";

import { FileSearch, Wand2, Shield, Zap, BookOpen, Users } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Wand2,
    title: "Natural Language Commands",
    description: "Just type what you want in plain English. \"Split names, remove duplicates, create pivot by region.\" Done.",
  },
  {
    icon: FileSearch,
    title: "Smart File Analysis",
    description: "We detect merged cells, mixed formats, and data issues automatically. Get preflight checks before any changes.",
  },
  {
    icon: Shield,
    title: "Safe & Reversible",
    description: "Every action creates a new version. Full audit trail, one-click undo, and your originals stay untouched.",
  },
  {
    icon: Zap,
    title: "Modern Excel Functions",
    description: "XLOOKUP, FILTER, LET, LAMBDA - we use Excel 365's latest features to build faster, cleaner formulas.",
  },
  {
    icon: BookOpen,
    title: "Formula Encyclopedia",
    description: "500+ functions with examples, pitfalls, and alternatives. Learn Excel while you work.",
  },
  {
    icon: Users,
    title: "Team Ready",
    description: "Share recipes, collaborate on transformations, and maintain consistent Excel practices across your organization.",
  },
];

export function Features() {
  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Everything Excel needs, nothing it doesn't
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Focused exclusively on spreadsheets. No distractions, no generic AI chat.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 border border-gray-200 dark:border-gray-700 rounded-2xl hover:border-excel-green hover:shadow-xl transition-all"
            >
              <div className="p-3 bg-excel-green/10 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="h-6 w-6 text-excel-green" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

