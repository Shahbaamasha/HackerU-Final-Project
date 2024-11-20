import * as Yup from "yup";

export const userSchema = Yup.object().shape({
    name: Yup.object().shape({
      first: Yup.string().required("First name is required"),
      mid: Yup.string(),
      last: Yup.string().required("Last name is required"),
    }),
    isBusiness: Yup.boolean(),
    isAdmin: Yup.boolean(),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    phone: Yup.string().required("Phone is required"),
    address: Yup.object().shape({
      state: Yup.string().required("State is required"),
      country: Yup.string().required("Country is required"),
      city: Yup.string().required("City is required"),
      street: Yup.string().required("Street is required"),
      houseNumber: Yup.string().required("House number is required"),
    }),
    image: Yup.object().shape({
      url: Yup.string()
        .url("Must be a valid URL")
        .required("Image URL is required"),
      alt: Yup.string().required("Alt text is required"),
    }),
  });