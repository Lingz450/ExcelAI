import { PricingSection } from "@/components/pricing/PricingSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing - ExcelAI",
  description: "Simple, transparent pricing for ExcelAI. Choose the plan that fits your needs.",
};

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PricingSection />
    </div>
  );
}

