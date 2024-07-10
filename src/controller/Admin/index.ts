import { RequestHandler } from "express";
import Admin from "../../Modal/Admin";
export const GetAdminDetails: RequestHandler = async (req, res) => {
  const { email } = req.query;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ response: "Admin Not Found!" });
    }
    const { password, tokens, ...rest } = admin.toObject();
    res.status(200).json({ response: rest });
  } catch (error) {
    res.status(400).json(error);
  }
};
