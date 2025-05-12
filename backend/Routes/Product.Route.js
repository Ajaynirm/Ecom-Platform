import { Router } from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getOneProductDetails,
  listAllProduct,
  searchProduct,
} from "../Controller/Product.Controller.js";
import { protectRoute } from "../middleware/Auth.Middleware.js";
const router = Router();

router.post("/create-product", createProduct);
//PUT /api/products/:id
router.put("/update/:id", updateProduct);
//DELETE /api/products/:id
router.delete("/delete/:id", deleteProduct);
//GET /api/products/:id
router.get("/detail/:id", getOneProductDetails);
//GET /api/products?page=1&limit=10
//GET /api/products?name=mouse&minPrice=100&maxPrice=300
//GET /api/products?groupBy=stock_quantity
router.get("/list-product", listAllProduct);

//GET /products/search
router.get("/search", searchProduct);

export default router;
