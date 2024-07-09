import mongoose, { Model, ObjectId, Schema, model, models } from "mongoose";
import { hash, compare } from "bcrypt";

interface EmailVerificationTokenDocument {
  owner: ObjectId;
  token: string;
  createdAt: Date;
}

interface EmailVerificationMethod {
  compareToken(token: string): Promise<boolean>;
}

const EmailVerificationTokenSchema = new Schema<
  EmailVerificationTokenDocument,
  {},
  EmailVerificationMethod
>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      expires: 3600,
      default: Date.now(),
    },
  },
);

EmailVerificationTokenSchema.pre("save", async function (next) {
  if (this.isModified("token")) {
    this.token = await hash(this.token, 10);
  }
  next();
});

EmailVerificationTokenSchema.methods.compareToken = async function (token) {
  const result = await compare(token, this.token);
  return result;
};

const EmailVerificationToken =
  models.EmailVerificationToken ||
  (model("EmailVerificationToken", EmailVerificationTokenSchema) as Model<
    EmailVerificationTokenDocument,
    {},
    EmailVerificationMethod
  >);

export default EmailVerificationToken;
