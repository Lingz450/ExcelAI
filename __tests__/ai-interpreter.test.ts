/**
 * Tests for AI Interpreter
 * Ensures request parsing works correctly
 */

import { AIInterpreter } from "@/lib/ai-interpreter";

describe("AIInterpreter", () => {
  describe("parseRequest", () => {
    it("should parse duplicate removal request", () => {
      const plan = AIInterpreter.parseRequest("Remove duplicates from my data");
      
      expect(plan).toHaveLength(1);
      expect(plan[0].type).toBe("remove_duplicates");
      expect(plan[0].description).toContain("Remove duplicate rows");
    });

    it("should parse name splitting request", () => {
      const plan = AIInterpreter.parseRequest("Split full name into first and last name");
      
      const splitAction = plan.find(a => a.type === "split_column");
      expect(splitAction).toBeDefined();
      expect(splitAction?.params?.into).toEqual(["First Name", "Last Name"]);
    });

    it("should parse pivot table request", () => {
      const plan = AIInterpreter.parseRequest("Create pivot table by region and month");
      
      const pivotAction = plan.find(a => a.type === "create_pivot");
      expect(pivotAction).toBeDefined();
      expect(pivotAction?.params?.rows).toBeDefined();
    });

    it("should parse phone standardization request", () => {
      const plan = AIInterpreter.parseRequest("Standardize phone numbers to +234 format");
      
      const phoneAction = plan.find(a => a.type === "standardize_phone");
      expect(phoneAction).toBeDefined();
      expect(phoneAction?.params?.country_code).toBe("234");
    });

    it("should parse cleaning request", () => {
      const plan = AIInterpreter.parseRequest("Clean and trim all text fields");
      
      const cleanAction = plan.find(a => a.type === "trim_clean");
      expect(cleanAction).toBeDefined();
    });

    it("should handle multiple operations", () => {
      const plan = AIInterpreter.parseRequest(
        "Remove duplicates, clean data, and create pivot table"
      );
      
      expect(plan.length).toBeGreaterThan(1);
      expect(plan.some(a => a.type === "remove_duplicates")).toBe(true);
      expect(plan.some(a => a.type === "trim_clean")).toBe(true);
    });
  });

  describe("validatePlan", () => {
    it("should validate a good plan", () => {
      const plan = [
        { type: "trim_clean", description: "Clean data", params: {} },
        { type: "remove_duplicates", description: "Remove dupes", params: {} },
      ];
      
      const result = AIInterpreter.validatePlan(plan);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("should reject empty plan", () => {
      const result = AIInterpreter.validatePlan([]);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain("No actions to perform");
    });
  });

  describe("summarizePlan", () => {
    it("should create human-readable summary", () => {
      const plan = [
        { type: "trim_clean", description: "Clean text fields", params: {} },
        { type: "remove_duplicates", description: "Remove duplicate rows", params: {} },
      ];
      
      const summary = AIInterpreter.summarizePlan(plan);
      expect(summary).toContain("2 action");
      expect(summary).toContain("Clean text fields");
      expect(summary).toContain("Remove duplicate rows");
    });

    it("should handle empty plan", () => {
      const summary = AIInterpreter.summarizePlan([]);
      expect(summary).toBe("No actions to perform");
    });
  });
});

