import type { AppOpenAPI } from "@/types";
import { apiReference } from "@scalar/hono-api-reference";

import packageJSON from "../../package.json" with { type: "json" };

export function configureOpenAPI(app: AppOpenAPI) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: packageJSON.version,
      title: "API Reference",
    },
  });

  app.get(
    "/reference",
    apiReference({
      theme: "bluePlanet",
      layout: "classic",
      defaultHttpClient: {
        targetKey: "javascript",
        clientKey: "fetch",
      },
      spec: {
        url: "/doc",
      },
    }),
  );
}
