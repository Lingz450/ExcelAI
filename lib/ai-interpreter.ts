/**
 * AI Request Interpreter
 * Converts natural language requests into structured Excel action plans
 * 
 * In production, this would use OpenAI GPT-4 or similar
 * This is a rule-based implementation for demonstration
 */

import type { ExcelAction } from "@/types";

export class AIInterpreter {
  /**
   * Parse natural language request into structured action plan
   */
  static parseRequest(request: string): ExcelAction[] {
    const plan: ExcelAction[] = [];
    const requestLower = request.toLowerCase();

    // Cleaning operations
    if (this.matchesPattern(requestLower, ["trim", "clean", "space"])) {
      plan.push({
        type: "trim_clean",
        description: "Remove leading/trailing spaces and clean non-printable characters",
        params: { applyToAllText: true },
      });
    }

    if (this.matchesPattern(requestLower, ["remove", "duplicate", "dedup"])) {
      plan.push({
        type: "remove_duplicates",
        description: "Remove duplicate rows based on all columns",
        params: { keepFirst: true },
      });
    }

    // Text operations
    if (this.matchesPattern(requestLower, ["split", "name"])) {
      const sourceCol = this.extractColumnName(request, ["full name", "name"]) || "Full Name";
      plan.push({
        type: "split_column",
        sheet: undefined,
        description: `Split ${sourceCol} into First Name and Last Name`,
        params: {
          source_col: sourceCol,
          into: ["First Name", "Last Name"],
          delimiter: " ",
          method: "space_last",
        },
      });
    }

    // Phone number standardization
    if (this.matchesPattern(requestLower, ["phone", "standardize", "format"]) ||
        this.matchesPattern(requestLower, ["phone", "number"])) {
      const countryCode = this.extractCountryCode(request) || "234";
      plan.push({
        type: "standardize_phone",
        description: `Standardize phone numbers to +${countryCode} format`,
        params: {
          phone_col: "Phone",
          country_code: countryCode,
          format: "+XXX-XXX-XXX-XXXX",
        },
      });
    }

    // Date operations
    if (this.matchesPattern(requestLower, ["date", "convert", "format", "standardize"])) {
      plan.push({
        type: "convert_dates",
        description: "Convert and standardize date formats",
        params: {
          date_col: "Date",
          output_format: "YYYY-MM-DD",
          inferFormat: true,
        },
      });
    }

    // Pivot tables
    if (this.matchesPattern(requestLower, ["pivot", "table", "summary"])) {
      const rows = this.extractPivotDimensions(request, "rows") || ["Region"];
      const columns = this.extractPivotDimensions(request, "columns") || ["Month"];
      const values = this.extractPivotValues(request) || [{ field: "Amount", agg: "SUM" }];

      plan.push({
        type: "create_pivot",
        description: "Create pivot table with specified dimensions",
        params: {
          rows,
          columns,
          values,
          destination: "Pivot_Summary",
          showGrandTotals: true,
        },
      });
    }

    // Formula conversion
    if (this.matchesPattern(requestLower, ["vlookup", "xlookup", "convert", "replace"])) {
      plan.push({
        type: "convert_formula",
        description: "Convert VLOOKUP formulas to XLOOKUP",
        params: {
          from: "VLOOKUP",
          to: "XLOOKUP",
          addErrorHandling: true,
          defaultValue: "Not Found",
        },
      });
    }

    // Data validation
    if (this.matchesPattern(requestLower, ["validate", "check", "verify"])) {
      plan.push({
        type: "validate_data",
        description: "Validate data integrity and format",
        params: {
          checkBlanks: true,
          checkDuplicates: true,
          checkFormats: true,
        },
      });
    }

    // Conditional formatting
    if (this.matchesPattern(requestLower, ["format", "color", "highlight", "conditional"])) {
      plan.push({
        type: "apply_conditional_formatting",
        description: "Apply conditional formatting based on data patterns",
        params: {
          numeric: "data_bars",
          dates: "color_scale",
          text: "icon_sets",
        },
      });
    }

    // Sorting
    if (this.matchesPattern(requestLower, ["sort", "order", "arrange"])) {
      const sortColumn = this.extractColumnName(request, ["by", "on"]) || "A";
      const sortOrder = requestLower.includes("descend") || requestLower.includes("largest") ? "DESC" : "ASC";
      
      plan.push({
        type: "sort_data",
        description: `Sort data by ${sortColumn} in ${sortOrder} order`,
        params: {
          sortBy: sortColumn,
          order: sortOrder,
        },
      });
    }

    // Filtering
    if (this.matchesPattern(requestLower, ["filter", "where", "only"])) {
      plan.push({
        type: "filter_data",
        description: "Apply filters based on specified criteria",
        params: {
          conditions: this.extractFilterConditions(request),
        },
      });
    }

    // Merging sheets
    if (this.matchesPattern(requestLower, ["combine", "merge", "append", "consolidate"])) {
      plan.push({
        type: "merge_sheets",
        description: "Combine multiple sheets into one",
        params: {
          addSourceColumn: true,
          sourceColumnName: "Source Sheet",
        },
      });
    }

    // Calculate columns
    if (this.matchesPattern(requestLower, ["calculate", "add column", "formula"])) {
      plan.push({
        type: "add_calculated_column",
        description: "Add calculated column with formula",
        params: {
          column_name: "Calculated",
          formula: this.extractFormula(request),
        },
      });
    }

    // If no specific actions detected, add a generic analysis step
    if (plan.length === 0) {
      plan.push({
        type: "analyze_request",
        description: "Analyzing your request to determine best approach",
        params: { request },
      });
    }

    return plan;
  }

