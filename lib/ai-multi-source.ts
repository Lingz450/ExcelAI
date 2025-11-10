// Multi-AI Source Integration
// Combines responses from OpenAI GPT-4/5, Google Gemini, and other sources

import { OpenAIService } from "./ai-openai";
import { GeminiAI } from "./ai-gemini";

interface AIResponse {
  source: "openai" | "gemini" | "ensemble";
  plan: any;
  summary: string;
  confidence: number;
}

export class MultiAIService {
  private openai: OpenAIService;
  private gemini: GeminiAI;

  constructor() {
    this.openai = new OpenAIService();
    this.gemini = new GeminiAI();
  }

  /**
   * Get responses from multiple AI sources and combine them
   */
  async parseRequest(userRequest: string): Promise<AIResponse> {
    try {
      console.log("[Multi-AI] Processing request with multiple AI sources...");

      // Call both AI services in parallel
      const [openaiResponse, geminiResponse] = await Promise.allSettled([
        this.callOpenAI(userRequest),
        this.callGemini(userRequest)
      ]);

      // Combine responses
      const responses: AIResponse[] = [];

      if (openaiResponse.status === "fulfilled") {
        responses.push(openaiResponse.value);
      }
      if (geminiResponse.status === "fulfilled") {
        responses.push(geminiResponse.value);
      }

      // If no responses succeeded, throw error
      if (responses.length === 0) {
        throw new Error("All AI sources failed to respond");
      }

      // Use ensemble approach: prefer highest confidence
      // or combine actions from multiple sources
      const bestResponse = this.selectBestResponse(responses);

      console.log(`[Multi-AI] Selected ${bestResponse.source} response with confidence ${bestResponse.confidence}`);

      return bestResponse;
    } catch (error: any) {
      console.error("[Multi-AI] Error:", error);
      throw error;
    }
  }

  private async callOpenAI(request: string): Promise<AIResponse> {
    try {
      const result = await this.openai.parseRequest(request);
      return {
        source: "openai",
        plan: result,
        summary: result.summary || "OpenAI interpretation",
        confidence: 0.9
      };
    } catch (error: any) {
      console.error("[Multi-AI] OpenAI failed:", error.message);
      throw error;
    }
  }

  private async callGemini(request: string): Promise<AIResponse> {
    try {
      const result = await this.gemini.parseRequest(request);
      return {
        source: "gemini",
        plan: result.plan,
        summary: result.summary,
        confidence: result.confidence
      };
    } catch (error: any) {
      console.error("[Multi-AI] Gemini failed:", error.message);
      throw error;
    }
  }

  /**
   * Select the best response based on confidence and completeness
   */
  private selectBestResponse(responses: AIResponse[]): AIResponse {
    if (responses.length === 1) {
      return responses[0];
    }

    // Sort by confidence
    responses.sort((a, b) => b.confidence - a.confidence);

    // Return highest confidence response
    // Future: Combine actions from multiple sources
    return {
      ...responses[0],
      source: "ensemble",
      summary: `Combined interpretation from ${responses.map(r => r.source).join(", ")}`
    };
  }

  /**
   * Validate that the AI response is complete and actionable
   */
  private validateResponse(response: AIResponse): boolean {
    if (!response.plan || !response.plan.actions) {
      return false;
    }
    if (response.plan.actions.length === 0) {
      return false;
    }
    return true;
  }
}


