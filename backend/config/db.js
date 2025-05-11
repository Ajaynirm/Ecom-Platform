import { createPool } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config()

const pool = createPool({
  host: process.env.DB_HOST, 
  port: process.env.DB_PORT,
  user: process.env.DB_USER, 
  password: process.env.DB_PWD, 
  database: process.env.DATABASE, 
});


(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to MySQL database!");
    connection.release(); // Release the connection back to the pool
  } catch (err) {
    console.error("Error connecting to MySQL:", err);
  }
})();

export default pool;


