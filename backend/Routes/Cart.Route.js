import { Router } from "express";
import {
  getUserCart,
  updateUserCart,
  deleteAllCartItems,
} from "../Controller/Cart.controller.js";
import { protectRoute } from "../middleware/Auth.Middleware.js";

const router = Router();

//           /api/cart
router.get("/get-cart", protectRoute, getUserCart);
router.post("/update-cart", protectRoute, updateUserCart);
router.delete("/delete-cart", protectRoute, deleteAllCartItems);

export default router;
