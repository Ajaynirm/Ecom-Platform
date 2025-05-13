import { Router } from "express";
import {
  placeOrder,
  viewOrder,
  groupOrder,
  filterOrder,
  deleteOrder,
  listAllOrder,
  getOrders,
} from "../Controller/Order.Controller.js";
import { protectRoute } from "../middleware/Auth.Middleware.js";
import { protectadminRoute } from "../middleware/Admin.Auth.middleware.js";

const router = Router();

router.post("/place-order", protectRoute, placeOrder);
router.get("/order-detail", protectRoute, viewOrder);
router.delete("/delete-order", protectRoute, deleteOrder);

router.get("/group-order", protectadminRoute, groupOrder);
router.get("/filter-order", protectadminRoute, filterOrder);

router.get("/list-order",protectadminRoute, listAllOrder);
router.get("/get-order",protectRoute, getOrders);

export default router;
