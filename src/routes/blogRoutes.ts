import { Router } from "express";
import blogController from "../controllers/blogController";

const router = Router();

router.get("/blogs", blogController.getBlogs);
router.post("/blogs", blogController.createBlogPost);
router.get("/blogs/:blogId", blogController.getBlogDetails);
router.post("/blog/:blogId/delete", blogController.deleteBlogPost);

export default router;
