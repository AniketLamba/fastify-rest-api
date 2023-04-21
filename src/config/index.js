import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "127.0.0.1",
  database: "postgres",
  password: "testpassword",
  port: 5432,
});
pool.connect();
export { pool };
