import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

const authenticateToken: RequestHandler = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) return res.sendStatus(403);
    // req.user = user;
    next();
  });
};

export default authenticateToken;
