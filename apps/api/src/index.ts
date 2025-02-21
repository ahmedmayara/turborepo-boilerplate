import { app } from "@/app";
import { serve } from "@hono/node-server";

import { env } from "@/config/env";

console.log(`Server is running on port http://localhost:${env.PORT}`);

serve({
  fetch: app.fetch,
  port: env.PORT,
});
