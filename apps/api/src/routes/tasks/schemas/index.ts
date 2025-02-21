import { z } from "zod";

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  done: z.boolean().default(false),
  description: z.string().nullable().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const CreateTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().nullable().optional(),
});

export const PatchTaskSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().nullable().optional(),
  done: z.boolean().optional(),
});
