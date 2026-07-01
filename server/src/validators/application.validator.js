import { z } from "zod";

export const applyJobSchema = z.object({
  jobId: z.string().min(1),
});

export const updateStatusSchema = z.object({
  status: z.enum([
    "PENDING",
    "SHORTLISTED",
    "REJECTED",
  ]),
});