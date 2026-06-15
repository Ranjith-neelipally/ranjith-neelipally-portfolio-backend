"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Admin_1 = __importDefault(require("../Modal/Admin"));
const variables_1 = require("../utils/variables");
function generateSlug(name) {
    return name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}
function runMigration() {
    return __awaiter(this, void 0, void 0, function* () {
        const URI = variables_1.MONGO_URI;
        if (!URI) {
            console.error("MONGO_URI is not set!");
            process.exit(1);
        }
        console.log("Connecting to MongoDB for migration...");
        yield mongoose_1.default.connect(URI);
        console.log("Connected to MongoDB.");
        try {
            const admins = yield Admin_1.default.find({});
            console.log(`Found ${admins.length} admin records.`);
            for (const admin of admins) {
                if (admin.slug) {
                    console.log(`Admin ${admin.userName} already has slug: ${admin.slug}. Skipping.`);
                    continue;
                }
                let baseSlug = generateSlug(admin.userName || "admin");
                if (!baseSlug)
                    baseSlug = "admin";
                let uniqueSlug = baseSlug;
                let counter = 1;
                while (yield Admin_1.default.findOne({ slug: uniqueSlug, _id: { $ne: admin._id } })) {
                    uniqueSlug = `${baseSlug}-${counter}`;
                    counter++;
                }
                admin.slug = uniqueSlug;
                yield admin.save();
                console.log(`Backfilled admin ${admin.userName} with slug: ${admin.slug}`);
            }
            console.log("Migration completed successfully!");
        }
        catch (error) {
            console.error("Migration failed:", error);
        }
        finally {
            yield mongoose_1.default.disconnect();
            console.log("Disconnected from MongoDB.");
        }
    });
}
runMigration();
