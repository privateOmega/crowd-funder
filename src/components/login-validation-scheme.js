import * as Yup from "yup"

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .required("Enter your password")
    .min(8, "Password must contain at least 8 characters"),
})

export default validationSchema
