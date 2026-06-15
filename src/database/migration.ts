import mongoose from "mongoose";
import Admin from "../Modal/Admin";
import { MONGO_URI } from "../utils/variables";

// Utility function to convert name to slug
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-") // replace non-alphanumeric characters with hyphen
    .replace(/^-+|-+$/g, "");   // remove leading/trailing hyphens
}

async function runMigration() {
  const URI = MONGO_URI as string;
  if (!URI) {
    console.error("MONGO_URI is not set!");
    process.exit(1);
  }

  console.log("Connecting to MongoDB for migration...");
  await mongoose.connect(URI);
  console.log("Connected to MongoDB.");

  try {
    const admins = await Admin.find({});
    console.log(`Found ${admins.length} admin records.`);

    for (const admin of admins) {
      if (admin.slug) {
        console.log(`Admin ${admin.userName} already has slug: ${admin.slug}. Skipping.`);
        continue;
      }

      let baseSlug = generateSlug(admin.userName || "admin");
      if (!baseSlug) baseSlug = "admin";

      let uniqueSlug = baseSlug;
      let counter = 1;

      // Check for uniqueness
      while (await Admin.findOne({ slug: uniqueSlug, _id: { $ne: admin._id } })) {
        uniqueSlug = `${baseSlug}-${counter}`;
        counter++;
      }

      admin.slug = uniqueSlug;
      await admin.save();
      console.log(`Backfilled admin ${admin.userName} with slug: ${admin.slug}`);
    }

    console.log("Migration completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
}

runMigration();
