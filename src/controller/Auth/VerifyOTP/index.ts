import { RequestHandler } from "express";
import { VerifyOtpInterface } from "../../../@types/VerifyOtp";
import emailVerificationToken from "../../../../src/Modal/VerificationCode";
import Admin from "../../../../src/Modal/Admin";
import jwt from "jsonwebtoken";
import { TOKEN_KEY } from "../../../utils/variables";

export const VerifyOTP: RequestHandler = async (
  req: VerifyOtpInterface,
  res
) => {
  const { userId, otp } = req.body;

  const verificationToken = await emailVerificationToken.findOne({
    owner: userId,
  });
  const user = await Admin.findOne({ _id:userId });

  if (!verificationToken) {
    return res.status(403).json({ error: "Inavid OTP" });
  }

  const matched = await verificationToken.compareToken(otp);

  if (!matched) {
    return res.status(403).json({ error: "Inavid OTP" });
  }

  if (!user) {
    return res.status(403).json({ error: "User not found" });
  }


  const jsontoken = jwt.sign({ userId: userId }, TOKEN_KEY);
  user.tokens.push(jsontoken);
  await user.save();
  await emailVerificationToken.findByIdAndDelete(verificationToken._id);
  res.json({ authToken: jsontoken });
};
