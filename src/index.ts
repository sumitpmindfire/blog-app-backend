require("dotenv").config();
import express from "express";
import connectToDatabase from "./database";

const app = express();
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send({
    message: "success",
  });
});

connectToDatabase();
app.listen(3000);
