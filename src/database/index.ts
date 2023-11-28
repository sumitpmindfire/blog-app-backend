import { MongoClient } from "mongodb";

const dbUri = process.env.MONGODB_URI as string;
const dbClient = new MongoClient(dbUri);

const connectToDatabase = async () => {
  try {
    await dbClient.connect();
    await dbClient.db("users");
  } catch (error) {
    console.error(error);
  } finally {
    await dbClient.close();
  }
};

export default connectToDatabase;
