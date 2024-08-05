import connection from "../db/db.ts";

export const expireCache = async () => {
    console.log('running expire')
    try {
        await connection.queryArray(
          "CALL expire_rows('1 hour');",
        );
      } catch (err) {
          console.log(err) 
      } finally {
        connection.release();
      }
}

export const deleteLogs = async () => {
    try {
        await connection.queryArray(
          "TRUNCATE TABLE logs;",
        );
      } catch (err) {
          console.log(err) 
      } finally {
        connection.release();
      }
}