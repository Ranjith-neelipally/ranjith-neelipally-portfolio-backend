import { Request, RequestHandler } from "express";
import Admin from "../../../Modal/Admin";

export const HandleLogout: RequestHandler = async (req: Request, res) => {
  const { email } = req.body;
  try {
    const user = await Admin.findOne({ email });
    if (user) {
      user.tokens = [];
      await user.save();
      res.json({
        message: "User logged out successfully",
      });
    } else {
      res.status(403).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
