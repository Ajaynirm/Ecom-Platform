import pool from "../config/db.js";

//get
export const getUserCart = async (req, res) => {
  const { customer_id} = req.query;

  try {

    const [rows] = await pool.query(`
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
    `, [customer_id]);
    res.status(200).json(rows);

  } catch (error) {
    console.error("Error fetching user cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


//post
export const updateUserCart=  async (req, res) => {
    const { customer_id, product_id, quantity } = req.body;
  
    // Check if the item exists
    const [existing]  = await pool.query(
      `SELECT * FROM Cart_Items WHERE customer_id = ? AND product_id = ?`,
      [customer_id, product_id]
    );
  
    if (existing.length > 0) {
      // Update quantity
      await pool.query(
        `UPDATE Cart_Items SET quantity = quantity + ? WHERE customer_id = ? AND product_id = ?`,
        [quantity, customer_id, product_id]
      );
    } else {
      // Insert new
      await pool.query(
        `INSERT INTO Cart_Items (customer_id, product_id, quantity) VALUES (?, ?, ?)`,
        [customer_id, product_id, quantity]
      );
    }
  
    res.json({ success: true });
}

//patch
export const modifyQuantityInCart = async (req, res) => {
    const { customer_id, product_id, quantity } = req.body;
  
    await pool.query(
      `UPDATE Cart_Items SET quantity = ? WHERE customer_id = ? AND product_id = ?`,
      [quantity, customer_id, product_id]
    );
  
    res.json({ success: true });
  }
// delete
 export const RemoveItemInCart =async (req, res) => {
    const { customer_id, product_id } = req.body;
  
    await pool.query(
      `DELETE FROM Cart_Items WHERE customer_id = ? AND product_id = ?`,
      [customer_id, product_id]
    );
  
    res.json({ success: true });
  }