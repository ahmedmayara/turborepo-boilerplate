import { pinoLogger as logger } from "hono-pino";
import { createMiddleware } from "hono/factory";
import { pino } from "pino";
import pretty from "pino-pretty";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";

import { env } from "@/config/env";
import { validateSession } from "@/lib/auth";

export const pinoLogger = () => {
  return logger({
    pino: pino(
      {
        level: env.NODE_ENV === "test" ? "silent" : env.LOG_LEVEL || "info",
      },
      env.NODE_ENV === "production" ? undefined : pretty(),
    ),
    http: {
      reqId: () => crypto.randomUUID(),
    },
  });
};

export const auth = createMiddleware(async (c, next) => {
  const token = c.req.header("Authorization");

  if (!token) {
    return c.json(
      {
        message: HttpStatusPhrases.UNAUTHORIZED,
      },
      HttpStatusCodes.UNAUTHORIZED,
    );
  }

  try {
    const result = await validateSession(token);

    if (!result.session || !result.user) {
      return c.json(
        {
          message: HttpStatusPhrases.UNAUTHORIZED,
        },
        HttpStatusCodes.UNAUTHORIZED,
      );
    }

    await next();
  } catch (error) {
    return c.json(
      {
        message: HttpStatusPhrases.UNAUTHORIZED,
      },
      HttpStatusCodes.UNAUTHORIZED,
    );
  }
});
