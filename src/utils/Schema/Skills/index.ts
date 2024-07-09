import * as yup from "yup";

export const SkillsValidationSchema = yup.object().shape({
  frameWorks: yup
    .array()
    .of(yup.string().trim().required("Framework is required")),
  skills: yup.array().of(yup.string().trim().required("Skill is required")),
  tools: yup.array().of(yup.string().trim().required("Tool is required")),
  email: yup.string().trim().required("Email is required"),
});
