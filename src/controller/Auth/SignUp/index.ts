import { RequestHandler } from "express";
import { SignUpInterface } from "../../../@types/SignUp";
import Admin from "../../../Modal/Admin";

export const HandleSignUp: RequestHandler = async (
  req: SignUpInterface,
  res
) => {
  const { email, password, userName } = req.body;
  try {
    const user = await Admin.create({
      email,
      password,
      userName,
    });
    if (user) {
      res.json({ message: "User created successfully" });
    } else {
      res.status(500).json({ error: "User not created" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
