import * as handlers from "@/routes/tasks/handlers";
import * as routes from "@/routes/tasks/routes";

import { createRouter } from "@/lib/create-app";

export const tasks = createRouter()
  .openapi(routes.getAll, handlers.getAll)
  .openapi(routes.create, handlers.create)
  .openapi(routes.getOne, handlers.getOne)
  .openapi(routes.patch, handlers.patch)
  .openapi(routes.remove, handlers.remove);
