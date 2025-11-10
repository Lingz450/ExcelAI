/**
 * Assert Rules Engine
 * Data validation rules that fail early with clear errors
 */

export type RuleType = "type" | "range" | "unique" | "required" | "format" | "custom";

export interface AssertRule {
  id: string;
  name: string;
  column: string;
  type: RuleType;
  condition: any;
  errorMessage: string;
  severity: "error" | "warning";
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
  rowsPassed: number;
  rowsFailed: number;
}

export interface ValidationError {
  rule: string;
  row: number;
  column: string;
  value: any;
  message: string;
  severity: "error" | "warning";
}

export class AssertEngine {
  /**
   * Pre-built rule templates
   */
  static RULE_TEMPLATES: Record<string, AssertRule> = {
    numericAmount: {
      id: "numeric-amount",
      name: "Amount must be numeric",
      column: "Amount",
      type: "type",
      condition: { dataType: "number" },
      errorMessage: "Amount column must contain only numbers",
      severity: "error",
    },
    
    dateRange: {
      id: "date-range-2023-2026",
      name: "Dates must be within 2023-2026",
      column: "Date",
      type: "range",
      condition: { min: "2023-01-01", max: "2026-12-31" },
      errorMessage: "Date must be between 2023 and 2026",
      severity: "error",
    },
    
    uniqueIDs: {
      id: "unique-ids",
      name: "IDs must be unique",
      column: "ID",
      type: "unique",
      condition: {},
      errorMessage: "Duplicate ID found",
      severity: "error",
    },
    
    requiredEmail: {
      id: "required-email",
      name: "Email is required",
      column: "Email",
      type: "required",
      condition: {},
      errorMessage: "Email field cannot be empty",
      severity: "error",
    },
    
    emailFormat: {
      id: "email-format",
      name: "Valid email format",
      column: "Email",
      type: "format",
      condition: { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
      errorMessage: "Invalid email format",
      severity: "warning",
    },
  };

  /**
   * Validate data against rules
   */
  static validate(data: any[][], headers: string[], rules: AssertRule[]): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationError[] = [];
    let rowsPassed = 0;
    let rowsFailed = 0;

    // Create column index map
    const columnIndex = new Map(headers.map((h, i) => [h, i]));

    for (let rowIdx = 0; rowIdx < data.length; rowIdx++) {
      const row = data[rowIdx];
      let rowHasError = false;

      for (const rule of rules) {
        const colIdx = columnIndex.get(rule.column);
        if (colIdx === undefined) continue;

        const value = row[colIdx];
        const violation = this.checkRule(rule, value, data, rowIdx, colIdx);

        if (violation) {
          const error: ValidationError = {
            rule: rule.name,
            row: rowIdx + 2, // +2 for header row and 1-indexed
            column: rule.column,
            value,
            message: violation,
            severity: rule.severity,
          };

          if (rule.severity === "error") {
            errors.push(error);
            rowHasError = true;
          } else {
            warnings.push(error);
          }
        }
      }

      if (rowHasError) {
        rowsFailed++;
      } else {
        rowsPassed++;
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      rowsPassed,
      rowsFailed,
    };
  }

  /**
   * Check individual rule
   */
  private static checkRule(
    rule: AssertRule,
    value: any,
    allData: any[][],
    rowIdx: number,
    colIdx: number
  ): string | null {
    switch (rule.type) {
      case "type":
        if (rule.condition.dataType === "number" && isNaN(Number(value))) {
          return rule.errorMessage;
        }
        if (rule.condition.dataType === "string" && typeof value !== "string") {
          return rule.errorMessage;
        }
        break;

      case "range":
        const numValue = Number(value);
        if (rule.condition.min && numValue < Number(rule.condition.min)) {
          return `${rule.errorMessage} (minimum: ${rule.condition.min})`;
        }
        if (rule.condition.max && numValue > Number(rule.condition.max)) {
          return `${rule.errorMessage} (maximum: ${rule.condition.max})`;
        }
        // Date range
        if (rule.condition.min && rule.condition.max && value) {
          const date = new Date(value);
          const min = new Date(rule.condition.min);
          const max = new Date(rule.condition.max);
          if (date < min || date > max) {
            return rule.errorMessage;
          }
        }
        break;

      case "unique":
        // Check if value appears elsewhere
        for (let i = 0; i < allData.length; i++) {
          if (i !== rowIdx && allData[i][colIdx] === value) {
            return `${rule.errorMessage} (duplicate at row ${i + 2})`;
          }
        }
        break;

      case "required":
        if (value === null || value === undefined || value === "") {
          return rule.errorMessage;
        }
        break;

      case "format":
        if (rule.condition.pattern && !rule.condition.pattern.test(String(value))) {
          return rule.errorMessage;
        }
        break;

      case "custom":
        // Execute custom validation function
        if (rule.condition.validator && !rule.condition.validator(value)) {
          return rule.errorMessage;
        }
        break;
    }

    return null;
  }

  /**
   * Generate suggested fixes for violations
   */
  static suggestFixes(errors: ValidationError[]): Record<string, string> {
    const fixes: Record<string, string> = {};

    for (const error of errors) {
      const key = `${error.row}:${error.column}`;
      
      if (error.message.includes("numeric")) {
        fixes[key] = "Convert to number using VALUE() or remove non-numeric characters";
      } else if (error.message.includes("date")) {
        fixes[key] = "Check date format or adjust date range";
      } else if (error.message.includes("unique")) {
        fixes[key] = "Remove duplicate or modify value to be unique";
      } else if (error.message.includes("required")) {
        fixes[key] = "Fill in missing value";
      } else if (error.message.includes("email")) {
        fixes[key] = "Correct email format (user@domain.com)";
      }
    }

    return fixes;
  }
}

