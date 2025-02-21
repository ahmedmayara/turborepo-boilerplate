import * as handlers from "@/routes/auth/handlers";
import * as routes from "@/routes/auth/routes";

import { createRouter } from "@/lib/create-app";

export const auth = createRouter()
  .openapi(routes.signIn, handlers.signIn)
  .openapi(routes.signUp, handlers.signUp)
  .openapi(routes.signOut, handlers.signOut);
