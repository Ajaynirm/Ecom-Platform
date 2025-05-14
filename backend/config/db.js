import { createPool } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DATABASE,
  multipleStatements: true,
});

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to MySQL database!");
    connection.release();

    const schema = `
        CREATE DATABASE IF NOT EXISTS Ecommerce_database;

        USE Ecommerce_database;
        
        CREATE TABLE IF NOT EXISTS Customers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        role ENUM('customer', 'admin') NOT NULL DEFAULT 'customer',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS Products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        stock_quantity INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS Orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        customer_id INT NOT NULL,
        order_status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
        total_price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (customer_id) REFERENCES Customers(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS Order_Products (
        order_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL,
        unit_price DECIMAL(10, 2) NOT NULL,
        PRIMARY KEY (order_id, product_id),
        FOREIGN KEY (order_id) REFERENCES Orders(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES Products(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS Cart_Items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        customer_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (customer_id) REFERENCES Customers(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES Products(id) ON DELETE CASCADE,
        UNIQUE (customer_id, product_id)
      );`;
    await pool.query(schema);
    console.log("Database schema created successfully.");
  } catch (err) {
    console.error("Error connecting to MySQL:", err);
  }
})();

export default pool;
