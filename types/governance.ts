/**
 * Governance, Versioning, and Lineage Types
 */

export interface WorkbookVersion {
  id: string;
  workbookId: string;
  version: number;
  commitNote: string;
  createdBy: string;
  createdAt: Date;
  storageKey: string;
  fileSize: number;
  changes: VersionChange[];
  tags?: string[];
}

export interface VersionChange {
  type: "cell" | "formula" | "sheet" | "structure";
  location: string;
  before: string;
  after: string;
  description: string;
}

export interface VersionComparison {
  versionA: WorkbookVersion;
  versionB: WorkbookVersion;
  differences: VersionDifference[];
  summary: {
    cellsChanged: number;
    formulasChanged: number;
    sheetsChanged: number;
    rowsAdded: number;
    rowsDeleted: number;
  };
}

export interface VersionDifference {
  location: string;
  type: "added" | "modified" | "deleted";
  oldValue?: string;
  newValue?: string;
  impact: "low" | "medium" | "high";
}

export interface DataLineage {
  cell: string;
  dependencies: LineageNode[];
  dependents: LineageNode[];
  formulaChain: string[];
  blastRadius: number; // Number of cells affected if this changes
}

export interface LineageNode {
  type: "cell" | "range" | "namedRange" | "table" | "query";
  reference: string;
  sheet?: string;
  level: number; // Depth in dependency tree
}

export interface ProtectedRange {
  id: string;
  workbookId: string;
  range: string;
  sheet: string;
  reason: string;
  lockedBy: string;
  lockedAt: Date;
  canOverride: string[]; // User IDs who can override
}

export interface ChangeApproval {
  id: string;
  jobId: string;
  requestedBy: string;
  plan: any[];
  status: "pending" | "approved" | "rejected";
  reviewedBy?: string;
  reviewNote?: string;
  requestedAt: Date;
  reviewedAt?: Date;
}

