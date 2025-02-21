import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(8),
});

export const SignUpSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().min(1),
  password: z.string().min(8),
});
