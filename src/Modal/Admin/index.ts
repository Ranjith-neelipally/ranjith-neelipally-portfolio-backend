import { hash, compare } from "bcrypt";
import { Document, Model, ObjectId, Schema, model, models } from "mongoose";

export interface AdminDocument extends Document {
  userName: string;
  email: string;
  password: string;
  profilePic?: string;
  ProjectIds?: string[];
  verified?: boolean;
  tokens?: string[];
}

interface PasswordVerificationMethod {
  comparePassword(password: string): Promise<boolean>;
}

const AdminSchema = new Schema<AdminDocument, {}, PasswordVerificationMethod>(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
    },
    ProjectIds: [String],
    tokens: [String],
  },
  { collection: "Admin" }
);

AdminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hash(this.password, 10);
  }
  next();
});

AdminSchema.methods.comparePassword = async function (password) {
  const result = await compare(password, this.password);
  return result;
};

// export default model("Admin", AdminSchema) as Model<
//   AdminDocument,
//   {},
//   PasswordVerificationMethod
// >;

const AdminModel =
  models.Admin ||
  (model("Admin", AdminSchema) as Model<
    AdminDocument,
    {},
    PasswordVerificationMethod
  >);

export default AdminModel;
