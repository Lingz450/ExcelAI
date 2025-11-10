import { SignInForm } from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In - ExcelAI",
  description: "Sign in to your ExcelAI account",
};

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-12 px-4">
      <SignInForm />
    </div>
  );
}

