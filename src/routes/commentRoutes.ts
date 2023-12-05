import { Router } from "express";
import commentController from "../controllers/commentController";

const router = Router();

router.post("/comment/:blogId", commentController.addCommentToBlog);
router.get("/comment/:blogId", commentController.getBlogComments);

export default router;
