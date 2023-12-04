import { RequestHandler } from "express";
import Blog from "../models/Blog";

/**
 * Get all blogs
 * @param req
 * @param res
 */
const getBlogs: RequestHandler = async (req, res) => {
  try {
    const category = req.query?.category;
    const blogs = await Blog.find({ ...(category && { category }) });
    res.status(200).json({ blogs });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

/**
 * Get blog details by blog id
 * @param req
 * @param res
 */
const getBlogDetails: RequestHandler = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const blogDetails = await Blog.findOne({ _id: blogId });
    res.status(200).json({ blogDetails });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

/**
 * Delete a blog
 * @param req
 * @param res
 */
const deleteBlogPost: RequestHandler = async (req, res) => {
  try {
    await Blog.findOneAndDelete({ _id: req.params.blogId });
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Create a new blog
 * @param req
 * @param res
 */
const createBlogPost: RequestHandler = async (req, res) => {
  try {
    if (req.body) {
      const { title, content, category, user } = req.body;
      await Blog.create({
        title,
        content,
        category,
        createdBy: { userId: user.id, username: user.username },
      });
      res.status(201).json({ message: "Blog created successfully" });
    }
  } catch (error: any) {
    const errors: { [key: string]: string } = {};

    if (error.code === 11000) {
      errors["title"] = "Title already exists";
    }
    if (error.errors) {
      Object.values(error.errors).forEach((errorObj: any) => {
        errors[errorObj.properties.path] = errorObj.properties.message;
      });
    }
    res.status(400).json({ message: error.message, errors });
  }
};

export default { createBlogPost, getBlogs, deleteBlogPost, getBlogDetails };
