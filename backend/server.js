import express, { json } from "express";
import dotenv from "dotenv";
import authRoutes from "./Routes/Auth.Route.js";
import productRoute from "./Routes/Product.Route.js";
import AdminRoute from "./Routes/Customer.Route.js";
import OrderRoute from "./Routes/Order.Route.js";
import CartRoute from "./Routes/Cart.Route.js";

import cors from "cors";
import connection from "./config/db.js";
import cookieParser from "cookie-parser";

dotenv.config();

const port = parseInt(process.env.PORT || "3000");

const app = express();

app.use(json());

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoute);
app.use("/api/admin", AdminRoute);
app.use("/api/order", OrderRoute);
app.use("/api/cart", CartRoute);

app.get("/", async (req, res) => {
  return res.send("Hi");
});

app.listen(port, () => console.log(`Server running on port ${port}`));
