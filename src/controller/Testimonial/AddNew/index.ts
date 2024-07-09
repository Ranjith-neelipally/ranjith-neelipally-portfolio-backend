import { RequestHandler } from "express";
import { TestimonialsInterface } from "../../../@types/Testimonials";
import Testimonials from "../../../Modal/Testimonials";

export const AddNewTestimonial: RequestHandler = async (
  req: TestimonialsInterface,
  res
) => {
  const { userName, email, designation, message } = req.body;
  try {
    const newTesto = await Testimonials.create({
      userName,
      email,
      designation,
      message,
    });
    if (!newTesto) {
      return res.status(400).send("Failed to add testimonial");
    }

    res.status(201).send("Testimonial added successfully");
  } catch (error) {
    res.status(500).send(error);
  }
};
