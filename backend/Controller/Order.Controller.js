import pool from "../config/db.js";

//post /place-order
export const placeOrder = async (req, res) => {
  const { customer_id, total_price, products } = req.body;

  if (!customer_id || !total_price || !products || !Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ message: "Invalid order data" });
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // 1. Insert into Orders
    const [orderResult] = await connection.query(
      `INSERT INTO Orders (customer_id, total_price) VALUES (?, ?)`,
      [customer_id, total_price]
    );
    const order_id = orderResult.insertId;

    // 2. Insert into Order_Products
    const orderProductsQuery = `
      INSERT INTO Order_Products (order_id, product_id, quantity, unit_price)
      VALUES (?, ?, ?, ?)`;

    for (const item of products) {
      const { product_id, quantity, unit_price } = item;
      if (!product_id || !quantity || !unit_price) {
        throw new Error("Invalid product entry in order");
      }

      await connection.query(orderProductsQuery, [order_id, product_id, quantity, unit_price]);
    }

    await connection.commit();
    res.status(201).json({ success: true, message: "Order placed", order_id });

  } catch (err) {
    await connection.rollback();
    console.error("Error placing order:", err.message);
    res.status(500).json({ message: "Failed to place order" });
  } finally {
    connection.release();
  }
};

//get /order-detail
export const viewOrder = async(req,res) =>{

        const { order_id } = req.query;
      
        try {
          const [orderRows] = await pool.query(
            `SELECT * FROM Orders WHERE id = ?`,
            [order_id]
          );
      
          if (orderRows.length === 0) {
            return res.status(404).json({ message: "Order not found" });
          }
      
          const [productRows] = await pool.query(
            `SELECT p.id, p.name, op.quantity, op.unit_price
             FROM Order_Products op
             JOIN Products p ON op.product_id = p.id
             WHERE op.order_id = ?`,
            [order_id]
          );
      
          return res.status(200).json({
            order: orderRows[0],
            products: productRows
          });
      
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }      
}

export const groupOrder = async (req, res) => {
  const { by = 'order_status' } = req.query;

  // Whitelist allowed fields for grouping
  const allowedFields = ['order_status', 'customer_id'];
  if (!allowedFields.includes(by)) {
    return res.status(400).json({ message: `Invalid group field: ${by}` });
  }

  try {
    const [grouped] = await pool.query(
      `SELECT ${by}, COUNT(*) as total_orders, SUM(total_price) as total_value 
       FROM Orders 
       GROUP BY ${by}`
    );

    res.status(200).json({ groupedBy: by, data: grouped });
  } catch (err) {
    res.status(500).json({ message: "Error grouping orders", error: err.message });
  }
};

export const filterOrder = async (req, res) => {
  const { customer_id, status, start_date, end_date } = req.query;

  let conditions = [];
  let values = [];

  if (customer_id) {
    conditions.push("customer_id = ?");
    values.push(customer_id);
  }

  if (status) {
    conditions.push("order_status = ?");
    values.push(status);
  }

  if (start_date) {
    conditions.push("created_at >= ?");
    values.push(start_date);
  }

  if (end_date) {
    conditions.push("created_at <= ?");
    values.push(end_date);
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

  try {
    const [orders] = await pool.query(
      `SELECT * FROM Orders ${whereClause} ORDER BY created_at DESC`,
      values
    );
    res.status(200).json({ filtered: true, count: orders.length, orders });
  } catch (err) {
    res.status(500).json({ message: "Error filtering orders", error: err.message });
  }
};


export const deleteOrder = async (req, res) => {
  const { id } = req.query;

  try {
    const [result] = await pool.query(`DELETE FROM Orders WHERE id = ?`, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ success: true, message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting order", error: err.message });
  }
};

export const listAllOrder = async (req, res) => {
  let { page = 1, limit = 10 } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);
  const offset = (page - 1) * limit;

  try {
    const [orders] = await pool.query(
      `SELECT * FROM Orders ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    const [countResult] = await pool.query(`SELECT COUNT(*) AS total FROM Orders`);
    const total = countResult[0].total;

    res.status(200).json({
      success: true,
      page,
      limit,
      totalOrders: total,
      totalPages: Math.ceil(total / limit),
      orders,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders", error: err.message });
  }
};