  /**
   * Check if request matches a pattern of keywords
   */
  private static matchesPattern(text: string, keywords: string[]): boolean {
    return keywords.every(keyword => text.includes(keyword));
  }

  /**
   * Extract column name from request
   */
  private static extractColumnName(request: string, indicators: string[]): string | null {
    for (const indicator of indicators) {
      const regex = new RegExp(`${indicator}[:\\s]+([\\w\\s]+)(?:,|\\.|$)`, 'i');
      const match = request.match(regex);
      if (match) {
        return match[1].trim();
      }
    }
    return null;
  }

  /**
   * Extract country code from request
   */
  private static extractCountryCode(request: string): string | null {
    const match = request.match(/\+?(\d{1,3})/);
    return match ? match[1] : null;
  }

  /**
   * Extract pivot dimensions (rows/columns)
   */
  private static extractPivotDimensions(request: string, type: "rows" | "columns"): string[] | null {
    const pattern = type === "rows" 
      ? /(?:row|group by|by)\s+([^,]+)/i
      : /(?:column|across)\s+([^,]+)/i;
    
    const match = request.match(pattern);
    if (match) {
      return match[1].split(/\s+and\s+|\s*,\s*/).map(s => s.trim());
    }
    return null;
  }

  /**
   * Extract pivot value aggregations
   */
  private static extractPivotValues(request: string): Array<{ field: string; agg: string }> | null {
    const aggPatterns = [
      { pattern: /sum\s+(?:of\s+)?([\\w\\s]+)/i, agg: "SUM" },
      { pattern: /count\s+(?:of\s+)?([\\w\\s]+)/i, agg: "COUNT" },
      { pattern: /average\s+(?:of\s+)?([\\w\\s]+)/i, agg: "AVERAGE" },
      { pattern: /max\s+(?:of\s+)?([\\w\\s]+)/i, agg: "MAX" },
      { pattern: /min\s+(?:of\s+)?([\\w\\s]+)/i, agg: "MIN" },
    ];

    for (const { pattern, agg } of aggPatterns) {
      const match = request.match(pattern);
      if (match) {
        return [{ field: match[1].trim(), agg }];
      }
    }

    return null;
  }

  /**
   * Extract filter conditions
   */
  private static extractFilterConditions(request: string): Array<{ column: string; operator: string; value: string }> {
    const conditions: Array<{ column: string; operator: string; value: string }> = [];
    
    // Simple pattern matching for common filter formats
    const patterns = [
      /([\\w\\s]+)\s*=\s*['""]([^'""]+)['"]/gi,
      /([\\w\\s]+)\s*>\s*(\d+)/gi,
      /([\\w\\s]+)\s*<\s*(\d+)/gi,
    ];

    patterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(request)) !== null) {
        conditions.push({
          column: match[1].trim(),
          operator: "=",
          value: match[2],
        });
      }
    });

    return conditions;
  }

  /**
   * Extract formula from request
   */
  private static extractFormula(request: string): string {
    // Look for Excel formula pattern
    const formulaMatch = request.match(/=[\w\s+\-*/()]+/i);
    if (formulaMatch) {
      return formulaMatch[0];
    }
    
    // Default calculation
    return "=A{ROW}*B{ROW}";
  }

  /**
   * Validate action plan before execution
   */
  static validatePlan(plan: ExcelAction[]): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (plan.length === 0) {
      errors.push("No actions to perform");
    }

    // Check for conflicting actions
    const actionTypes = plan.map(a => a.type);
    if (actionTypes.includes("remove_duplicates") && actionTypes.includes("split_column")) {
      // Ensure remove_duplicates comes after split_column
      const dupIndex = actionTypes.indexOf("remove_duplicates");
      const splitIndex = actionTypes.indexOf("split_column");
      if (dupIndex < splitIndex) {
        errors.push("Remove duplicates should be performed after splitting columns");
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Generate human-readable summary of the plan
   */
  static summarizePlan(plan: ExcelAction[]): string {
    if (plan.length === 0) {
      return "No actions to perform";
    }

    const summary = plan.map((action, index) => {
      return `${index + 1}. ${action.description}`;
    }).join("\n");

    return `I will perform the following ${plan.length} action${plan.length > 1 ? 's' : ''}:\n\n${summary}`;
  }
}

