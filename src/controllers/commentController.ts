import { RequestHandler } from "express";
import Comment from "../models/Comment";

const addCommentToBlog: RequestHandler = async (req, res) => {
  try {
    const { text, user } = req.body;
    const { blogId } = req.params;
    await Comment.create({
      text,
      blogId,
      createdBy: { userId: user.id, username: user.username },
    });
    res.status(201).json({ message: "Comment added successfully" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getBlogComments: RequestHandler = async (req, res) => {
  try {
    const { blogId } = req.params;
    const comments = await Comment.find({ blogId }).sort({ createdAt: "desc" });
    res.status(201).json({ comments });
  } catch (error) {
    res.json({ error });
  }
};

export default { addCommentToBlog, getBlogComments };
