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

const deactivateUser: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedUser = await User.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        isActive: false,
      }
    );
    res.status(200).json({ message: "User account deactivated" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const activateUser: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const users = await User.findOneAndUpdate(
      { _id: userId },
      {
        isActive: true,
      }
    );
    res.status(200).json({ message: "User account activated" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export default { getUsers, deactivateUser, activateUser };
