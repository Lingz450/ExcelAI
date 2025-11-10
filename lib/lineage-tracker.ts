/**
 * Data Lineage Tracking
 * Maps dependencies and blast radius for Excel workbooks
 */

import type { DataLineage, LineageNode } from "@/types/governance";

export class LineageTracker {
  /**
   * Analyze dependencies for a cell
   */
  static analyzeCell(cell: string, sheet: string, workbookData: any): DataLineage {
    const dependencies = this.findDependencies(cell, sheet, workbookData);
    const dependents = this.findDependents(cell, sheet, workbookData);
    const formulaChain = this.buildFormulaChain(cell, sheet, workbookData);
    const blastRadius = this.calculateBlastRadius(cell, sheet, workbookData);

    return {
      cell: `${sheet}!${cell}`,
      dependencies,
      dependents,
      formulaChain,
      blastRadius,
    };
  }

  /**
   * Find all cells/ranges that this cell depends on
   */
  private static findDependencies(cell: string, sheet: string, workbookData: any): LineageNode[] {
    const dependencies: LineageNode[] = [];
    
    // Parse formula to extract references
    const formula = workbookData.sheets?.[sheet]?.cells?.[cell]?.formula;
    
    if (!formula) return dependencies;

    // Extract cell references (A1, B2:C10, etc.)
    const cellRefRegex = /([A-Z]+[0-9]+(?::[A-Z]+[0-9]+)?)/g;
    const matches = formula.match(cellRefRegex) || [];

    for (const ref of matches) {
      dependencies.push({
        type: ref.includes(":") ? "range" : "cell",
        reference: ref,
        sheet,
        level: 1,
      });
    }

    // Extract named ranges
    const namedRangeRegex = /([A-Z_][A-Z0-9_]*)/g;
    const namedMatches = formula.match(namedRangeRegex) || [];
    
    for (const name of namedMatches) {
      if (workbookData.namedRanges?.[name]) {
        dependencies.push({
          type: "namedRange",
          reference: name,
          level: 1,
        });
      }
    }

    // Extract table references
    const tableRefRegex = /\[([^\]]+)\]/g;
    const tableMatches = formula.match(tableRefRegex) || [];
    
    for (const match of tableMatches) {
      dependencies.push({
        type: "table",
        reference: match,
        level: 1,
      });
    }

    return dependencies;
  }

  /**
   * Find all cells that depend on this cell
   */
  private static findDependents(cell: string, sheet: string, workbookData: any): LineageNode[] {
    const dependents: LineageNode[] = [];
    
    // Scan all formulas in workbook
    for (const [sheetName, sheetData] of Object.entries(workbookData.sheets || {})) {
      for (const [cellRef, cellData] of Object.entries((sheetData as any).cells || {})) {
        const formula = (cellData as any).formula;
        
        if (formula && formula.includes(cell)) {
          dependents.push({
            type: "cell",
            reference: cellRef,
            sheet: sheetName,
            level: 1,
          });
        }
      }
    }

    return dependents;
  }

  /**
   * Build formula dependency chain
   */
  private static buildFormulaChain(cell: string, sheet: string, workbookData: any, visited = new Set<string>()): string[] {
    const fullRef = `${sheet}!${cell}`;
    
    if (visited.has(fullRef)) {
      return ["[Circular Reference]"];
    }
    
    visited.add(fullRef);
    
    const formula = workbookData.sheets?.[sheet]?.cells?.[cell]?.formula;
    if (!formula) return [];

    const chain: string[] = [formula];
    const dependencies = this.findDependencies(cell, sheet, workbookData);

    for (const dep of dependencies) {
      if (dep.type === "cell") {
        const subChain = this.buildFormulaChain(dep.reference, dep.sheet || sheet, workbookData, visited);
        chain.push(...subChain);
      }
    }

    return chain;
  }

  /**
   * Calculate blast radius (how many cells affected if this changes)
   */
  private static calculateBlastRadius(cell: string, sheet: string, workbookData: any, depth = 0, visited = new Set<string>()): number {
    if (depth > 10) return 0; // Prevent infinite recursion
    
    const fullRef = `${sheet}!${cell}`;
    if (visited.has(fullRef)) return 0;
    visited.add(fullRef);

    const dependents = this.findDependents(cell, sheet, workbookData);
    let radius = dependents.length;

    // Recursively calculate blast radius of dependents
    for (const dep of dependents) {
      if (dep.type === "cell") {
        radius += this.calculateBlastRadius(dep.reference, dep.sheet || sheet, workbookData, depth + 1, visited);
      }
    }

    return radius;
  }

  /**
   * Visualize dependency graph
   */
  static generateDependencyGraph(cell: string, sheet: string, workbookData: any): {
    nodes: Array<{ id: string; label: string; type: string }>;
    edges: Array<{ from: string; to: string }>;
  } {
    const nodes: Array<{ id: string; label: string; type: string }> = [];
    const edges: Array<{ from: string; to: string }> = [];
    const visited = new Set<string>();

    const traverse = (cellRef: string, sheetName: string, depth: number = 0) => {
      if (depth > 5) return; // Limit depth
      
      const fullRef = `${sheetName}!${cellRef}`;
      if (visited.has(fullRef)) return;
      visited.add(fullRef);

      // Add node
      nodes.push({
        id: fullRef,
        label: cellRef,
        type: "cell",
      });

      // Find dependencies
      const deps = this.findDependencies(cellRef, sheetName, workbookData);
      
      for (const dep of deps) {
        const depFullRef = `${dep.sheet || sheetName}!${dep.reference}`;
        
        // Add edge
        edges.push({
          from: depFullRef,
          to: fullRef,
        });

        // Traverse dependencies
        if (dep.type === "cell") {
          traverse(dep.reference, dep.sheet || sheetName, depth + 1);
        } else {
          // Add as node but don't traverse
          nodes.push({
            id: depFullRef,
            label: dep.reference,
            type: dep.type,
          });
        }
      }
    };

    traverse(cell, sheet);

    return { nodes, edges };
  }
}

