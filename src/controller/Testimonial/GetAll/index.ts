import { RequestHandler } from "express";
import { TestimonialsInterface } from "../../../@types/Testimonials";
import Admin from "../../../Modal/Admin";
import Testimonials from "../../../Modal/Testimonials";

export const GetAllTestimonials: RequestHandler = async (
  req: TestimonialsInterface,
  res
) => {
  const { email } = req.query;
  try {
    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const testimonials = await Testimonials.find({
      _id: { $in: user.testimonials },
    });
    if (!testimonials) {
      return res.status(400).json({ message: "Testimonials not found" });
    }
    return res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json(error);
  }
};
