import { Router } from "express";
import {
  getUserCart,
  updateUserCart,
  deleteAllCartItems,
} from "../Controller/Cart.controller.js";
const router = Router();

//           /api/cart
router.get("/get-cart", getUserCart);
router.post("/update-cart", updateUserCart);
router.delete("/delete-cart", deleteAllCartItems);

export default router;
