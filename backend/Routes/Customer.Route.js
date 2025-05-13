import { Router } from "express";
import { viewCustomer } from "../Controller/Customer.Controller.js";
import { protectadminRoute } from "../middleware/Admin.Auth.middleware.js";
const router = Router();

router.get("/getCustomer", protectadminRoute, viewCustomer);

export default router;



