"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, FileSpreadsheet } from "lucide-react";
import { useTheme } from "../providers/ThemeProvider";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/workspace", label: "Workspace" },
    { href: "/formulas", label: "Formula Atlas" },
    { href: "/recipes", label: "Recipes" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-excel-green rounded-lg group-hover:scale-110 transition-transform">
              <FileSpreadsheet className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-excel-green to-excel-lightgreen bg-clip-text text-transparent">
              ExcelAI
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  pathname === item.href
                    ? "bg-excel-green text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Sun className="h-5 w-5 text-gray-300" />
              )}
            </button>

            {/* CTA Button */}
            <Link
              href="/workspace"
              className="hidden sm:inline-flex px-4 py-2 bg-excel-green hover:bg-excel-darkgreen text-white rounded-lg font-medium transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

