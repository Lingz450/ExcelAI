"use client";

import Link from "next/link";
import {
  FileSpreadsheet,
  Github,
  Twitter,
  Linkedin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: "Product",
      links: [
        { label: "Workspace", href: "/workspace" },
        { label: "Formula Atlas", href: "/formulas" },
        { label: "Recipes", href: "/recipes" },
        { label: "Pricing", href: "/pricing" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "/docs" },
        { label: "Blog", href: "/blog" },
        { label: "Tutorials", href: "/tutorials" },
        { label: "Support", href: "/support" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Github, label: "GitHub", href: "https://github.com" },
    { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  ];

  return (
    <footer className="relative border-t border-slate-800 bg-slate-950 text-slate-300">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 opacity-90" />
        <div className="absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/3 rounded-full bg-excel-green/25 blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="rounded-2xl bg-excel-green/10 p-3 ring-1 ring-inset ring-excel-green/40">
                <FileSpreadsheet className="h-6 w-6 text-excel-green" />
              </div>
              <div>
                <p className="text-xl font-semibold text-white">ExcelAI</p>
                <p className="text-xs uppercase tracking-[0.3em] text-excel-green/80">
                  Spreadsheet Superpowers
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-slate-400">
              Translate plain-English requests into audit-ready workbooks. Secure, collaborative,
              and purpose-built for modern finance and operations teams.
            </p>

            <div className="flex flex-wrap gap-3 text-xs font-medium">
              <span className="inline-flex items-center space-x-1 rounded-full bg-white/5 px-3 py-1 text-slate-200 ring-1 ring-white/10">
                <ShieldCheck className="h-3.5 w-3.5 text-excel-green" />
                <span>SOC2 ready</span>
              </span>
              <span className="inline-flex items-center space-x-1 rounded-full bg-white/5 px-3 py-1 text-slate-200 ring-1 ring-white/10">
                <Sparkles className="h-3.5 w-3.5 text-excel-green" />
                <span>AI native</span>
              </span>
            </div>
          </div>

          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">
                {section.title}
              </h3>
              <ul className="mt-6 space-y-3 text-sm">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center space-x-2 text-slate-400 transition hover:text-white"
                    >
                      <span className="h-px w-6 origin-left scale-x-0 bg-excel-green/70 transition duration-200 group-hover:scale-x-100" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-slate-500">© {currentYear} ExcelAI. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-6">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-slate-500 transition hover:text-white"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
