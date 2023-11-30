import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User";
import { jwtExpiration } from "../configuration";

const createToken = (userData: any) => {
  return jwt.sign(
    { id: userData._id, role: userData.role },
    process.env.JWT_SECRET as string,
    {
      expiresIn: jwtExpiration,
    }
  );
};

const signupPost: RequestHandler = async (req, res) => {
  try {
    if (req.body) {
      const { username, password } = req.body;
      const user = await User.create({ username, password });

      res.status(201).json({ message: "signup successful" });
    }
  } catch (error: any) {
    const errors: { [key: string]: string } = {};

    if (error.code === 11000) {
      errors["email"] = "Username already exists";
    }
    if (error.errors) {
      Object.values(error.errors).forEach((errorObj: any) => {
        errors[errorObj.properties.path] = errorObj.properties.message;
      });
    }
    res.status(400).json({ message: error.message, errors });
  }
};

const loginPost: RequestHandler = async (req, res) => {
  try {
    if (req.body) {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
          const token = createToken(user);
          res.status(200).json({
            accessToken: token,
            username: user.username,
            role: user.role,
          });
        } else {
          res.status(401).json({ message: "Username or password incorrect" });
        }
      }
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export default { signupPost, loginPost };
