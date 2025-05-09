import { Router} from "express";
import { checkAuth, login, logout, signup} from "../Controller/Auth.Controller.js";
import { protectRoute } from "../middleware/Auth.Middleware.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout",protectRoute, logout);


router.get("/check", protectRoute, checkAuth);

export default router;

