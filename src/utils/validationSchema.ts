import * as yup from "yup"

export const ValidationSchema = yup.object().shape({
    name: yup.string().trim().required("name is missing").min(3, "name is too short!"),
    email:yup.string().required('email required!').email("invalid email!")
})
