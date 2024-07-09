import * as yup from "yup";

export const TestimonialValidationSchema = yup.object().shape({
  userName: yup.string().required("Name is required").min(5).max(50),
  email: yup.string().email().required("Email is required"),
  designation: yup.string().required("Designation is required").min(5).max(50),
  message: yup.string().required("Message is required").min(25).max(500),
});
