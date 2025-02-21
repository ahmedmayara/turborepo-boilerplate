import { AuthorizationHeaderSchema } from "@/constants";
import { auth } from "@/middlewares";
import { SignInSchema, SignUpSchema } from "@/routes/auth/schemas";
import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import {
  createErrorSchema,
  createMessageObjectSchema,
} from "stoker/openapi/schemas";

const TAGS = ["Authentication"];

export const signIn = createRoute({
  method: "post",
  path: "/auth/sign-in",
  tags: TAGS,
  request: {
    body: jsonContentRequired(SignInSchema, "User credentials"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ token: z.string() }),
      "Access token",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(SignInSchema),
      "Validation error",
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      createMessageObjectSchema("Invalid credentials"),
      "Invalid credentials",
    ),
  },
});

export const signUp = createRoute({
  method: "post",
  path: "/auth/sign-up",
  tags: TAGS,
  request: {
    body: jsonContentRequired(SignUpSchema, "User credentials"),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      z.object({
        user: z.object({
          id: z.string(),
          name: z.string().nullable(),
          email: z.string().nullable(),
        }),
      }),
      "User created",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(SignUpSchema),
      "Validation error",
    ),
    [HttpStatusCodes.CONFLICT]: jsonContent(
      createMessageObjectSchema("User already exists"),
      "User already exists",
    ),
  },
});

export const signOut = createRoute({
  method: "post",
  path: "/auth/sign-out",
  request: {
    headers: AuthorizationHeaderSchema,
  },
  middlewares: auth,
  tags: TAGS,
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: "Signed out",
    },
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      createMessageObjectSchema("Unauthorized"),
      "Unauthorized",
    ),
  },
});

export type SignInRoute = typeof signIn;
export type SignUpRoute = typeof signUp;
export type SignOutRoute = typeof signOut;
