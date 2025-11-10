/**
 * OpenAI Integration for Smart Request Parsing
 * Replaces rule-based AI interpreter with GPT-4
 */

import OpenAI from "openai";
import type { ExcelAction } from "@/types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are an Excel automation expert AI assistant. Your job is to convert user requests into structured JSON action plans for Excel file manipulation.

Available action types:
- trim_clean: Remove spaces and clean text
- remove_duplicates: Remove duplicate rows
- split_column: Split text column into multiple columns
- create_pivot: Create pivot table
- standardize_phone: Format phone numbers
- convert_dates: Standardize date formats
- add_calculated_column: Add formula-based column
- convert_formula: Convert formula types (e.g., VLOOKUP to XLOOKUP)
- filter_data: Filter rows by criteria
- sort_data: Sort by column
- merge_sheets: Combine multiple sheets
- unpivot: Transform wide to long format
- validate_data: Check data quality
- apply_conditional_formatting: Add visual formatting

For each action, include:
- type: The action type from the list above
- description: Human-readable explanation
- params: Object with action-specific parameters

ONLY respond with valid JSON. NO explanations outside the JSON.

Example request: "Split Full Name into First and Last, remove duplicates"
Example response:
{
  "plan": [
    {
      "type": "split_column",
      "description": "Split Full Name into First Name and Last Name",
      "params": {
        "source_col": "Full Name",
        "into": ["First Name", "Last Name"],
        "delimiter": " "
      }
    },
    {
      "type": "trim_clean",
      "description": "Clean the new name columns",
      "params": {}
    },
    {
      "type": "remove_duplicates",
      "description": "Remove duplicate rows",
      "params": {}
    }
  ],
  "confidence": 0.95,
  "clarifications": []
}

If the request is ambiguous, add clarification questions to the clarifications array.
If you're not confident, reduce the confidence score.`;

export class OpenAIInterpreter {
  /**
   * Parse natural language request using GPT-4
   */
  static async parseRequest(request: string): Promise<{
    plan: ExcelAction[];
    confidence: number;
    clarifications: string[];
  }> {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: request },
        ],
        response_format: { type: "json_object" },
        temperature: 0.3, // Lower temperature for more deterministic results
      });

      const content = completion.choices[0].message.content;
      if (!content) {
        throw new Error("Empty response from OpenAI");
      }

      const parsed = JSON.parse(content);
      
      return {
        plan: parsed.plan || [],
        confidence: parsed.confidence || 0.5,
        clarifications: parsed.clarifications || [],
      };
    } catch (error) {
      console.error("OpenAI parsing error:", error);
      
      // Fallback to rule-based parser
      console.log("Falling back to rule-based parser...");
      const { AIInterpreter } = await import("./ai-interpreter");
      const plan = AIInterpreter.parseRequest(request);
      
      return {
        plan,
        confidence: 0.7,
        clarifications: [],
      };
    }
  }

  /**
   * Ask clarifying question about the request
   */
  static async askClarification(
    originalRequest: string,
    context: { headers?: string[]; sheets?: string[] }
  ): Promise<string> {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages: [
          {
            role: "system",
            content: `You are helping a user with an Excel file. The file has these properties:
            Sheets: ${context.sheets?.join(", ") || "unknown"}
            Headers: ${context.headers?.join(", ") || "unknown"}
            
            The user's request is unclear. Ask ONE specific clarifying question about what they want to do.
            Be concise and Excel-focused.`
          },
          {
            role: "user",
            content: originalRequest,
          },
        ],
        temperature: 0.5,
        max_tokens: 100,
      });

      return completion.choices[0].message.content || "Could you please clarify your request?";
    } catch (error) {
      console.error("OpenAI clarification error:", error);
      return "Could you please provide more details about what you want to do?";
    }
  }

  /**
   * Explain what a formula does in plain English
   */
  static async explainFormula(formula: string): Promise<string> {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages: [
          {
            role: "system",
            content: "You are an Excel expert. Explain formulas in simple, plain English. Break down each part step-by-step."
          },
          {
            role: "user",
            content: `Explain this Excel formula: ${formula}`,
          },
        ],
        temperature: 0.3,
        max_tokens: 300,
      });

      return completion.choices[0].message.content || "Could not explain this formula.";
    } catch (error) {
      console.error("OpenAI formula explanation error:", error);
      return "Unable to explain formula at this time.";
    }
  }

  /**
   * Convert old formula to modern Excel 365 equivalent
   */
  static async modernizeFormula(oldFormula: string): Promise<{
    modernFormula: string;
    explanation: string;
    improvements: string[];
  }> {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages: [
          {
            role: "system",
            content: `You are an Excel formula expert. Convert old Excel formulas to modern Excel 365 equivalents.
            
            Common conversions:
            - VLOOKUP → XLOOKUP
            - INDEX/MATCH → XLOOKUP or FILTER
            - SUMPRODUCT → SUMIFS or array formulas
            - Nested IF → IFS or SWITCH
            - OFFSET → INDEX with dynamic arrays
            
            Respond with JSON containing:
            - modernFormula: The converted formula
            - explanation: Why the new version is better
            - improvements: Array of specific benefits`
          },
          {
            role: "user",
            content: oldFormula,
          },
        ],
        response_format: { type: "json_object" },
        temperature: 0.2,
      });

      const content = completion.choices[0].message.content;
      if (!content) {
        throw new Error("Empty response");
      }

      return JSON.parse(content);
    } catch (error) {
      console.error("OpenAI modernize error:", error);
      return {
        modernFormula: oldFormula,
        explanation: "Could not modernize this formula",
        improvements: [],
      };
    }
  }
}

