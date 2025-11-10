import { Recipe } from "@/types";

// Pre-built Excel automation recipes
export const RECIPES: Recipe[] = [
  {
    id: "clean-data-basic",
    title: "Clean & Standardize Data",
    description: "Remove extra spaces, fix capitalization, remove duplicates, and standardize formatting across your dataset.",
    category: "cleaning",
    tags: ["trim", "duplicates", "formatting", "text"],
    usageCount: 1523,
    rating: 4.8,
    createdAt: new Date("2024-01-15"),
    planTemplate: [
      {
        type: "trim_clean",
        description: "Remove leading/trailing spaces and clean non-printable characters",
        params: { applyToAllText: true },
      },
      {
        type: "remove_duplicates",
        description: "Remove duplicate rows based on all columns",
        params: { keepFirst: true },
      },
      {
        type: "standardize_case",
        description: "Apply proper case to text columns",
        params: { style: "proper" },
      },
    ],
  },
  {
    id: "split-full-name",
    title: "Split Full Names",
    description: "Split full names into First Name, Middle Name, and Last Name columns with intelligent handling of various formats.",
    category: "transformation",
    tags: ["text", "split", "names"],
    usageCount: 892,
    rating: 4.6,
    createdAt: new Date("2024-01-20"),
    planTemplate: [
      {
        type: "find_column",
        description: "Locate the Full Name column",
        params: { searchTerms: ["full name", "name", "full_name"] },
      },
      {
        type: "split_names",
        description: "Split names into First, Middle, Last columns",
        params: { method: "smart_split", createColumns: ["First Name", "Middle Name", "Last Name"] },
      },
      {
        type: "trim_clean",
        description: "Clean the new name columns",
      },
    ],
  },
  {
    id: "pivot-monthly-sales",
    title: "Monthly Sales Pivot",
    description: "Create a pivot table showing sales by region and month, with grand totals and formatting.",
    category: "pivot",
    tags: ["pivot", "sales", "analysis", "dates"],
    usageCount: 1245,
    rating: 4.9,
    createdAt: new Date("2024-02-01"),
    planTemplate: [
      {
        type: "convert_dates",
        description: "Ensure date column is properly formatted",
        params: { inferFormat: true },
      },
      {
        type: "create_pivot",
        description: "Create pivot table with Region and Month",
        params: {
          rows: ["Region"],
          columns: ["Month"],
          values: [{ field: "Amount", aggregation: "SUM" }],
          showGrandTotals: true,
        },
      },
      {
        type: "format_pivot",
        description: "Apply currency formatting and styling",
        params: { numberFormat: "currency", style: "medium" },
      },
    ],
  },
  {
    id: "remove-near-duplicates",
    title: "Find & Remove Near-Duplicates",
    description: "Identify and remove rows that are almost identical based on fuzzy matching of key columns.",
    category: "cleaning",
    tags: ["duplicates", "fuzzy", "matching"],
    usageCount: 456,
    rating: 4.5,
    createdAt: new Date("2024-02-10"),
    planTemplate: [
      {
        type: "fuzzy_match",
        description: "Find similar entries using fuzzy matching",
        params: { threshold: 0.9, compareColumns: "all" },
      },
      {
        type: "mark_duplicates",
        description: "Add column marking likely duplicates",
        params: { columnName: "Duplicate Flag" },
      },
      {
        type: "filter_review",
        description: "Create filtered view of duplicates for review",
      },
    ],
  },
  {
    id: "unpivot-data",
    title: "Unpivot Wide to Long",
    description: "Transform wide-format data into long format, perfect for analysis and charting.",
    category: "transformation",
    tags: ["unpivot", "reshape", "powerquery"],
    usageCount: 678,
    rating: 4.7,
    createdAt: new Date("2024-02-15"),
    planTemplate: [
      {
        type: "identify_structure",
        description: "Detect ID columns and value columns",
        params: { method: "auto" },
      },
      {
        type: "unpivot",
        description: "Convert columns to rows",
        params: { keepColumns: "first", attributeColumn: "Month", valueColumn: "Amount" },
      },
      {
        type: "sort",
        description: "Sort by ID and Month",
      },
    ],
  },
  {
    id: "combine-sheets",
    title: "Combine Multiple Sheets",
    description: "Merge all sheets in the workbook into a single table with a source column tracking origin.",
    category: "transformation",
    tags: ["combine", "append", "sheets"],
    usageCount: 834,
    rating: 4.6,
    createdAt: new Date("2024-02-20"),
    planTemplate: [
      {
        type: "list_sheets",
        description: "Find all sheets with similar structure",
        params: { excludePatterns: ["Summary", "Dashboard"] },
      },
      {
        type: "append_sheets",
        description: "Stack all sheets vertically",
        params: { addSourceColumn: true, sourceColumnName: "Sheet Origin" },
      },
      {
        type: "create_table",
        description: "Convert to Excel Table",
        params: { tableName: "CombinedData", style: "TableStyleMedium2" },
      },
    ],
  },
  {
    id: "aging-analysis",
    title: "Accounts Receivable Aging",
    description: "Create aging buckets (0-30, 31-60, 61-90, 90+) from invoice dates with totals.",
    category: "analysis",
    tags: ["aging", "dates", "buckets", "finance"],
    usageCount: 567,
    rating: 4.8,
    createdAt: new Date("2024-03-01"),
    planTemplate: [
      {
        type: "calculate_age",
        description: "Calculate days between invoice date and today",
        params: { dateColumn: "Invoice Date", newColumn: "Days Outstanding" },
      },
      {
        type: "create_buckets",
        description: "Add aging bucket column",
        params: {
          sourceColumn: "Days Outstanding",
          newColumn: "Aging Bucket",
          buckets: [
            { min: 0, max: 30, label: "0-30 days" },
            { min: 31, max: 60, label: "31-60 days" },
            { min: 61, max: 90, label: "61-90 days" },
            { min: 91, max: 99999, label: "90+ days" },
          ],
        },
      },
      {
        type: "summary_by_bucket",
        description: "Create summary table with totals",
        params: { groupBy: "Aging Bucket", sumColumn: "Amount" },
      },
    ],
  },
  {
    id: "vlookup-to-xlookup",
    title: "Convert VLOOKUP to XLOOKUP",
    description: "Automatically find and replace all VLOOKUP formulas with modern XLOOKUP equivalents.",
    category: "transformation",
    tags: ["formulas", "xlookup", "modernize"],
    usageCount: 392,
    rating: 4.4,
    createdAt: new Date("2024-03-05"),
    planTemplate: [
      {
        type: "scan_formulas",
        description: "Find all VLOOKUP formulas in workbook",
        params: { formulaType: "VLOOKUP" },
      },
      {
        type: "convert_formula",
        description: "Convert to XLOOKUP with error handling",
        params: { target: "XLOOKUP", addErrorHandling: true, defaultValue: "Not Found" },
      },
      {
        type: "validate",
        description: "Verify results match original",
        params: { compareOutputs: true },
      },
    ],
  },
  {
    id: "phone-number-format",
    title: "Standardize Phone Numbers",
    description: "Clean and format phone numbers to a consistent format (e.g., +234-XXX-XXX-XXXX).",
    category: "cleaning",
    tags: ["phone", "formatting", "text"],
    usageCount: 421,
    rating: 4.5,
    createdAt: new Date("2024-03-10"),
    planTemplate: [
      {
        type: "find_phone_column",
        description: "Locate phone number columns",
        params: { searchTerms: ["phone", "mobile", "tel", "contact"] },
      },
      {
        type: "clean_phone",
        description: "Remove special characters and spaces",
        params: { keepOnlyDigits: true },
      },
      {
        type: "format_phone",
        description: "Apply standard format",
        params: { countryCode: "234", format: "+XXX-XXX-XXX-XXXX" },
      },
    ],
  },
  {
    id: "conditional-formatting-rules",
    title: "Smart Conditional Formatting",
    description: "Apply color scales, data bars, and icon sets based on data patterns.",
    category: "formatting",
    tags: ["formatting", "conditional", "visual"],
    usageCount: 745,
    rating: 4.7,
    createdAt: new Date("2024-03-15"),
    planTemplate: [
      {
        type: "analyze_columns",
        description: "Detect numeric, date, and text columns",
      },
      {
        type: "apply_conditional",
        description: "Add appropriate formatting rules",
        params: {
          numeric: "data_bars",
          dates: "color_scale",
          status: "icon_sets",
        },
      },
    ],
  },
  {
    id: "extract-unique-list",
    title: "Extract Unique Values",
    description: "Create a sorted list of unique values from selected columns with counts.",
    category: "analysis",
    tags: ["unique", "distinct", "summary"],
    usageCount: 612,
    rating: 4.6,
    createdAt: new Date("2024-03-20"),
    planTemplate: [
      {
        type: "unique_values",
        description: "Extract unique values using UNIQUE function",
        params: { sourceColumns: "selected", sorted: true },
      },
      {
        type: "count_occurrences",
        description: "Add count of each unique value",
        params: { countColumn: "Count" },
      },
      {
        type: "format_as_table",
        description: "Convert to formatted table",
        params: { tableName: "UniqueList" },
      },
    ],
  },
  {
    id: "currency-conversion",
    title: "Currency Conversion",
    description: "Convert amounts between currencies using specified exchange rates with proper formatting.",
    category: "transformation",
    tags: ["currency", "conversion", "finance"],
    usageCount: 334,
    rating: 4.3,
    createdAt: new Date("2024-03-25"),
    planTemplate: [
      {
        type: "detect_currency_column",
        description: "Find amount columns",
      },
      {
        type: "add_conversion_column",
        description: "Create converted amount column",
        params: { fromCurrency: "USD", toCurrency: "NGN", rateSource: "specified" },
      },
      {
        type: "format_currency",
        description: "Apply currency number formatting",
        params: { symbol: "₦", decimals: 2 },
      },
    ],
  },
  {
    id: "email-validation",
    title: "Email Address Validation",
    description: "Validate and clean email addresses, flag invalid formats, and extract domains.",
    category: "cleaning",
    tags: ["email", "validation", "text", "cleaning"],
    usageCount: 567,
    rating: 4.7,
    createdAt: new Date("2024-04-01"),
    planTemplate: [
      {
        type: "find_email_column",
        description: "Locate email address columns",
        params: { searchTerms: ["email", "mail", "contact"] },
      },
      {
        type: "validate_email",
        description: "Check email format validity",
        params: { addValidationColumn: true, columnName: "Email Valid" },
      },
      {
        type: "extract_domain",
        description: "Extract domain from email",
        params: { newColumn: "Email Domain" },
      },
      {
        type: "clean_trim",
        description: "Remove spaces and fix casing",
        params: { toLowerCase: true },
      },
    ],
  },
  {
    id: "percentage-calculations",
    title: "Percentage Change Analysis",
    description: "Calculate percentage changes, growth rates, and variance between periods with formatting.",
    category: "analysis",
    tags: ["percentage", "growth", "variance", "analysis"],
    usageCount: 834,
    rating: 4.8,
    createdAt: new Date("2024-04-05"),
    planTemplate: [
      {
        type: "identify_numeric_columns",
        description: "Find columns with numeric data",
      },
      {
        type: "calculate_change",
        description: "Calculate percentage change between periods",
        params: { method: "percent_change", newColumn: "% Change" },
      },
      {
        type: "add_variance_column",
        description: "Add variance analysis",
        params: { newColumn: "Variance", formula: "=current-previous" },
      },
      {
        type: "format_percentages",
        description: "Apply percentage formatting",
        params: { decimals: 1, style: "with_symbol" },
      },
      {
        type: "conditional_coloring",
        description: "Color code positive/negative changes",
        params: { positive: "green", negative: "red" },
      },
    ],
  },
  {
    id: "data-deduplication-advanced",
    title: "Advanced Deduplication",
    description: "Remove duplicates based on custom criteria, keep best records, and log changes.",
    category: "cleaning",
    tags: ["duplicates", "dedup", "cleaning", "advanced"],
    usageCount: 423,
    rating: 4.6,
    createdAt: new Date("2024-04-10"),
    planTemplate: [
      {
        type: "analyze_duplicates",
        description: "Identify duplicate records",
        params: { keyColumns: "selected", showStats: true },
      },
      {
        type: "rank_duplicates",
        description: "Rank duplicates by completeness/recency",
        params: { rankBy: ["completeness", "date"], order: "desc" },
      },
      {
        type: "keep_best_records",
        description: "Keep highest ranked duplicate",
        params: { method: "top_rank" },
      },
      {
        type: "create_audit_log",
        description: "Log removed duplicates to separate sheet",
        params: { logSheet: "Removed_Duplicates" },
      },
    ],
  },
  {
    id: "text-find-replace",
    title: "Bulk Find & Replace",
    description: "Find and replace multiple text patterns across all text columns with preview.",
    category: "transformation",
    tags: ["find", "replace", "text", "bulk"],
    usageCount: 712,
    rating: 4.5,
    createdAt: new Date("2024-04-15"),
    planTemplate: [
      {
        type: "identify_text_columns",
        description: "Find all text columns",
      },
      {
        type: "find_replace",
        description: "Apply find and replace patterns",
        params: {
          patterns: [
            { find: "Inc.", replace: "Incorporated" },
            { find: "Co.", replace: "Company" },
            { find: "Ltd.", replace: "Limited" },
          ],
          caseSensitive: false,
        },
      },
      {
        type: "show_changes",
        description: "Highlight changed cells",
        params: { highlightColor: "yellow" },
      },
    ],
  },
  {
    id: "date-range-filter",
    title: "Date Range Filtering",
    description: "Filter data by date ranges, create date buckets, and generate period summaries.",
    category: "analysis",
    tags: ["date", "filter", "range", "period"],
    usageCount: 645,
    rating: 4.7,
    createdAt: new Date("2024-04-20"),
    planTemplate: [
      {
        type: "detect_date_columns",
        description: "Identify date columns",
      },
      {
        type: "filter_by_date_range",
        description: "Filter to specified date range",
        params: { start: "auto", end: "auto", includeNull: false },
      },
      {
        type: "create_period_buckets",
        description: "Group into periods (daily/weekly/monthly)",
        params: { period: "monthly", newColumn: "Period" },
      },
      {
        type: "summarize_by_period",
        description: "Create period summary",
        params: { aggregations: ["count", "sum"], groupBy: "Period" },
      },
    ],
  },
  {
    id: "column-reordering",
    title: "Smart Column Reordering",
    description: "Reorganize columns by importance, alphabetically, or custom order with drag-drop interface.",
    category: "formatting",
    tags: ["columns", "reorder", "organize", "structure"],
    usageCount: 389,
    rating: 4.4,
    createdAt: new Date("2024-04-25"),
    planTemplate: [
      {
        type: "analyze_columns",
        description: "Identify all columns and their types",
      },
      {
        type: "suggest_order",
        description: "Suggest logical column order",
        params: { method: "importance", idColumnsFirst: true },
      },
      {
        type: "reorder_columns",
        description: "Apply new column order",
        params: { order: "suggested" },
      },
      {
        type: "group_similar",
        description: "Group related columns together",
        params: { byType: true, addSpacers: false },
      },
    ],
  },
  {
    id: "data-type-conversion",
    title: "Data Type Conversion",
    description: "Automatically detect and convert data types (text to number, dates, etc.) with validation.",
    category: "transformation",
    tags: ["conversion", "data types", "validation"],
    usageCount: 891,
    rating: 4.8,
    createdAt: new Date("2024-05-01"),
    planTemplate: [
      {
        type: "detect_data_types",
        description: "Analyze current data types in each column",
      },
      {
        type: "identify_mismatches",
        description: "Find type mismatches (numbers stored as text)",
        params: { highlightIssues: true },
      },
      {
        type: "convert_types",
        description: "Convert to correct data types",
        params: { textToNumber: true, textToDate: true, preserveOriginal: false },
      },
      {
        type: "validate_conversions",
        description: "Check conversion success and flag errors",
        params: { addValidationColumn: true },
      },
    ],
  },
  {
    id: "outlier-detection",
    title: "Outlier Detection & Flagging",
    description: "Identify statistical outliers using standard deviation or IQR method and flag for review.",
    category: "analysis",
    tags: ["outliers", "statistics", "data quality", "validation"],
    usageCount: 456,
    rating: 4.6,
    createdAt: new Date("2024-05-05"),
    planTemplate: [
      {
        type: "select_numeric_columns",
        description: "Identify numeric columns for analysis",
      },
      {
        type: "calculate_statistics",
        description: "Calculate mean, median, std deviation",
        params: { method: "descriptive" },
      },
      {
        type: "detect_outliers",
        description: "Flag outliers using IQR or Z-score method",
        params: { method: "IQR", threshold: 1.5 },
      },
      {
        type: "add_outlier_column",
        description: "Add outlier flag column",
        params: { columnName: "Is Outlier", highlightOutliers: true },
      },
      {
        type: "create_outlier_summary",
        description: "Generate summary of outliers found",
        params: { summarySheet: "Outlier_Analysis" },
      },
    ],
  },
  {
    id: "header-standardization",
    title: "Header Standardization",
    description: "Clean and standardize column headers: remove spaces, fix casing, remove special characters.",
    category: "cleaning",
    tags: ["headers", "columns", "standardize", "naming"],
    usageCount: 534,
    rating: 4.5,
    createdAt: new Date("2024-05-10"),
    planTemplate: [
      {
        type: "analyze_headers",
        description: "Review current header names",
      },
      {
        type: "standardize_headers",
        description: "Apply standardization rules",
        params: {
          removeSpaces: true,
          replaceWith: "_",
          casing: "snake_case",
          removeSpecialChars: true,
        },
      },
      {
        type: "check_duplicates",
        description: "Ensure no duplicate column names",
        params: { addSuffix: true },
      },
      {
        type: "preview_changes",
        description: "Show before/after comparison",
        params: { requireConfirmation: true },
      },
    ],
  },
  {
    id: "conditional-aggregation",
    title: "Conditional Aggregation",
    description: "Create dynamic summaries with SUMIFS, COUNTIFS, AVERAGEIFS based on multiple conditions.",
    category: "analysis",
    tags: ["aggregation", "summary", "conditional", "formulas"],
    usageCount: 723,
    rating: 4.9,
    createdAt: new Date("2024-05-15"),
    planTemplate: [
      {
        type: "identify_dimensions",
        description: "Find categorical columns for grouping",
      },
      {
        type: "identify_measures",
        description: "Find numeric columns to aggregate",
      },
      {
        type: "create_summary_table",
        description: "Build conditional aggregation table",
        params: {
          groupBy: ["Category", "Region"],
          aggregations: [
            { field: "Amount", function: "SUMIFS" },
            { field: "Quantity", function: "COUNTIFS" },
            { field: "Price", function: "AVERAGEIFS" },
          ],
        },
      },
      {
        type: "format_results",
        description: "Format aggregated values",
        params: { numberFormat: "accounting", decimals: 2 },
      },
    ],
  },
];

// Recipe categories for filtering
export const RECIPE_CATEGORIES = [
  { id: "all", name: "All Recipes", count: RECIPES.length },
  { id: "cleaning", name: "Data Cleaning", count: RECIPES.filter(r => r.category === "cleaning").length },
  { id: "transformation", name: "Transformation", count: RECIPES.filter(r => r.category === "transformation").length },
  { id: "analysis", name: "Analysis", count: RECIPES.filter(r => r.category === "analysis").length },
  { id: "formatting", name: "Formatting", count: RECIPES.filter(r => r.category === "formatting").length },
  { id: "pivot", name: "Pivot Tables", count: RECIPES.filter(r => r.category === "pivot").length },
  { id: "lookup", name: "Lookups", count: RECIPES.filter(r => r.category === "lookup").length },
  { id: "automation", name: "Automation", count: RECIPES.filter(r => r.category === "automation").length },
];

