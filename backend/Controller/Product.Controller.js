import pool from "../config/db.js";

export const createProduct = async (req, res) => {
  const { name, description, price, stock_quantity } = req.body;

  try {
    if (!name || !description || !price || !stock_quantity) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const intPrice = parseFloat(price);
    const intStock = parseInt(stock_quantity);

    const [result] = await pool.query(
      `INSERT INTO Products (name, description, price, stock_quantity)
       VALUES (?, ?, ?, ?)`,
      [name, description, intPrice, intStock]
    );

    return res.status(201).json({
      success: true,
      product: {
        id: result.insertId,
        name,
        description,
        price: intPrice,
        stock_quantity: intStock,
      },
    });
  } catch (e) {
    console.error("Error in createProduct:", e.message);
    return res.status(500).json({ message: "Error in Product Controller" });
  }
};

//PUT /api/products/:id
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock_quantity } = req.body;

  try {
    if (!name || !description || !price || !stock_quantity) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const intPrice = parseFloat(price);
    const intStock = parseInt(stock_quantity);

    const [result] = await pool.query(
      `UPDATE Products SET name = ?, description = ?, price = ?, stock_quantity = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [name, description, intPrice, intStock, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      updatedProduct: {
        id,
        name,
        description,
        price: intPrice,
        stock_quantity: intStock,
      },
    });
  } catch (e) {
    console.error("Error in updateProduct:", e.message);
    return res.status(500).json({ message: "Error updating product" });
  }
};

//DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(`DELETE FROM Products WHERE id = ?`, [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (e) {
    console.error("Error in deleteProduct:", e.message);
    return res.status(500).json({ message: "Error deleting product" });
  }
};

//GET /api/products/:id
export const getOneProductDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query(
      `SELECT id, name, description, price, stock_quantity, created_at, updated_at FROM Products WHERE id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ success: true, product: rows[0] });
  } catch (e) {
    console.error("Error in getOneProductDetails:", e.message);
    return res.status(500).json({ message: "Error fetching product details" });
  }
};
// GET /api/products/search
export const searchProduct = async (req, res) => {
  const { searchWord } = req.query;
  let { page = 1, limit = 10 } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  const offset = (page - 1) * limit;
  try {
    const query = `
    SELECT id, name, description, price, stock_quantity, created_at, updated_at
    FROM Products
    WHERE name LIKE ? 
    LIMIT ? OFFSET ?
  `;
    const searchPattern = `%${searchWord || ""}%`;

    const [products] = await pool.query(query, [searchPattern, limit, offset]);

    // Count query with same filter
    const countQuery = `
    SELECT COUNT(*) as total
    FROM Products
    WHERE name LIKE ?
  `;

    const [countResult] = await pool.query(countQuery, [searchPattern]);
    const total = countResult[0]?.total || 0;
    const totalPages = Math.ceil(total / limit);

    return res.status(200).json({
      success: true,
      page,
      limit,
      totalProducts: total,
      totalPages,
      products,
    });
  } catch (e) {
    console.error("Error in Search product  controller:  ", e.message);
    return res.status(500).json({ message: "Error fetching products" });
  }
};

//GET /api/products?page=1&limit=10
//GET /api/products?name=mouse&minPrice=100&maxPrice=300
//GET /api/products?groupBy=stock_quantity
export const listAllProduct = async (req, res) => {
  try {
    let { page, limit } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    console.log(page, limit);
    const offset = (page - 1) * limit;

    // --- Base query ---
    let query = `SELECT id, name, description, price, stock_quantity, created_at, updated_at FROM Products LIMIT ? OFFSET ?`;
    const [products] = await pool.query(query, [limit, offset]);

    // Get total count for pagination
    let countQuery = `SELECT COUNT(*) as total FROM Products`;

    const [countResult] = await pool.query(countQuery);
    const total = countResult[0]?.total || 0;
    const totalPages = Math.ceil(total / limit);

    return res.status(200).json({
      success: true,
      page,
      limit,
      totalProducts: total,
      totalPages,
      products,
    });
  } catch (e) {
    console.error("Error in listAllProduct:", e.message);
    return res.status(500).json({ message: "Error fetching products" });
  }
};
