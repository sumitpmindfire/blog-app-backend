import { RequestHandler } from "express";
import User from "../models/User";

const getUsers: RequestHandler = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export default { getUsers };
