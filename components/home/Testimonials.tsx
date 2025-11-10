"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Financial Analyst",
    company: "TechCorp",
    content: "I used to spend hours on VLOOKUP formulas. Now I just type what I need and ExcelAI builds it perfectly. Game changer for month-end reports.",
    rating: 5,
    avatar: "SC",
  },
  {
    name: "Michael Okafor",
    role: "Operations Manager",
    company: "LogisticsPlus",
    content: "The Formula Atlas is worth it alone. Finally understand what XLOOKUP actually does. The AI transformations save me 10+ hours weekly.",
    rating: 5,
    avatar: "MO",
  },
  {
    name: "Emily Rodriguez",
    role: "Data Scientist",
    company: "Insights Inc",
    content: "Love that it only does Excel - no distractions. The unpivot recipe alone justified our team subscription. Clean, fast, reliable.",
    rating: 5,
    avatar: "ER",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Loved by Excel users everywhere
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            From beginners to power users, ExcelAI makes everyone more productive.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              {/* Stars */}
              <div className="flex items-center space-x-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-excel-green rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

