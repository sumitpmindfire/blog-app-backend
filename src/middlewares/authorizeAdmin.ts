import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

const authorizeAdmin: RequestHandler = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user: any) => {
    if (err || user?.role !== "ADMIN") return res.sendStatus(403);
    console.log("verified");
    next();
  });
};

export default authorizeAdmin;
