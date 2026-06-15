import { RequestHandler } from "express";
import { SignUpInterface } from "../../../@types/SignUp";
import Admin from "../../../Modal/Admin";

export const HandleSignUp: RequestHandler = async (
  req: SignUpInterface,
  res
) => {
  const { email, password, userName, slug } = req.body;
  try {
    const existingEmail = await Admin.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Admin with this email already exists" });
    }

    let finalSlug = slug;
    if (!finalSlug) {
      finalSlug = userName.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    } else {
      finalSlug = finalSlug.toLowerCase().trim();
      if (!/^[a-z0-9-]+$/.test(finalSlug)) {
        return res.status(400).json({ error: "Slug must be URL-friendly (only lowercase alphanumeric and hyphens)" });
      }
    }

    const existingSlug = await Admin.findOne({ slug: finalSlug });
    if (existingSlug) {
      return res.status(400).json({ error: "Slug is already in use" });
    }

    const user = await Admin.create({
      email,
      password,
      userName,
      slug: finalSlug,
    });
    if (user) {
      res.json({ message: "User created successfully" });
    } else {
      res.status(500).json({ error: "User not created" });
    }
  } catch (error) {
    console.error("SignUp Error:", error);
    res.status(500).json({ error: error instanceof Error ? error.message : "Internal server error" });
  }
};
