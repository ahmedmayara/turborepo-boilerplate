import { index } from "@/routes";
import { auth } from "@/routes/auth";
import { tasks } from "@/routes/tasks";
import { cors } from "hono/cors";

import { env } from "@/config/env";
import { configureOpenAPI } from "@/lib/configure-open-api";
import { createApp } from "@/lib/create-app";

export const app = createApp();

const routes = [index, auth, tasks] as const;

configureOpenAPI(app);

app.use(
  "*",
  cors({
    origin: env.WEB_URL,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  }),
);

routes.forEach((route) => {
  app.route("/", route);
});
