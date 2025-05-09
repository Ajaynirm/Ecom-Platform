import { generateToken } from "../lib/util.js";
import pool from "../config/db.js";
import bcrypt from "bcryptjs";


export const signup = async (req, res)  => {
  const { first_name,last_name , email, password } = req.body;

  try {
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
       return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // Check if user exists
    const [existingUser] = await pool.promise().query('SELECT * FROM Customers WHERE email = ?', [email]);

    if (existingUser.length > 0) {
       return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new user
    const [result] = await pool.promise().query(
      'INSERT INTO Customers (first_name, last_name, email, password_hash) VALUES (?,?, ?, ?)',
      [first_name, last_name, email, hashedPassword]
    );

    const newUserId = result.insertId;

    // Generate JWT
    generateToken(newUserId, res);

    return res.status(201).json({
      _id: newUserId,
      first_name,
      last_name,
      email,
    });

  } catch (error) {
    console.error("Error in signup controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Get user by email
    const [rows] = await pool.promise().query('SELECT * FROM Customers WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = rows[0];

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    generateToken(user.id, res); // assuming your MySQL table's primary key is `id`

    res.status(200).json({
      _id: user.id,
      first_name: user.first_name,
      email: user.email,
      profilePic: user.profilePic || null, // optional, depends on your schema
    });

  } catch (error) {
    console.error("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 }); // Clear the cookie
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const checkAuth = async (req,res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



