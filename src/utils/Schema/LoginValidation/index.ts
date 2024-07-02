import * as yup from "yup";
const PasswordvalidationExpression =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]{8,}$/;

export const LoginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required("email is required")
    .email("invalid email id!"),
  password: yup
    .string()
    .trim()
    .required("Password is missing")
    .min(8, "Password is too short!"),
});

