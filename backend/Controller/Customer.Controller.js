import pool from "../config/db.js";

export const viewCustomer = async (req, res) => {
  let { page, limit } = req.query;

  page = parseInt(page) || 1; // Default page 1
  limit = parseInt(limit) || 10; // Default 10 per page
  const offset = (page - 1) * limit;

  try {
    // Get total count
    const [countResult] = await pool.query(
      "SELECT COUNT(*) AS total FROM Customers"
    );
    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);
    // Get paginated customers
    const [customers] = await pool.query(
      `SELECT id, email, first_name, last_name, created_at, updated_at
         FROM Customers
         ORDER BY created_at DESC
         LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    return res.status(200).json({
      success: true,
      page,
      totalPages,
      totalCustomers: total,
      customers,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const listAllCustomer = async (req, res) => {};
