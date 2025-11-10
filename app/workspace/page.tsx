import { WorkspaceMain } from "@/components/workspace/WorkspaceMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Workspace - ExcelAI",
  description: "Upload and transform your Excel files with AI",
};

export default function WorkspacePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <WorkspaceMain />
    </div>
  );
}

