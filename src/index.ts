require("dotenv").config();
const cors = require("cors");
import authRoutes from "./routes/authRoutes";
import blogRoutes from "./routes/blogRoutes";
import userRoutes from "./routes/userRoutes";
import commentRoutes from "./routes/commentRoutes";
import express from "express";
import cookieParser from "cookie-parser";
import connectToDatabase from "./database";
import authenticateToken from "./middlewares/authenticateUser";
import authorizeAdmin from "./middlewares/authorizeAdmin";

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// DB CONNECTION AND SERVER START
async function initializeServer() {
  try {
    await connectToDatabase();
    app.listen(5000, () => {
      console.log("server listening on port 5000");
    });
  } catch (error) {
    console.error(error);
  }
}
initializeServer();

// ROUTES
app.use(authRoutes);
app.use(authenticateToken); // Authentication middleware
app.use(blogRoutes);
app.use(commentRoutes);
// ADMIN ROUTES
app.use(authorizeAdmin);
app.use(userRoutes);

app.all("*", (req, res) => {
  res.status(404).json({ message: "404 not found" });
});
