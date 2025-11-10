/**
 * Data Profiler
 * Automatic data quality analysis with quick fixes
 */

export interface ProfileResult {
  column: string;
  dataType: string;
  stats: ColumnStats;
  issues: DataIssue[];
  quickFixes: QuickFix[];
}

export interface ColumnStats {
  totalRows: number;
  nullCount: number;
  nullPercentage: number;
  distinctCount: number;
  distinctPercentage: number;
  outliers: number;
  minValue?: any;
  maxValue?: any;
  avgValue?: number;
  medianValue?: number;
}

export interface DataIssue {
  type: "nulls" | "outliers" | "type_mismatch" | "suspicious_date" | "text_as_number";
  severity: "critical" | "warning" | "info";
  count: number;
  examples: Array<{ row: number; value: any }>;
  description: string;
}

export interface QuickFix {
  issue: string;
  action: string;
  description: string;
  autoApply: boolean;
  formula?: string;
}

export class DataProfiler {
  /**
   * Profile all columns in dataset
   */
  static profileDataset(data: any[][], headers: string[]): ProfileResult[] {
    return headers.map((header, colIdx) => {
      const columnData = data.map(row => row[colIdx]);
      return this.profileColumn(header, columnData);
    });
  }

  /**
   * Profile a single column
   */
  static profileColumn(columnName: string, data: any[]): ProfileResult {
    const stats = this.calculateStats(data);
    const dataType = this.inferDataType(data);
    const issues = this.detectIssues(data, dataType);
    const quickFixes = this.generateQuickFixes(issues, columnName);

    return {
      column: columnName,
      dataType,
      stats,
      issues,
      quickFixes,
    };
  }

  /**
   * Calculate column statistics
   */
  private static calculateStats(data: any[]): ColumnStats {
    const nonNull = data.filter(v => v !== null && v !== undefined && v !== "");
    const distinct = new Set(nonNull);

    const numeric = nonNull.filter(v => !isNaN(Number(v))).map(Number);
    const sorted = [...numeric].sort((a, b) => a - b);

    return {
      totalRows: data.length,
      nullCount: data.length - nonNull.length,
      nullPercentage: ((data.length - nonNull.length) / data.length) * 100,
      distinctCount: distinct.size,
      distinctPercentage: (distinct.size / nonNull.length) * 100,
      outliers: this.countOutliers(numeric),
      minValue: sorted[0],
      maxValue: sorted[sorted.length - 1],
      avgValue: numeric.length > 0 ? numeric.reduce((a, b) => a + b, 0) / numeric.length : undefined,
      medianValue: sorted.length > 0 ? sorted[Math.floor(sorted.length / 2)] : undefined,
    };
  }

  /**
   * Infer data type
   */
  private static inferDataType(data: any[]): string {
    const nonNull = data.filter(v => v !== null && v !== undefined && v !== "");
    if (nonNull.length === 0) return "empty";

    const numericCount = nonNull.filter(v => !isNaN(Number(v))).length;
    const dateCount = nonNull.filter(v => !isNaN(Date.parse(String(v)))).length;

    if (numericCount / nonNull.length > 0.9) return "number";
    if (dateCount / nonNull.length > 0.9) return "date";
    if (nonNull.every(v => typeof v === "boolean")) return "boolean";
    
    return "text";
  }

  /**
   * Detect data quality issues
   */
  private static detectIssues(data: any[], dataType: string): DataIssue[] {
    const issues: DataIssue[] = [];
    const nonNull = data.filter(v => v !== null && v !== undefined && v !== "");

    // Check for nulls
    const nullCount = data.length - nonNull.length;
    if (nullCount > 0) {
      issues.push({
        type: "nulls",
        severity: nullCount / data.length > 0.5 ? "critical" : "warning",
        count: nullCount,
        examples: data
          .map((v, i) => ({ row: i + 2, value: v }))
          .filter(({ value }) => value === null || value === undefined || value === "")
          .slice(0, 5),
        description: `${nullCount} empty cells (${((nullCount / data.length) * 100).toFixed(1)}%)`,
      });
    }

    // Check for text that looks like numbers
    if (dataType === "text") {
      const textAsNumbers = nonNull.filter(v => 
        typeof v === "string" && !isNaN(Number(v))
      );
      
      if (textAsNumbers.length > 0) {
        issues.push({
          type: "text_as_number",
          severity: "warning",
          count: textAsNumbers.length,
          examples: textAsNumbers.slice(0, 5).map((v, i) => ({ row: i + 2, value: v })),
          description: `${textAsNumbers.length} numbers stored as text`,
        });
      }
    }

    // Check for suspicious dates
    if (dataType === "date") {
      const suspiciousDates = nonNull.filter(v => {
        const date = new Date(v);
        const year = date.getFullYear();
        return year < 1900 || year > 2100;
      });

      if (suspiciousDates.length > 0) {
        issues.push({
          type: "suspicious_date",
          severity: "warning",
          count: suspiciousDates.length,
          examples: suspiciousDates.slice(0, 5).map((v, i) => ({ row: i + 2, value: v })),
          description: `${suspiciousDates.length} dates outside normal range`,
        });
      }
    }

    // Check for outliers in numeric data
    if (dataType === "number") {
      const numbers = nonNull.map(Number);
      const outliers = this.findOutliers(numbers);
      
      if (outliers.length > 0) {
        issues.push({
          type: "outliers",
          severity: "info",
          count: outliers.length,
          examples: outliers.slice(0, 5).map((v, i) => ({ row: i + 2, value: v })),
          description: `${outliers.length} statistical outliers detected`,
        });
      }
    }

    return issues;
  }

  /**
   * Generate quick fixes for issues
   */
  private static generateQuickFixes(issues: DataIssue[], columnName: string): QuickFix[] {
    const fixes: QuickFix[] = [];

    for (const issue of issues) {
      switch (issue.type) {
        case "nulls":
          fixes.push({
            issue: "Empty cells",
            action: "Fill with default value",
            description: `Replace ${issue.count} empty cells with 0 or 'N/A'`,
            autoApply: false,
          });
          fixes.push({
            issue: "Empty cells",
            action: "Remove rows with nulls",
            description: `Delete ${issue.count} rows containing empty cells`,
            autoApply: false,
          });
          break;

        case "text_as_number":
          fixes.push({
            issue: "Numbers as text",
            action: "Convert to numbers",
            description: `Convert ${issue.count} text values to numbers`,
            autoApply: true,
            formula: `=VALUE(${columnName}2)`,
          });
          break;

        case "suspicious_date":
          fixes.push({
            issue: "Suspicious dates",
            action: "Review and correct",
            description: "Manually review dates outside 1900-2100",
            autoApply: false,
          });
          break;

        case "outliers":
          fixes.push({
            issue: "Statistical outliers",
            action: "Flag for review",
            description: "Add 'Outlier' column to flag unusual values",
            autoApply: true,
          });
          break;
      }
    }

    return fixes;
  }

  /**
   * Find statistical outliers using IQR method
   */
  private static findOutliers(numbers: number[]): number[] {
    const sorted = [...numbers].sort((a, b) => a - b);
    const q1 = sorted[Math.floor(sorted.length * 0.25)];
    const q3 = sorted[Math.floor(sorted.length * 0.75)];
    const iqr = q3 - q1;
    const lowerBound = q1 - 1.5 * iqr;
    const upperBound = q3 + 1.5 * iqr;

    return numbers.filter(n => n < lowerBound || n > upperBound);
  }

  private static countOutliers(numbers: number[]): number {
    return this.findOutliers(numbers).length;
  }
}

