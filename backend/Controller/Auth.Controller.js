import { generateToken } from "../lib/util.js";
import pool from "../config/db.js";
import bcrypt from "bcryptjs";


export const signup = async (req, res) => {
  const { first_name, last_name, email, password,role } = req.body;

  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  
  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters" });
  }

  try {
    // 1. Check if email already exists
    const [existingUser] = await pool.query(
      'SELECT id FROM Customers WHERE email = ?',
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // 2. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Insert new user
    let result;

    if(role==="admin"){
       const [res] = await pool.query(
        `INSERT INTO Customers (first_name, last_name, email, password_hash, created_at, updated_at,role)
         VALUES (?, ?, ?, ?, NOW(), NOW(), ?)`,
        [first_name, last_name, email, hashedPassword,role]
      );
      result=res;
    }else{
      [res] = await pool.query(
        `INSERT INTO Customers (first_name, last_name, email, password_hash, created_at, updated_at)
         VALUES (?, ?, ?, ?, NOW(), NOW())`,
        [first_name, last_name, email, hashedPassword]
      );
      result=res;
    }
    


    const userId = result.insertId;

    // 4. Generate JWT
    generateToken(userId, res);

    return res.status(201).json({
      id: userId,
      role: result.role,
      first_name,
      last_name,
      email,
    });

  } catch (err) {
    console.error("Signup error:", err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Get user by email
    const [rows] = await pool.query('SELECT * FROM Customers WHERE email = ?', [email]);

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
      id: user.id,
      role: user.role,
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



