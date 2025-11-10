/**
 * Structured Logging System
 * Provides consistent logging across the application
 */

export type LogLevel = "debug" | "info" | "warn" | "error";

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: string;
  metadata?: Record<string, any>;
  requestId?: string;
  userId?: string;
}

class Logger {
  private context: string;

  constructor(context: string = "App") {
    this.context = context;
  }

  private log(level: LogLevel, message: string, metadata?: Record<string, any>) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context: this.context,
      metadata,
    };

    // In development, use console
    if (process.env.NODE_ENV === "development") {
      const consoleMethod = level === "error" ? "error" : level === "warn" ? "warn" : "log";
      console[consoleMethod](
        `[${entry.timestamp}] [${level.toUpperCase()}] [${this.context}]`,
        message,
        metadata || ""
      );
    } else {
      // In production, send to logging service (e.g., Sentry, LogRocket)
      console.log(JSON.stringify(entry));
    }
  }

  debug(message: string, metadata?: Record<string, any>) {
    this.log("debug", message, metadata);
  }

  info(message: string, metadata?: Record<string, any>) {
    this.log("info", message, metadata);
  }

  warn(message: string, metadata?: Record<string, any>) {
    this.log("warn", message, metadata);
  }

  error(message: string, error?: Error, metadata?: Record<string, any>) {
    this.log("error", message, {
      ...metadata,
      error: error ? {
        message: error.message,
        stack: error.stack,
        name: error.name,
      } : undefined,
    });
  }

  // Performance tracking
  startTimer(label: string): () => void {
    const start = Date.now();
    return () => {
      const duration = Date.now() - start;
      this.info(`${label} completed`, { durationMs: duration });
    };
  }
}

// Create loggers for different contexts
export const logger = {
  api: new Logger("API"),
  upload: new Logger("Upload"),
  processing: new Logger("Processing"),
  auth: new Logger("Auth"),
  payment: new Logger("Payment"),
  database: new Logger("Database"),
  general: new Logger("App"),
};

// Request tracking
export function generateRequestId(): string {
  return `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Usage example:
// import { logger } from "@/lib/logger";
// logger.api.info("File uploaded", { fileName, fileSize });
// logger.api.error("Upload failed", error, { fileName });

