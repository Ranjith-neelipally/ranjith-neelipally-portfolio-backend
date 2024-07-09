import { RequestHandler } from "express";
import mongoose from "mongoose";


export const Home: RequestHandler = async (req, res) => {
  return res.status(200).json({ message: "Hello World!" });
};

export const CheckDbConnection: RequestHandler = async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    res.json({ message: "connected" });
  } else {
    res.json({ message: "not connected" });
  }
};
