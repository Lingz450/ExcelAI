import { FormulaAtlas } from "@/components/formulas/FormulaAtlas";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formula Atlas - ExcelAI",
  description: "Complete encyclopedia of Excel formulas with examples, explanations, and interactive playgrounds",
};

export default function FormulasPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <FormulaAtlas />
    </div>
  );
}

