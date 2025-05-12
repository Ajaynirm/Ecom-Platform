import { Router} from "express";
import { getUserCart,updateUserCart } from "../Controller/Cart.controller.js";
const router = Router();

//           /api/cart
router.get('/get-cart',getUserCart);
router.post('/update-cart',updateUserCart);

export default router;

 

