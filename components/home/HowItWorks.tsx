"use client";

import { Upload, MessageSquare, Download, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: Upload,
    title: "Upload Your File",
    description: "Drag and drop your Excel file. We support .xlsx, .xlsm, and .xls formats up to 100MB.",
    color: "bg-blue-500",
  },
  {
    icon: MessageSquare,
    title: "Tell Us What You Need",
    description: "Type your request in plain English. Be specific or vague - we'll ask clarifying questions if needed.",
    color: "bg-purple-500",
  },
  {
    icon: CheckCircle,
    title: "Review the Plan",
    description: "See exactly what we'll do before we touch your data. Every step explained in clear terms.",
    color: "bg-amber-500",
  },
  {
    icon: Download,
    title: "Get Your Result",
    description: "Download your transformed file with a detailed change log. Compare before and after.",
    color: "bg-excel-green",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Four steps. That's it.
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            From messy spreadsheet to polished result in minutes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-excel-green to-transparent -z-10" />
              )}
              
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                {/* Step number */}
                <div className="flex items-center mb-4">
                  <span className="text-4xl font-bold text-gray-200 dark:text-gray-700 mr-4">
                    {index + 1}
                  </span>
                  <div className={`p-3 ${step.color} rounded-xl`}>
                    <step.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

