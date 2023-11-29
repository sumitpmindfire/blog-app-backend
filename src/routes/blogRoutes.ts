import { Router } from "express";
import authenticateToken from "../middlewares/authenticateUser";

const router = Router();

router.get("/blogs", authenticateToken, (req, res) => {
  // TODO add api
  console.log("user authenticated");
  res.sendStatus(200);
});

export default router;
