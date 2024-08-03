import { Pool } from "https://deno.land/x/postgres@v0.19.3/mod.ts";
import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import "jsr:@std/dotenv/load";
// Get the connection string from the environment variable "DATABASE_URL"
const databaseUrl = Deno.env.get("DATABASE_URL")

// Create a database pool with three connections that are lazily established
const pool = new Pool(databaseUrl, 3, true);

// Connect to the database
const connection = await pool.connect();

const books = new Map<string, any>();
books.set("1", {
  id: "1",
  title: "The Hound of the Baskervilles",
  author: "Conan Doyle, Arthur",
});

const router = new Router();
router
  .get("/", async (context) => {
    try {
  const result = await connection.queryArray("SELECT * FROM coordinates LIMIT 10;");
  console.log(result.rows); // [[1, 'Carlos'], [2, 'John'], ...]
} finally {
  // Release the connection back into the pool
  connection.release();
}

    context.response.body = "Hello world!";
  })
  .get("/book", (context) => {
    context.response.body = Array.from(books.values());
  })
  .get("/book/:id", (context) => {
    if (books.has(context?.params?.id)) {
      context.response.body = books.get(context.params.id);
    }
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });