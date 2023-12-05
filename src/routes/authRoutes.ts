import { Router } from "express";
import authController from "../controllers/authController";

const router = Router();

router.post("/signup", authController.signupPost);
router.post("/login", authController.loginPost);

export default router;
