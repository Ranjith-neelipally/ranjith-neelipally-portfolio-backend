import mongoose from "mongoose";
import { MONGO_URI } from "../utils/variables";

const URI = MONGO_URI as string;

mongoose
  .connect(URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Connection to MongoDB failed:", err);
  });
