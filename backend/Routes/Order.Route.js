import {Router} from "express"
import { placeOrder, viewOrder, groupOrder, 
         filterOrder, deleteOrder,listAllOrder } from "../Controller/Order.Controller.js"
const router = Router();

router.post("/place-order", placeOrder);
router.get("/order-detail",viewOrder);
router.get("/group-order",groupOrder);
router.get("/filter-order",filterOrder);
router.delete("/delete-order",deleteOrder);
router.get("/list-order",listAllOrder);

export default router;
