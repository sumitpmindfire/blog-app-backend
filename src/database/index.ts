import mongoose from "mongoose";

const dbUri = process.env.MONGODB_URI as string;

const connectToDatabase = async () => {
  try {
    mongoose.connection.on("open", () => {
      console.log("Connected to DB");
    });
    mongoose.connection.on("error", (error) => {
      console.error(error);
    });
    await mongoose.connect(dbUri, {
      dbName: "blog-cms",
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default connectToDatabase;
