import { createPool } from "mysql2/promise";


const pool = createPool({
  host: "127.0.0.1", // your MySQL host (e.g., 'localhost'),
  port: 3306,
  user: "root", // your MySQL username
  password: "12345678", // your MySQL password
  database: "Ecommerce_database", // your database name
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
