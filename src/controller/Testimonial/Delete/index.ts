import { RequestHandler } from "express";
import { TestimonialsInterface } from "../../../@types/Testimonials";
import Testimonials from "../../../Modal/Testimonials";

export const DeleteTestimonial: RequestHandler = async (
  req: TestimonialsInterface,
  res
) => {
  const { email } = req.body;
  try {
    const user = await Testimonials.findOneAndDelete({ email });
    if (!user) {
      return res.status(400).send("Testimonial not found");
    }
    res.json("Delete Testimonial");
  } catch (error) {
    res.json(error);
  }
};
