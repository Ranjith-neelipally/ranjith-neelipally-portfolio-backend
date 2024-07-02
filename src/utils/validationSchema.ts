import * as yup from "yup";

export const ValidationSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Name is missing")
    .min(3, "Name is too short!"),
  email: yup
    .string()
    .required("Email is required!")
    .email("Invalid email format!"),
});

export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required!")
    .email("Invalid email format!"),
  password: yup.string().trim().required("Password is required!"),
});
