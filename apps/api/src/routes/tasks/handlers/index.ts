import type {
  CreateRoute,
  GetAllRoute,
  GetOneRoute,
  PatchRoute,
  RemoveRoute,
} from "@/routes/tasks/routes";
import type { AppRouteHandler } from "@/types";
import { db } from "@repo/database/client";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";

export const getAll: AppRouteHandler<GetAllRoute> = async (c) => {
  const tasks = await db.task.findMany();
  return c.json(tasks, HttpStatusCodes.OK);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const { title, description } = c.req.valid("json");

  const task = await db.task.create({
    data: {
      title,
      description,
    },
  });

  return c.json(task, HttpStatusCodes.CREATED);
};

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid("param");

  const task = await db.task.findUnique({
    where: { id },
  });

  if (!task) {
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND,
    );
  }

  return c.json(task, HttpStatusCodes.OK);
};

export const patch: AppRouteHandler<PatchRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const { title, description, done } = c.req.valid("json");

  const task = await db.task.findUnique({
    where: { id },
  });

  if (!task) {
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND,
    );
  }

  const updatedTask = await db.task.update({
    where: { id },
    data: {
      title,
      description,
      done,
    },
  });

  return c.json(updatedTask, HttpStatusCodes.OK);
};

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const { id } = c.req.valid("param");

  const task = await db.task.findUnique({
    where: { id },
  });

  if (!task) {
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND,
    );
  }

  await db.task.delete({
    where: { id },
  });

  return c.body(null, HttpStatusCodes.NO_CONTENT);
};
