import { Router } from "https://deno.land/x//oak@v16.1.0/mod.ts";
import connection from "../db/db.ts";
import { createFeature } from "../geoUtils/pointUtils.ts";


const router = new Router();
router
  .get("/", async (context) => {
    try {
      const sql = "SELECT * FROM coordinates order by id asc;"

      const checkCache = await connection.queryObject(
        "SELECT * FROM cache where key = 'get all coordinates'"
      )
      const cacheObject = checkCache.rows[0] as CacheRow

      if (cacheObject === undefined) {
        const result = await connection.queryObject(
          sql,
        );
        const coordinateObjects = result.rows as CoordinateObject[]
        const geoFeatures = createFeature(coordinateObjects)
        context.response.headers.append('Access-Control-Allow-Origin', '*')
        context.response.body = geoFeatures;
        await connection.queryObject(
          `insert into "cache" ("key", value, inserted_at) 
          values('get all coordinates', '${JSON.stringify(geoFeatures)}', current_timestamp)`,
        );
      }
      else {
        console.log('checking cache')
        context.response.headers.append('Access-Control-Allow-Origin', '*')
        context.response.body = cacheObject.value;
      }
    } catch (err) {
        console.log(err) 
    } finally {
      connection.release();
    }
  });


  export default router