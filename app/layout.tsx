import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ExcelAI - Your AI-Powered Excel Assistant",
  description: "Upload your Excel files, tell us what you need, and let AI handle the complexity. Formula encyclopedia, automation, and intelligent spreadsheet management.",
  keywords: "Excel, AI, spreadsheet, formulas, automation, XLOOKUP, pivot tables",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

