import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { UserType } from "../../types/User.type";
import { logout } from "./authSlice";
import { clearCard } from "../cards/cardsSlice";
import { setUser } from "../user/userSlice";
import { enqueueSnackbar } from "notistack";

const apiUrl = process.env.REACT_APP_API_BASE_URL;

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    credentials: { email: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${apiUrl}/users/login`, credentials);
      dispatch(setUser(response.data.user));
      return response.data;
    } catch (error: any) {
      enqueueSnackbar(error, { variant: 'error' });
      if (error.response?.status === 401) {
        dispatch(logout());
        dispatch(clearCard());
      }
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user cards"
      );
    }
  }
);

// Async thunk for user signup
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData: UserType, { dispatch, rejectWithValue }) => {
    try {
      const { failedLoginAttempts, ...user } = userData;
      const response = await axios.post(`${apiUrl}/users/`, user);
      dispatch(setUser(response.data.user));
      enqueueSnackbar('success create user', { variant: 'success' });
      return response.data;
    } catch (err: any) {
      enqueueSnackbar(err, { variant: 'error' });
      return rejectWithValue(err.response.data.message);
    }
  }
);
