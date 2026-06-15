import mongoose from "mongoose";
import { MONGO_URI } from "../utils/variables";

const URI = MONGO_URI as string;

if (!URI) {
  console.error("MONGO_URI environment variable is not defined");
}

// Connect with serverless optimizations (disable buffering)
mongoose
  .connect(URI, {
    bufferCommands: false,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Connection to MongoDB failed:", err);
  });