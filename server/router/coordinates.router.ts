import { Router } from "https://deno.land/x//oak@v16.1.0/mod.ts";
import connection from "../db/db.ts";
import { createFeature } from "../geoUtils/pointUtils.ts";

const router = new Router();
router
  .get("/", async (context) => {
    try {
      const result = await connection.queryObject(
        "SELECT * FROM coordinates order by id asc;",
      );
      const coordinateObjects = result.rows as CoordinateObject[]
      const geoFeatures = createFeature(coordinateObjects)
      context.response.headers.append('Access-Control-Allow-Origin', '*')
      context.response.body = geoFeatures;
    } catch (err) {
        console.log(err) 
    } finally {
      connection.release();
    }
  });


  export default router