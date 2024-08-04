import { Application, Router } from "https://deno.land/x//oak@v16.1.0/mod.ts";
import "jsr:@std/dotenv/load";
import coordinatesRouter from "./router/coordinates.router.ts";

const app = new Application();
app.use(coordinatesRouter.routes());
app.use(coordinatesRouter.allowedMethods());

await app.listen({ port: 8000 });
