import { RequestHandler } from "express";
import Admin from "../../Modal/Admin";
import { AdminHandler } from "../../@types/Admin/index";

export const HandleAdminForm: RequestHandler = async (
  req: AdminHandler,
  res
) => {
  const { name, email, profilePhoto } = req.body;

  if (name && email) {
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.json({ error: "user already exist" });
    }
    try {
      const admin = await Admin.create({
        name: name,
        email: email,
        profilePhoto,
      });
      res.status(200).json({ message: admin });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  } else {
    res.status(400).json({ message: "not working" });
  }
};
