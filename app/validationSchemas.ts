import { z } from "zod";

export const jobSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required"),
});

export const retryJobSchema = z.object({
  status: z.string().min(1),
});
