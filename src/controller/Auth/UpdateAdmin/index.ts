import { RequestHandler } from "express";
import { AdminHandler } from "../../../@types/Admin";
import Admin from "../../../Modal/Admin";
export const UpdateAdminDetails: RequestHandler = async (
  req: AdminHandler,
  res
) => {
  const { email, profilePic, userName } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ error: "Admin not found!" });
    }
    const changes = await Admin.updateOne({ profilePic, userName });
    if (!changes) {
      return res.status(404).json({ error: "Admin not found!" });
    }
    const count = await changes.modifiedCount;

    if (count === 0) {
      return res.status(404).json({ error: "Details not updated!" });
    }
    return res
      .status(200)
      .json({ message: `${count} details updated successfully` });
  } catch (error) {
    res.status(500).json(error);
  }
};
