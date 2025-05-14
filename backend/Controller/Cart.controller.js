import pool from "../config/db.js";

//get
export const getUserCart = async (req, res) => {
  const { customer_id } = req.query;

  try {
    const [rows] = await pool.query(
      `
      SELECT 
        ci.id, 
        ci.quantity, 
        p.id as product_id, 
        p.name, 
        p.description, 
        p.price, 
        p.stock_quantity
      FROM Cart_Items ci
      JOIN Products p ON ci.product_id = p.id
      WHERE ci.customer_id = ?
    `,
      [customer_id]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching user cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//put
export const updateUserCart = async (req, res) => {
  
  try {
    const { customer_id, product_id, quantity } = req.body;

    // Validate inputs
    if (!customer_id || !product_id || quantity == null) {
      return res.status(400).json({ error: "Missing required query parameters." });
    }

    const parsedQuantity = parseInt(quantity, 10);
    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      return res.status(400).json({ error: "Quantity must be a positive number." });
    }

    // Check if item already exists in the cart
    const [existing] = await pool.query(
      `SELECT * FROM Cart_Items WHERE customer_id = ? AND product_id = ?`,
      [customer_id, product_id]
    );

    if (existing.length > 0) {
      // Update quantity
      await pool.query(
        `UPDATE Cart_Items SET quantity = quantity + ? WHERE customer_id = ? AND product_id = ?`,
        [parsedQuantity, customer_id, product_id]
      );
    } else {
      // Insert new cart item
      await pool.query(
        `INSERT INTO Cart_Items (customer_id, product_id, quantity) VALUES (?, ?, ?)`,
        [customer_id, product_id, parsedQuantity]
      );
    }

    res.status(200).json({ success: true, message: "Cart updated successfully." });
  } catch (err) {
    console.error("Error updating cart:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

//patch
export const modifyQuantityInCart = async (req, res) => {
  const { customer_id, product_id, quantity } = req.body;

  const [row] = await pool.query(
    `UPDATE Cart_Items SET quantity = ? WHERE customer_id = ? AND product_id = ?`,
    [quantity, customer_id, product_id]
  );

  console.log("modified cart quantity ",row);

  res.json({ success: true });
};



// delete
export const RemoveItemInCart = async (req, res) => {
  const { customer_id, product_id } = req.query;

  const [row] = await pool.query(
    `DELETE FROM Cart_Items WHERE customer_id = ? AND product_id = ?`,
    [customer_id, product_id]
  );
  console.log("deleted cart ",row);

  res.json({ success: true });
};

export const deleteAllCartItems = async (req, res) => {
  const { customer_id } = req.query;

  if (!customer_id) {
    return res.status(400).json({ message: "Customer ID is required" });
  }
let connection;
  try {
    // Start a transaction to ensure atomicity (either all or nothing)
     connection = await pool.getConnection();
    await connection.beginTransaction();

    // 1. Delete all cart items for the given customer
    await connection.query(
      `
        DELETE FROM Cart_Items
        WHERE customer_id = ?
      `,
      [customer_id]
    );

    // Commit the transaction
    await connection.commit();

    res.status(200).json({ message: "All cart items deleted successfully" });
  } catch (error) {
    console.error("Error deleting cart items:", error);
    await connection.rollback();
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    connection.release();
  }
};
