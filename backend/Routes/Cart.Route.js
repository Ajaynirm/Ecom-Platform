import { Router } from "express";
import {
  getUserCart,
  updateUserCart,
  deleteAllCartItems,
  RemoveItemInCart
} from "../Controller/Cart.controller.js";
import { protectRoute } from "../middleware/Auth.Middleware.js";

const router = Router();

//           /api/cart
router.get("/get-cart", protectRoute, getUserCart);
router.patch("/update-cart", protectRoute, updateUserCart);
router.delete("/delete-cart", protectRoute, deleteAllCartItems);
router.delete("/delete-one-product",protectRoute,RemoveItemInCart);

export default router;
