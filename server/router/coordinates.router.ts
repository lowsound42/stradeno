import { Router } from "https://deno.land/x//oak@v16.1.0/mod.ts";
import connection from "../db/db.ts";

const router = new Router();
router
  .get("/", async (context) => {
    try {
      const result = await connection.queryArray(
        "SELECT * FROM coordinates LIMIT 10;",
      );
      console.log(result.rows); // [[1, 'Carlos'], [2, 'John'], ...]
    } finally {
      connection.release();
    }

    context.response.body = "Hello world!";
  });


  export default router