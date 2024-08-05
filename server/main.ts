import { Application } from "https://deno.land/x/oak@v16.1.0/mod.ts";
import "jsr:@std/dotenv/load";
import coordinatesRouter from "./router/coordinates.router.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import { expireCache } from "./db/cron.ts";

const app = new Application();
Deno.cron('delete logs', '0 * * * *', expireCache)
app.use(coordinatesRouter.routes());
app.use(coordinatesRouter.allowedMethods());
app.use(
    oakCors({
      origin: /^.+localhost:(1234|5173)$/,
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    }),
  );await app.listen({ port: 8000 });
