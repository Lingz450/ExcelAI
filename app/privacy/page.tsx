import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - ExcelAI",
  description: "ExcelAI Privacy Policy - How we protect your data",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Privacy Policy
      </h1>
      
      <div className="prose prose-lg dark:prose-invert">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: November 8, 2025
        </p>

        <h2>Your Privacy Matters</h2>
        <p>
          At ExcelAI, we take your privacy seriously. This policy outlines how we collect, use, and protect your information.
        </p>

        <h2>Information We Collect</h2>
        <ul>
          <li><strong>Account Information:</strong> Email, name when you sign up</li>
          <li><strong>Files:</strong> Excel files you upload for processing</li>
          <li><strong>Usage Data:</strong> How you use our service (anonymized)</li>
          <li><strong>Payment Information:</strong> Processed securely by Stripe</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <ul>
          <li>Process your Excel files as requested</li>
          <li>Improve our service and features</li>
          <li>Send important account notifications</li>
          <li>Provide customer support</li>
        </ul>

        <h2>Data Security</h2>
        <p>
          We implement industry-standard security measures:
        </p>
        <ul>
          <li><strong>Encryption:</strong> All files encrypted in transit (TLS) and at rest (AES-256)</li>
          <li><strong>Auto-Deletion:</strong> Files automatically deleted after 24 hours</li>
          <li><strong>No Training:</strong> We NEVER use your data to train AI models</li>
          <li><strong>Access Controls:</strong> Only you can access your files</li>
          <li><strong>Audit Logs:</strong> Complete record of all file access</li>
        </ul>

        <h2>Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access your data</li>
          <li>Delete your data</li>
          <li>Export your data</li>
          <li>Opt out of emails</li>
          <li>Close your account</li>
        </ul>

        <h2>Data Retention</h2>
        <ul>
          <li><strong>Files:</strong> Deleted after 24 hours (configurable for Pro/Team)</li>
          <li><strong>Job History:</strong> Kept for 30-90 days depending on plan</li>
          <li><strong>Account Data:</strong> Kept until you delete your account</li>
        </ul>

        <h2>Third-Party Services</h2>
        <p>We use trusted third-party services:</p>
        <ul>
          <li><strong>OpenAI:</strong> For AI-powered request parsing (no data training)</li>
          <li><strong>Stripe:</strong> For payment processing (PCI compliant)</li>
          <li><strong>Google/Microsoft:</strong> For authentication (OAuth)</li>
        </ul>

        <h2>Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy, contact us at{" "}
          <a href="mailto:privacy@excelai.com" className="text-excel-green hover:underline">
            privacy@excelai.com
          </a>
        </p>
      </div>
    </div>
  );
}


