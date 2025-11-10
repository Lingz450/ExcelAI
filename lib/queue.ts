/**
 * Job Queue System for Background Processing
 * Uses in-memory queue for development, Redis for production
 */

interface QueueJob {
  id: string;
  type: string;
  data: any;
  status: "pending" | "processing" | "completed" | "failed";
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  error?: string;
  result?: any;
}

class SimpleQueue {
  private jobs: Map<string, QueueJob> = new Map();
  private processing: boolean = false;

  async add(type: string, data: any): Promise<string> {
    const jobId = `queue-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const job: QueueJob = {
      id: jobId,
      type,
      data,
      status: "pending",
      createdAt: new Date(),
    };

    this.jobs.set(jobId, job);
    
    // Start processing if not already running
    if (!this.processing) {
      this.processQueue();
    }

    return jobId;
  }

  private async processQueue() {
    this.processing = true;

    while (this.jobs.size > 0) {
      const pendingJobs = Array.from(this.jobs.values())
        .filter(j => j.status === "pending")
        .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

      if (pendingJobs.length === 0) {
        break;
      }

      const job = pendingJobs[0];
      await this.processJob(job);
    }

    this.processing = false;
  }

  private async processJob(job: QueueJob) {
    try {
      job.status = "processing";
      job.startedAt = new Date();

      // Route to appropriate processor
      switch (job.type) {
        case "process-excel":
          job.result = await this.processExcelJob(job.data);
          break;
        default:
          throw new Error(`Unknown job type: ${job.type}`);
      }

      job.status = "completed";
      job.completedAt = new Date();
    } catch (error: any) {
      job.status = "failed";
      job.error = error.message;
      job.completedAt = new Date();
    }
  }

  private async processExcelJob(data: any): Promise<any> {
    const { workbookId, plan } = data;

    // Call Python backend or execute processing
    // In a real implementation, this would:
    // 1. Load the file from storage
    // 2. Execute the plan using excel_processor.py
    // 3. Save the result
    // 4. Update the database

    return {
      processed: true,
      workbookId,
      planExecuted: plan,
    };
  }

  async getJob(jobId: string): Promise<QueueJob | undefined> {
    return this.jobs.get(jobId);
  }

  async getStatus(jobId: string): Promise<string> {
    const job = this.jobs.get(jobId);
    return job?.status || "not_found";
  }

  async remove(jobId: string): Promise<void> {
    this.jobs.delete(jobId);
  }

  // Clean up old jobs
  async cleanup(olderThan: number = 24 * 60 * 60 * 1000) {
    const now = Date.now();
    let removed = 0;

    for (const [id, job] of this.jobs.entries()) {
      const age = now - job.createdAt.getTime();
      if (age > olderThan) {
        this.jobs.delete(id);
        removed++;
      }
    }

    return removed;
  }
}

// Singleton instance
let queueInstance: SimpleQueue | null = null;

export function getQueue(): SimpleQueue {
  if (!queueInstance) {
    queueInstance = new SimpleQueue();
  }
  return queueInstance;
}

export const jobQueue = {
  add: async (type: string, data: any) => {
    return getQueue().add(type, data);
  },
  getStatus: async (jobId: string) => {
    return getQueue().getStatus(jobId);
  },
  getJob: async (jobId: string) => {
    return getQueue().getJob(jobId);
  },
  cleanup: async () => {
    return getQueue().cleanup();
  },
};

