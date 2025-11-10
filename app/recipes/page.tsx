import { RecipeGallery } from "@/components/recipes/RecipeGallery";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recipe Gallery - ExcelAI",
  description: "Pre-built Excel automation recipes for common tasks",
};

export default function RecipesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <RecipeGallery />
    </div>
  );
}

