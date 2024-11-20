import React, { useEffect } from "react";
import {
  TextField,
  Checkbox,
  Button,
  Typography,
  Box,
  FormControlLabel,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks/useRedux";
import { useNavigate } from "react-router-dom";
import { useFormik, useFormikContext } from "formik";
import { UserType } from "../../types/User.type";
import { userSchema } from "../../validation/userSchema";
import { signupUser } from "../../store/auth/authThunk";
import BackToHomeButton from "../BackToHomeButton/BackToHomeButton";
import { updateUser } from "../../store/user/userThunk";
import { enqueueSnackbar } from "notistack";

function UserForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const error = useAppSelector((state) => state.auth?.error);
  // const { values } = useFormikContext<UserType>();

  const formik = useFormik<UserType>({
    initialValues: user || {
      name: { first: "", mid: "", last: "" },
      isBusiness: false,
      isAdmin: false,
      email: "",
      password: "",
      phone: "",
      address: {
        state: "",
        country: "",
        city: "",
        street: "",
        houseNumber: "",
      },
      image: { url: "", alt: "" },
      likes: [],
      failedLoginAttempts: 0,
    },
    validationSchema: userSchema,
    onSubmit: async (values) => {
      submitForm(values);
  
    },
  });

  // const handleSubmit = async () => {
  //   submitForm(values);
  // };

  const submitForm=async (values: UserType)=>{
    try {
      const resultAction = !user
        ? await dispatch(signupUser(values)).unwrap()
        : await dispatch(updateUser(values)).unwrap();
      if (resultAction.success) {
        navigate("/user-cards");
      }
    } catch (err: any) {
      enqueueSnackbar(err, { variant: "error" });
      console.log(err);
    }
  } 

  // useEffect(() => {
  //   if (!user || !formik) return;
  //     formik.setValues(
  //       user
  //     );
  // }, [user, formik]);

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ maxWidth: 500, mx: "auto", p: 2 }}
    >
      <div>
        <BackToHomeButton />
      </div>
      <Typography variant="h5" component="h1" gutterBottom>
        {!user ? "Sign Up" : "Edit User"}
      </Typography>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <TextField
        fullWidth
        label="First Name"
        name="name.first"
        value={formik.values.name.first}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        helperText={formik.touched.name?.first && formik.errors.name?.first}
        error={formik.touched.name?.first && Boolean(formik.errors.name?.first)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Middle Name"
        name="name.mid"
        value={formik.values.name.mid}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        helperText={formik.touched.name?.mid && formik.errors.name?.mid}
        error={formik.touched.name?.mid && Boolean(formik.errors.name?.mid)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Last Name"
        name="name.last"
        value={formik.values.name.last}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        helperText={formik.touched.name?.last && formik.errors.name?.last}
        error={formik.touched.name?.last && Boolean(formik.errors.name?.last)}
        margin="normal"
      />

      <FormControlLabel
        control={
          <Checkbox
            name="isBusiness"
            checked={formik.values.isBusiness}
            onChange={formik.handleChange}
          />
        }
        label="Is Business"
      />
      {user?.isAdmin && (
        <FormControlLabel
          control={
            <Checkbox
              name="isAdmin"
              checked={formik.values.isAdmin}
              onChange={formik.handleChange}
            />
          }
          label="Is Admin"
        />
      )}

      <TextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        helperText={formik.touched.email && formik.errors.email}
        error={formik.touched.email && Boolean(formik.errors.email)}
        margin="normal"
      />
      {!user && (
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched.password && formik.errors.password}
          error={formik.touched.password && Boolean(formik.errors.password)}
          margin="normal"
        />
      )}

      <TextField
        fullWidth
        label="Phone"
        name="phone"
        value={formik.values.phone}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        helperText={formik.touched.phone && formik.errors.phone}
        error={formik.touched.phone && Boolean(formik.errors.phone)}
        margin="normal"
      />

      {(["state", "country", "city", "street", "houseNumber"] as const).map(
        (field) => (
          <TextField
            key={field}
            fullWidth
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            name={`address.${field}`}
            value={formik.values.address[field]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={
              formik.touched.address?.[field] && formik.errors.address?.[field]
            }
            error={
              formik.touched.address?.[field] &&
              Boolean(formik.errors.address?.[field])
            }
            margin="normal"
          />
        )
      )}

      <TextField
        fullWidth
        label="Image URL"
        name="image.url"
        value={formik.values.image.url}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        helperText={formik.touched.image?.url && formik.errors.image?.url}
        error={formik.touched.image?.url && Boolean(formik.errors.image?.url)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Image Alt Text"
        name="image.alt"
        value={formik.values.image.alt}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        helperText={formik.touched.image?.alt && formik.errors.image?.alt}
        error={formik.touched.image?.alt && Boolean(formik.errors.image?.alt)}
        margin="normal"
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        // onClick={handleSubmit}
      >
        {!user ? "Sign Up" : "Edit User"}
      </Button>
    </Box>
  );
}

export default UserForm;
