import { Metadata } from "next";
import { Calendar, User } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog - ExcelAI",
  description: "Excel tips, tutorials, and product updates",
};

const posts = [
  {
    id: 1,
    title: "10 Excel Formulas Every Professional Should Know",
    excerpt: "Master these essential formulas to boost your productivity and impress your colleagues.",
    author: "ExcelAI Team",
    date: "November 5, 2025",
    category: "Tutorials",
  },
  {
    id: 2,
    title: "Why XLOOKUP is Better Than VLOOKUP",
    excerpt: "Learn why Excel 365's XLOOKUP function is a game-changer and how to use it effectively.",
    author: "ExcelAI Team",
    date: "November 1, 2025",
    category: "Tips",
  },
  {
    id: 3,
    title: "Introducing ExcelAI: Your AI-Powered Excel Assistant",
    excerpt: "We're excited to launch ExcelAI, a platform that makes Excel simple through natural language processing.",
    author: "ExcelAI Team",
    date: "October 28, 2025",
    category: "Product Updates",
  },
];

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          ExcelAI Blog
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Excel tips, tutorials, and product updates
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <span className="inline-block px-3 py-1 bg-excel-green/10 text-excel-green rounded-full text-sm font-medium mb-3">
                {post.category}
              </span>
              
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {post.title}
              </h2>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Coming Soon */}
      <div className="mt-16 text-center p-8 bg-gradient-to-br from-excel-green/10 to-primary-100/10 rounded-2xl border border-excel-green/30">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          More content coming soon!
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Subscribe to our newsletter to stay updated
        </p>
        <div className="flex max-w-md mx-auto">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-l-lg focus:ring-2 focus:ring-excel-green outline-none"
          />
          <button className="px-6 py-2 bg-excel-green hover:bg-excel-darkgreen text-white rounded-r-lg font-semibold transition-all">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}


