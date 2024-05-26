import { RequestHandler } from "express";
import Admin from "../../Modal/AdminForm";

export const GetAdminDetails: RequestHandler = async (req, res) => {
  const { email } = req.query;

  const details = await Admin.findOne({ email });
  if (!details) {
    return res.json({ error: "no user found" });
  }
  res.status(200).json({ details });
};
