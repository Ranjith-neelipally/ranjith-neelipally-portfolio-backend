import * as yup from "yup";

export const ProjectValidationSchema = yup.object().shape({
  projectName: yup
    .string()
    .trim()
    .required("Project Name is required")
    .min(3, "Project Name is too short, it should be atleast 3 characters long"),
  description: yup
    .string()
    .trim()
    .required("Description is required")
    .min(30, "Project Name is too short, it should be atleast 30 characters long"),
  projectPreview: yup.string().trim().required("Project Preview is required"),
  userId: yup.string().trim().required("User Id is required"),
});
