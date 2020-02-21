import * as Yup from "yup"

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .required("Enter your password")
    .min(8, "Password must contain at least 8 characters"),
})

export default validationSchema
