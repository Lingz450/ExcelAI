// Core types for ExcelAI application

export type JobStatus = "pending" | "processing" | "completed" | "failed";

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  subscription?: "free" | "pro" | "team";
}

export interface Workbook {
  id: string;
  userId: string;
  originalFilename: string;
  storageKey: string;
  fileSize: number;
  uploadedAt: Date;
}

export interface ExcelAction {
  type: string;
  sheet?: string;
  description: string;
  params?: Record<string, any>;
}

export interface Job {
  id: string;
  userId: string;
  workbookId: string;
  requestText: string;
  status: JobStatus;
  plan?: ExcelAction[];
  errorMessage?: string;
  startedAt: Date;
  finishedAt?: Date;
  executionTimeMs?: number;
}

export interface JobOutput {
  id: string;
  jobId: string;
  outputStorageKey: string;
  diffSummary: DiffSummary;
  version: number;
  createdAt: Date;
}

export interface DiffSummary {
  sheetsAdded: string[];
  sheetsModified: string[];
  sheetsDeleted: string[];
  cellsChanged: number;
  formulasAdded: number;
  rowsAdded: number;
  rowsDeleted: number;
  changes: DiffChange[];
}

export interface DiffChange {
  type: "cell" | "formula" | "sheet" | "row" | "column";
  location: string;
  before?: string;
  after?: string;
  description: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  category: RecipeCategory;
  planTemplate: ExcelAction[];
  tags: string[];
  usageCount: number;
  rating: number;
  createdAt: Date;
}

export type RecipeCategory = 
  | "cleaning"
  | "transformation"
  | "analysis"
  | "formatting"
  | "pivot"
  | "lookup"
  | "automation";

export interface Formula {
  id: string;
  name: string;
  category: FormulaCategory;
  syntax: string;
  description: string;
  arguments: FormulaArgument[];
  examples: FormulaExample[];
  pitfalls?: string[];
  alternatives?: string[];
  isModern: boolean; // Excel 365+
  isVolatile: boolean;
  performanceNotes?: string;
}

export type FormulaCategory =
  | "lookup"
  | "text"
  | "math"
  | "statistical"
  | "logical"
  | "date"
  | "dynamic-array"
  | "lambda"
  | "financial"
  | "information";

export interface FormulaArgument {
  name: string;
  description: string;
  required: boolean;
  type: string;
}

export interface FormulaExample {
  title: string;
  formula: string;
  input: string;
  output: string;
  explanation: string;
  level: "beginner" | "intermediate" | "advanced";
}

export interface UploadProgress {
  progress: number;
  stage: "uploading" | "processing" | "complete";
  message: string;
}

export interface JobLog {
  timestamp: Date;
  level: "info" | "warning" | "error";
  message: string;
  details?: any;
}

