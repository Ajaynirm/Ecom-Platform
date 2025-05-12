import { Router} from "express";
import { getUserCart,updateUserCart } from "../Controller/Cart.controller.js";
const router = Router();

//           /api/cart
router.get('/:customerId',getUserCart);
router.post('/update/:customerId',updateUserCart);

export default router;

 

