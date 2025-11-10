import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - ExcelAI",
  description: "ExcelAI Terms of Service",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Terms of Service
      </h1>
      
      <div className="prose prose-lg dark:prose-invert">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: November 8, 2025
        </p>

        <h2>Agreement to Terms</h2>
        <p>
          By accessing or using ExcelAI, you agree to be bound by these Terms of Service. 
          If you disagree with any part of these terms, you may not use our service.
        </p>

        <h2>Service Description</h2>
        <p>
          ExcelAI provides AI-powered Excel file processing, formula assistance, and automation tools. 
          We offer both free and paid subscription tiers with different features and limits.
        </p>

        <h2>User Accounts</h2>
        <ul>
          <li>You must be 18+ to create an account</li>
          <li>You're responsible for maintaining account security</li>
          <li>One account per person</li>
          <li>You're responsible for all activity under your account</li>
        </ul>

        <h2>Acceptable Use</h2>
        <p>You agree NOT to:</p>
        <ul>
          <li>Upload malicious files or viruses</li>
          <li>Abuse or overload our systems</li>
          <li>Violate any laws or regulations</li>
          <li>Share your account with others</li>
          <li>Reverse engineer our service</li>
          <li>Use the service for illegal purposes</li>
        </ul>

        <h2>File Processing</h2>
        <ul>
          <li>You retain all rights to your files</li>
          <li>We process files only as requested by you</li>
          <li>Files are automatically deleted after 24 hours (Free tier)</li>
          <li>We make reasonable efforts but don't guarantee perfect results</li>
          <li>Always backup important files before processing</li>
        </ul>

        <h2>Subscription & Billing</h2>
        <ul>
          <li>Subscriptions renew automatically unless cancelled</li>
          <li>Cancel anytime from your account settings</li>
          <li>Refunds available within 30 days of purchase</li>
          <li>We may change pricing with 30 days notice</li>
        </ul>

        <h2>Service Availability</h2>
        <ul>
          <li>We strive for 99.9% uptime but don't guarantee it</li>
          <li>Scheduled maintenance may cause temporary downtime</li>
          <li>We may modify or discontinue features with notice</li>
        </ul>

        <h2>Intellectual Property</h2>
        <p>
          ExcelAI, our logo, and all content are protected by copyright and trademark laws. 
          You may not copy, modify, or distribute our content without permission.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          ExcelAI is provided "as is" without warranties. We're not liable for data loss, 
          business interruption, or any damages arising from use of our service.
        </p>

        <h2>Changes to Terms</h2>
        <p>
          We may update these terms. Continued use after changes constitutes acceptance of new terms.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms? Contact us at{" "}
          <a href="mailto:legal@excelai.com" className="text-excel-green hover:underline">
            legal@excelai.com
          </a>
        </p>
      </div>
    </div>
  );
}


