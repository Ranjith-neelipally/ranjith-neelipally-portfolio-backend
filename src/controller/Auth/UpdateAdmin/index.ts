import { RequestHandler } from "express";
import { AdminHandler } from "../../../@types/Admin";
import Admin from "../../../Modal/Admin";
export const UpdateAdminDetails: RequestHandler = async (
  req: AdminHandler,
  res
) => {
  const { email, profilePic, userName, slug, aboutMeSection1, aboutMeSection2 } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ error: "Admin not found!" });
    }

    const updateFields: any = { profilePic, userName, aboutMeSection1, aboutMeSection2 };

    if (slug) {
      const finalSlug = slug.toLowerCase().trim();
      if (!/^[a-z0-9-]+$/.test(finalSlug)) {
        return res.status(400).json({ error: "Slug must be URL-friendly (only lowercase alphanumeric and hyphens)" });
      }
      const existingSlug = await Admin.findOne({ slug: finalSlug, email: { $ne: email } });
      if (existingSlug) {
        return res.status(400).json({ error: "Slug is already in use" });
      }
      updateFields.slug = finalSlug;
    }

    const changes = await Admin.updateOne({ email }, updateFields);
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
