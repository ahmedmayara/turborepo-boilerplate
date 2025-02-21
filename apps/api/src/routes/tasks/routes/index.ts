import { AuthorizationHeaderSchema, NotFoundSchema } from "@/constants";
import { auth } from "@/middlewares";
import {
  CreateTaskSchema,
  PatchTaskSchema,
  TaskSchema,
} from "@/routes/tasks/schemas";
import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema } from "stoker/openapi/schemas";

const TAGS = ["Tasks"];

export const getAll = createRoute({
  method: "get",
  path: "/tasks",
  middleware: [auth] as const,
  request: {
    headers: AuthorizationHeaderSchema,
  },
  tags: TAGS,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.array(TaskSchema), "List of tasks"),
  },
});

export const create = createRoute({
  method: "post",
  path: "/tasks",
  tags: TAGS,
  request: {
    body: jsonContentRequired(CreateTaskSchema, "Task to create"),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(TaskSchema, "Created task"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(CreateTaskSchema),
      "Validation error",
    ),
  },
});

export const getOne = createRoute({
  method: "get",
  path: "/tasks/{id}",
  tags: TAGS,
  request: {
    params: z.object({ id: z.string() }),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(TaskSchema, "The requested task"),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(NotFoundSchema, "Task not found"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(z.object({ id: z.string() })),
      "ID validation error",
    ),
  },
});

export const patch = createRoute({
  method: "patch",
  path: "/tasks/{id}",
  tags: TAGS,
  request: {
    params: z.object({ id: z.string() }),
    body: jsonContentRequired(PatchTaskSchema, "Task to update"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(TaskSchema, "Updated task"),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(NotFoundSchema, "Task not found"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(PatchTaskSchema),
      "Validation error",
    ),
  },
});

export const remove = createRoute({
  method: "delete",
  path: "/tasks/{id}",
  tags: TAGS,
  request: {
    params: z.object({ id: z.string() }),
  },
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: "Task deleted",
    },
    [HttpStatusCodes.NOT_FOUND]: jsonContent(NotFoundSchema, "Task not found"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(z.object({ id: z.string() })),
      "ID validation error",
    ),
  },
});

export type GetAllRoute = typeof getAll;
export type CreateRoute = typeof create;
export type GetOneRoute = typeof getOne;
export type PatchRoute = typeof patch;
export type RemoveRoute = typeof remove;
