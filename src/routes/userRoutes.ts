import { Router } from "express";
import userController from "../controllers/userController";

const router = Router();

router.get("/users", userController.getUsers);
router.post("/users/:userId/activate", userController.activateUser);
router.post("/users/:userId/deactivate", userController.deactivateUser);

export default router;
