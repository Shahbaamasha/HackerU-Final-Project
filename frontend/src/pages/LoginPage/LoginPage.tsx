import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks/useRedux";
import { LoginSx } from "../../styles/sxStyles";
import { loginUser } from "../../store/auth/authThunk";
import { loginSchema } from "../../validation/loginSchema";
import BackToHomeButton from "../../components/BackToHomeButton/BackToHomeButton";
import { enqueueSnackbar } from "notistack";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector((state) => state.auth.error);

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      const user = {
        email: values.email,
        password: values.password,
      };
      try {
        dispatch(loginUser({ email: user.email, password: user.password }));
        navigate("/user-cards");
      } catch (error: any) {
        enqueueSnackbar(error, { variant: 'error' });
        if (axios.isAxiosError(error) && error.response) {
          const errorMessage =
            error.response.data.message || "Invalid login credentials";
          console.error("Login error:", errorMessage);
          // setLoginError(errorMessage);
        } else {
          const unexpectedError =
            "An unexpected error occurred. Please try again.";
          console.error("Login error:", unexpectedError);
          // setLoginError(unexpectedError);
        }
      }
    },
  });

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        noValidate
        sx={LoginSx.loginForm}
      >
        <div>
          <BackToHomeButton />
        </div>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Login
        </Typography>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          variant="outlined"
          margin="normal"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          sx={{ height: 70 }}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          sx={{ height: 70 }}
        />
        <Typography color="error" variant="body2" sx={{ height: 40 }}>
          {error && error}
        </Typography>

        <Button
          sx={{ mt: 3 }}
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          disabled={formik.isSubmitting}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
