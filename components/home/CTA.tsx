"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function CTA() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-gradient-to-br from-excel-green to-excel-darkgreen rounded-3xl p-12 text-center relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 cell-pattern opacity-10" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full mb-6">
              <Sparkles className="h-4 w-4 text-white mr-2" />
              <span className="text-sm font-medium text-white">No credit card required</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to make Excel simple?
            </h2>
            
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Start with 3 free jobs per day. Upgrade anytime for unlimited processing and advanced features.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/workspace"
                className="group px-8 py-4 bg-white hover:bg-gray-100 text-excel-green rounded-xl font-semibold text-lg transition-all flex items-center space-x-2 shadow-lg"
              >
                <span>Get Started Free</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/formulas"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl font-semibold text-lg transition-all"
              >
                Explore Formulas
              </Link>
            </div>

            <p className="mt-6 text-sm text-white/80">
              Join 10,000+ users who've transformed their Excel workflow
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

