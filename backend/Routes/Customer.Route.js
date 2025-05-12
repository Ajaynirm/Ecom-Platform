import { Router } from "express";
import { viewCustomer } from "../Controller/Customer.Controller.js";

const router = Router();

router.get("/getCustomer", viewCustomer);

export default router;
