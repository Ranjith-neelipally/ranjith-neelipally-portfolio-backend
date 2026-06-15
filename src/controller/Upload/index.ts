import { RequestHandler } from "express";
import { put, del } from "@vercel/blob";
import { BLOB_READ_WRITE_TOKEN } from "../../utils/variables";
import Admin from "../../Modal/Admin";

export const HandleFileUpload: RequestHandler = async (req, res) => {
  const { filename, fileData, userId, type } = req.body; 
  
  if (!filename || !fileData) {
    return res.status(400).json({ error: "Filename and fileData are required" });
  }

  try {
    // Extract raw base64 data and mime type
    const matches = fileData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ error: "Invalid base64 file data" });
    }

    const contentType = matches[1];
    const buffer = Buffer.from(matches[2], "base64");

    let finalFilename = filename;

    // Handle profile picture renaming and old picture deletion
    if (type === "profile") {
      if (!userId) {
        return res.status(400).json({ error: "userId is required for profile picture upload" });
      }

      const admin = await Admin.findById(userId);
      if (!admin) {
        return res.status(404).json({ error: "Admin user not found" });
      }

      // 1. Delete old profile pic from Vercel Blob if exists
      if (admin.profilePic && admin.profilePic.includes("blob.vercel-storage.com")) {
        try {
          await del(admin.profilePic, { token: BLOB_READ_WRITE_TOKEN });
          console.log(`Deleted old profile pic: ${admin.profilePic}`);
        } catch (err) {
          console.error("Failed to delete old profile pic:", err);
        }
      }

      // 2. Rename to profile_pic_{userName}.{ext}
      const ext = filename.includes(".") ? filename.substring(filename.lastIndexOf(".")) : ".png";
      const cleanName = admin.userName.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");
      finalFilename = `profile_pic_${cleanName}${ext}`;
    }

    // Upload to Vercel Blob
    const blob = await put(finalFilename, buffer, {
      contentType,
      access: "public",
      token: BLOB_READ_WRITE_TOKEN
    });

    // 3. Update the database immediately for profile picture
    if (type === "profile" && userId) {
      await Admin.findByIdAndUpdate(userId, { profilePic: blob.url });
    }

    res.status(200).json({
      message: "File uploaded successfully",
      url: blob.url
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    res.status(500).json({ error: error.message || "Failed to upload file to Vercel Blob" });
  }
};
