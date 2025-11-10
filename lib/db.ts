import { PrismaClient } from "@prisma/client";

// Prisma Client Singleton Pattern
// Prevents multiple instances in development with hot reloading

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Database utility functions
export const db = {
  /**
   * Users
   */
  users: {
    findByEmail: async (email: string) => {
      return prisma.user.findUnique({ where: { email } });
    },
    create: async (data: { email: string; name?: string }) => {
      return prisma.user.create({ data });
    },
    updateSubscription: async (userId: string, subscription: "FREE" | "PRO" | "TEAM" | "ENTERPRISE") => {
      return prisma.user.update({
        where: { id: userId },
        data: { subscription },
      });
    },
  },

  /**
   * Workbooks
   */
  workbooks: {
    create: async (data: {
      userId: string;
      originalFilename: string;
      storageKey: string;
      fileSize: number;
      expiresAt: Date;
    }) => {
      return prisma.workbook.create({ data });
    },
    findById: async (id: string) => {
      return prisma.workbook.findUnique({ where: { id } });
    },
    findByUser: async (userId: string, limit = 20) => {
      return prisma.workbook.findMany({
        where: { userId },
        orderBy: { uploadedAt: "desc" },
        take: limit,
      });
    },
    deleteExpired: async () => {
      const now = new Date();
      return prisma.workbook.deleteMany({
        where: { expiresAt: { lte: now } },
      });
    },
  },

  /**
   * Jobs
   */
  jobs: {
    create: async (data: {
      userId: string;
      workbookId: string;
      requestText: string;
      plan?: any;
    }) => {
      return prisma.job.create({ data });
    },
    findById: async (id: string) => {
      return prisma.job.findUnique({
        where: { id },
        include: {
          workbook: true,
          outputs: true,
          logs: true,
        },
      });
    },
    updateStatus: async (id: string, status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED") => {
      return prisma.job.update({
        where: { id },
        data: { status },
      });
    },
    complete: async (id: string, executionTimeMs: number) => {
      return prisma.job.update({
        where: { id },
        data: {
          status: "COMPLETED",
          finishedAt: new Date(),
          executionTimeMs,
        },
      });
    },
    findByUser: async (userId: string, limit = 50) => {
      return prisma.job.findMany({
        where: { userId },
        orderBy: { startedAt: "desc" },
        take: limit,
        include: { workbook: true },
      });
    },
  },

  /**
   * Job Outputs
   */
  outputs: {
    create: async (data: {
      jobId: string;
      outputStorageKey: string;
      diffSummary: any;
      version?: number;
    }) => {
      return prisma.jobOutput.create({ data });
    },
  },

  /**
   * Job Logs
   */
  logs: {
    add: async (data: {
      jobId: string;
      level: "INFO" | "WARNING" | "ERROR" | "DEBUG";
      message: string;
      details?: any;
    }) => {
      return prisma.jobLog.create({ data });
    },
    getForJob: async (jobId: string) => {
      return prisma.jobLog.findMany({
        where: { jobId },
        orderBy: { timestamp: "asc" },
      });
    },
  },

  /**
   * Usage Tracking
   */
  usage: {
    track: async (userId: string) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return prisma.usage.upsert({
        where: {
          userId_date: {
            userId,
            date: today,
          },
        },
        update: {
          jobsRun: { increment: 1 },
        },
        create: {
          userId,
          date: today,
          jobsRun: 1,
        },
      });
    },
    getToday: async (userId: string) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return prisma.usage.findUnique({
        where: {
          userId_date: {
            userId,
            date: today,
          },
        },
      });
    },
  },

  /**
   * Custom Recipes
   */
  recipes: {
    create: async (data: {
      userId: string;
      title: string;
      description: string;
      category: string;
      planTemplate: any;
      tags: string[];
    }) => {
      return prisma.customRecipe.create({ data });
    },
    findPublic: async () => {
      return prisma.customRecipe.findMany({
        where: { isPublic: true },
        orderBy: { usageCount: "desc" },
      });
    },
    findByUser: async (userId: string) => {
      return prisma.customRecipe.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
      });
    },
  },
};

