"use client";

import { Check, Zap, Star, Crown } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Free",
    icon: Zap,
    price: "0",
    period: "forever",
    description: "Perfect for trying out ExcelAI",
    features: [
      "3 jobs per day",
      "Files up to 5MB",
      "Formula Atlas access",
      "Recipe Gallery access",
      "Community support",
      "24-hour file retention",
    ],
    limitations: [
      "Basic features only",
      "No priority processing",
      "Limited history",
    ],
    cta: "Start Free",
    href: "/workspace",
    popular: false,
    color: "gray",
  },
  {
    name: "Pro",
    icon: Star,
    price: "19",
    period: "month",
    description: "For professionals who need more power",
    features: [
      "Unlimited jobs",
      "Files up to 100MB",
      "Priority processing",
      "30-day job history",
      "Advanced recipes",
      "Email support",
      "Export job reports",
      "API access (10k calls/month)",
    ],
    limitations: [],
    cta: "Start Pro Trial",
    href: "/workspace",
    popular: true,
    color: "excel",
  },
  {
    name: "Team",
    icon: Crown,
    price: "99",
    period: "month",
    description: "For teams that need collaboration",
    features: [
      "Everything in Pro",
      "10 team seats included",
      "Shared workspaces",
      "Custom recipes",
      "Admin controls",
      "Priority support",
      "SSO integration",
      "Unlimited API calls",
      "Advanced analytics",
      "Custom integrations",
    ],
    limitations: [],
    cta: "Start Team Trial",
    href: "/workspace",
    popular: false,
    color: "violet",
  },
];

const faqs = [
  {
    question: "Can I switch plans anytime?",
    answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and wire transfers for Team plans.",
  },
  {
    question: "Is there a free trial?",
    answer: "Yes! Pro and Team plans include a 14-day free trial. No credit card required to start.",
  },
  {
    question: "What happens to my data if I cancel?",
    answer: "Your data is retained for 30 days after cancellation. You can export all your files and job history during this period.",
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes, we offer a 30-day money-back guarantee if you're not satisfied with ExcelAI.",
  },
  {
    question: "Can I add more team members?",
    answer: "Yes! Additional team members are $9/month per seat on the Team plan.",
  },
];

export function PricingSection() {
  return (
    <div className="space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Choose the plan that fits your needs. All plans include access to our Formula Atlas and Recipe Gallery.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative bg-white dark:bg-slate-800 rounded-2xl p-8 border-2 transition-all hover:shadow-2xl ${
              plan.popular
                ? "border-excel-green shadow-xl scale-105"
                : "border-gray-200 dark:border-gray-700"
            }`}
          >
            {/* Popular Badge */}
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-excel-green text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
            )}

            {/* Icon */}
            <div className={`inline-flex p-3 rounded-xl mb-4 ${
              plan.color === "excel" ? "bg-excel-green/10" :
              plan.color === "violet" ? "bg-violet-100 dark:bg-violet-900/30" :
              "bg-gray-100 dark:bg-gray-800"
            }`}>
              <plan.icon className={`h-6 w-6 ${
                plan.color === "excel" ? "text-excel-green" :
                plan.color === "violet" ? "text-violet-600 dark:text-violet-400" :
                "text-gray-600 dark:text-gray-400"
              }`} />
            </div>

            {/* Plan Name */}
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {plan.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {plan.description}
            </p>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline">
                <span className="text-5xl font-bold text-gray-900 dark:text-white">
                  ${plan.price}
                </span>
                <span className="text-gray-600 dark:text-gray-400 ml-2">
                  /{plan.period}
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              href={plan.href}
              className={`block w-full py-3 px-6 rounded-lg font-semibold text-center transition-all mb-6 ${
                plan.popular
                  ? "bg-excel-green hover:bg-excel-darkgreen text-white"
                  : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
              }`}
            >
              {plan.cta}
            </Link>

            {/* Features */}
            <div className="space-y-3">
              {plan.features.map((feature, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-excel-green flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                </div>
              ))}
            </div>

            {/* Limitations (if any) */}
            {plan.limitations.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Limitations:</p>
                <ul className="space-y-1">
                  {plan.limitations.map((limitation, idx) => (
                    <li key={idx} className="text-xs text-gray-500 dark:text-gray-400">
                      • {limitation}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Enterprise Section */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 md:p-12 text-center border border-gray-200 dark:border-gray-700">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Need something custom?
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            We offer custom plans for enterprises with specific requirements.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-8">
            <span>✓ Custom integrations</span>
            <span>✓ On-premise deployment</span>
            <span>✓ Dedicated support</span>
            <span>✓ SLA guarantees</span>
            <span>✓ Custom training</span>
          </div>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 rounded-lg font-semibold transition-all"
          >
            Contact Sales
          </Link>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {faq.question}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {faq.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Money Back Guarantee */}
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center space-x-2 px-6 py-3 bg-green-50 dark:bg-green-900/20 rounded-full mb-4">
          <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
          <span className="text-green-800 dark:text-green-300 font-medium">
            30-Day Money-Back Guarantee
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Try ExcelAI risk-free. If you're not satisfied, we'll refund your payment—no questions asked.
        </p>
      </div>
    </div>
  );
}

