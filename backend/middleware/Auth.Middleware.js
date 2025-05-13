import jwt from "jsonwebtoken";
import pool from "../config/db.js";
import dotenv from "dotenv"

dotenv.config()

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided" });
    }
    const secret=process.env.JWT_SECRET_KEY;
    const decoded = jwt.verify(token, secret);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    // Query user
    const [rows] = await pool.query(
      "SELECT id, first_name, email FROM Customers WHERE id = ?",
      [decoded.userId]
    );

    const user = rows[0];

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
