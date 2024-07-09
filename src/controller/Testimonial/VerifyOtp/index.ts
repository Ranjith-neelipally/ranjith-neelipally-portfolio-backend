import { RequestHandler } from "express";
import { VerifyOtpInterface } from "../../../@types/VerifyOtp";
import emailVerificationToken from "../../../Modal/VerificationCode";
import Testimonials from "../../../Modal/Testimonials";

export const VerifyOTP: RequestHandler = async (
  req: VerifyOtpInterface,
  res
) => {
  const { userId, otp, designation, message, userName } = req.body;

  try {
    const user = await Testimonials.findById(userId);

    if (!user) {
      return res.status(403).json({ error: "User not found" });
    }

    if (user.canEdit === false) {
      const verificationToken = await emailVerificationToken.findOne({
        owner: userId,
      });

      if (!verificationToken) {
        return res.status(403).json({ error: "Invalid OTP" });
      }

      const matched = await verificationToken.compareToken(otp);

      if (!matched) {
        return res.status(403).json({ error: "Invalid OTP" });
      }

      user.canEdit = true; 
      await user.save();

      await emailVerificationToken.findByIdAndDelete(verificationToken._id);
    }

    if (user.canEdit) {
      const updatedTestimonials = await Testimonials.updateMany(
        { _id: userId },
        { designation, message, userName }
      );

      const count = updatedTestimonials.modifiedCount;

      if (count > 0) { 
        user.canEdit = false;
        await user.save();

      }

      return res.status(200).json({
        message: "OTP verified successfully",
        response: `${count} Testimonial(s) updated successfully`,
      });
    }

    res.status(500).json({ error: "Re-verify OTP to edit" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};
