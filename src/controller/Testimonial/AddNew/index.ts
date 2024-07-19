import { RequestHandler } from "express";
import { TestimonialsInterface } from "../../../@types/Testimonials";
import Testimonials from "../../../Modal/Testimonials";
import Admin from "../../../Modal/Admin";

export const AddNewTestimonial: RequestHandler = async (
  req: TestimonialsInterface,
  res
) => {
  const { userName, email, designation, message, adminMail } = req.body;
  try {
    const user = await Admin.findOne({ email: adminMail });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const newTestimonial = await Testimonials.create({
      userName,
      email,
      designation,
      message,
    });
    if (!newTestimonial) {
      return res.status(400).send("Failed to add testimonial");
    }

    const updatedUser = await user.testimonials.push(newTestimonial._id);

    if (!updatedUser) {
      return res.status(400).send("Failed to update user");
    }

    if (updatedUser) {
      await user.save();
    }

    res.status(201).send("Testimonial added successfully");
  } catch (error) {
    res.status(500).send(error);
  }
};
