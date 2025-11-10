/**
 * User-friendly error messages for ExcelAI
 * Provides clear, actionable error messages with suggestions
 */

export interface ErrorMessage {
  title: string;
  message: string;
  suggestion?: string;
  action?: string;
  severity: "error" | "warning" | "info";
}

export class ExcelAIError {
  /**
   * File upload errors
   */
  static fileUpload = {
    tooLarge: (maxSize: number): ErrorMessage => ({
      title: "File Too Large",
      message: `Your file exceeds the maximum size of ${maxSize}MB.`,
      suggestion: "Try compressing your file or removing unnecessary data, or upgrade to Pro for larger files.",
      action: "View Pricing",
      severity: "error",
    }),

    invalidType: (): ErrorMessage => ({
      title: "Invalid File Type",
      message: "Only Excel files (.xlsx, .xlsm, .xls) are supported.",
      suggestion: "Please save your file in Excel format and try again.",
      action: "Learn More",
      severity: "error",
    }),

    corrupted: (): ErrorMessage => ({
      title: "File Appears Corrupted",
      message: "We couldn't read your Excel file. It may be corrupted or password-protected.",
      suggestion: "Try opening the file in Excel, saving it again, and re-uploading.",
      action: "Get Help",
      severity: "error",
    }),

    networkError: (): ErrorMessage => ({
      title: "Upload Failed",
      message: "Network error occurred during upload.",
      suggestion: "Check your internet connection and try again.",
      action: "Retry",
      severity: "error",
    }),
  };

  /**
   * Processing errors
   */
  static processing = {
    columnNotFound: (columnName: string): ErrorMessage => ({
      title: "Column Not Found",
      message: `We couldn't find a column named "${columnName}" in your file.`,
      suggestion: "Check the column name in your request or upload a different file.",
      action: "View Preview",
      severity: "error",
    }),

    invalidFormula: (formula: string): ErrorMessage => ({
      title: "Invalid Formula",
      message: `The formula "${formula}" contains errors and couldn't be applied.`,
      suggestion: "Check the formula syntax or use a pre-built recipe instead.",
      action: "Browse Recipes",
      severity: "error",
    }),

    insufficientData: (): ErrorMessage => ({
      title: "Insufficient Data",
      message: "Your file doesn't have enough data to perform this operation.",
      suggestion: "Ensure your file has at least 2 rows (header + data).",
      action: "Upload Different File",
      severity: "warning",
    }),

    timeout: (operation: string): ErrorMessage => ({
      title: "Processing Timeout",
      message: `The operation "${operation}" took too long and was cancelled.`,
      suggestion: "Try with a smaller file or break the task into smaller steps.",
      action: "Contact Support",
      severity: "error",
    }),
  };

  /**
   * Data quality warnings
   */
  static dataQuality = {
    mergedCells: (count: number): ErrorMessage => ({
      title: "Merged Cells Detected",
      message: `Found ${count} merged cells in your file.`,
      suggestion: "Merged cells can cause issues with data processing. We recommend unmerging them.",
      action: "Auto-Fix",
      severity: "warning",
    }),

    mixedTypes: (column: string): ErrorMessage => ({
      title: "Mixed Data Types",
      message: `Column "${column}" contains both numbers and text.`,
      suggestion: "This may cause calculation errors. Would you like us to clean it?",
      action: "Auto-Convert",
      severity: "warning",
    }),

    blankHeaders: (): ErrorMessage => ({
      title: "Blank Column Headers",
      message: "Some columns don't have names.",
      suggestion: "We can auto-generate names like 'Column_A', 'Column_B', etc.",
      action: "Auto-Name",
      severity: "warning",
    }),

    duplicateHeaders: (headers: string[]): ErrorMessage => ({
      title: "Duplicate Column Names",
      message: `Found duplicate headers: ${headers.join(", ")}`,
      suggestion: "We'll add numbers to make them unique (e.g., 'Name', 'Name_2').",
      action: "Auto-Fix",
      severity: "warning",
    }),
  };

  /**
   * Rate limit and quota errors
   */
  static quota = {
    dailyLimit: (limit: number): ErrorMessage => ({
      title: "Daily Limit Reached",
      message: `You've used all ${limit} free jobs for today.`,
      suggestion: "Upgrade to Pro for unlimited processing, or wait until tomorrow.",
      action: "Upgrade Now",
      severity: "warning",
    }),

    fileSizeLimit: (currentSize: number, limit: number): ErrorMessage => ({
      title: "File Size Limit",
      message: `Your file (${currentSize}MB) exceeds the ${limit}MB limit for your plan.`,
      suggestion: "Upgrade to Pro for 100MB files, or reduce your file size.",
      action: "View Pricing",
      severity: "error",
    }),
  };

  /**
   * AI parsing errors
   */
  static ai = {
    ambiguous: (clarification: string): ErrorMessage => ({
      title: "Need More Information",
      message: "Your request is unclear.",
      suggestion: clarification,
      action: "Revise Request",
      severity: "info",
    }),

    noActionsFound: (): ErrorMessage => ({
      title: "Couldn't Understand Request",
      message: "We couldn't determine what you want to do.",
      suggestion: "Try being more specific, or browse our Recipe Gallery for examples.",
      action: "View Recipes",
      severity: "info",
    }),

    unsafeOperation: (operation: string): ErrorMessage => ({
      title: "Safety Check",
      message: `The operation "${operation}" will modify your data significantly.`,
      suggestion: "We'll create a backup first. Original data will be preserved on a separate sheet.",
      action: "Proceed Safely",
      severity: "warning",
    }),
  };

  /**
   * Generic errors
   */
  static generic = {
    unknown: (): ErrorMessage => ({
      title: "Unexpected Error",
      message: "Something went wrong on our end.",
      suggestion: "Please try again. If the problem persists, contact support.",
      action: "Contact Support",
      severity: "error",
    }),

    maintenance: (): ErrorMessage => ({
      title: "Scheduled Maintenance",
      message: "ExcelAI is currently undergoing scheduled maintenance.",
      suggestion: "We'll be back shortly. Check our status page for updates.",
      action: "Status Page",
      severity: "info",
    }),
  };
}

/**
 * Get user-friendly error message from error object
 */
export function getUserFriendlyError(error: any): ErrorMessage {
  // Network errors
  if (error?.message?.includes("fetch") || error?.message?.includes("network")) {
    return ExcelAIError.fileUpload.networkError();
  }

  // File type errors
  if (error?.message?.includes("file type") || error?.message?.includes("format")) {
    return ExcelAIError.fileUpload.invalidType();
  }

  // Size errors
  if (error?.message?.includes("too large") || error?.message?.includes("size")) {
    return ExcelAIError.fileUpload.tooLarge(100);
  }

  // Column errors
  if (error?.message?.includes("column") && error?.message?.includes("not found")) {
    const match = error.message.match(/['"]([^'"]+)['"]/);
    const columnName = match ? match[1] : "unknown";
    return ExcelAIError.processing.columnNotFound(columnName);
  }

  // Timeout errors
  if (error?.message?.includes("timeout") || error?.message?.includes("timed out")) {
    return ExcelAIError.processing.timeout("File processing");
  }

  // Default
  return ExcelAIError.generic.unknown();
}

