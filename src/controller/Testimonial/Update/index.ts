import { RequestHandler } from "express";
import { TestimonialsInterface } from "../../../@types/Testimonials";
import Testimonials from "../../../Modal/Testimonials";
import { generateRandomNumber } from "../../../utils/helpers";
import emailVerificationToken from "../../../Modal/VerificationCode";
import { sendVerificationMail } from "../../../utils/Email";

export const UpdateTestimonial: RequestHandler = async (
  req: TestimonialsInterface,
  res
) => {
  const { email } = req.body;
  try {
    const user = await Testimonials.findOne({ email });
    if (!user) {
      return res.status(404).json({ response: "Testimonial not found!" });
    }

    const verificationToken = generateRandomNumber(6);
    await emailVerificationToken.create({
      owner: user._id,
      token: verificationToken,
    });

    if (user.email && user.userName && user._id) {
      sendVerificationMail(verificationToken, {
        email: user.email,
        name: user.userName,
        userId: user._id.toString(),
      });
      return res.json({ message: "Verification mail sent!" });
    } else {
      return res.status(400).json({ response: "Incomplete user data" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
