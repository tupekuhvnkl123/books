import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

export const connectDB = async () => {
  try {
    if (!MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables.");
    }

    if (mongoose.connection.readyState >= 1) {
      console.log("MongoDB already connected.");
      return;
    }

    await mongoose.connect(MONGO_URI);
    console.log("Connected to Mongodb.");
  } catch (err) {
    console.log("Connection to Mongodb FAILED.", err);
    throw err;
  }
};
