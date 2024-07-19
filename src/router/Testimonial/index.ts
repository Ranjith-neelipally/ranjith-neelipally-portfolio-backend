import { Router } from "express";
import {
  AddNewTestimonial,
  DeleteTestimonial,
  GetAllTestimonials,
  UpdateTestimonial,
  VerifyOTP,
} from "../../controller/Testimonial";
import { Validtor, verifyLoginToken } from "../../MiddleWare";
import { TestimonialValidationSchema } from "../../utils/Schema";

const TestimonialsRouter = Router();

TestimonialsRouter.get("/", GetAllTestimonials);

TestimonialsRouter.post(
  "/add-new",
  Validtor(TestimonialValidationSchema),
  AddNewTestimonial
);

TestimonialsRouter.delete("/delete", verifyLoginToken, DeleteTestimonial);
TestimonialsRouter.post("/update", UpdateTestimonial);
TestimonialsRouter.patch("/verify-and-update", VerifyOTP);

export default TestimonialsRouter;
