import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserType } from "../../types/User.type";
import axios from "axios";
import { logout } from "../auth/authSlice";
import { CardType } from "../../types/Card.type";
import { enqueueSnackbar } from "notistack";

const apiUrl = process.env.REACT_APP_API_BASE_URL;

export const updateUserById = createAsyncThunk(
  "auth/updateUserById",
  async (user_id: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUrl}/users/${user_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error: any) {
      enqueueSnackbar(error, { variant: "error" });
      if (error.response?.status === 401) {
        dispatch(logout());
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (user: UserType, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${apiUrl}/users/${user._id}`, user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      enqueueSnackbar('success update user', { variant: 'success' });
      return response.data;
    } catch (error: any) {
      enqueueSnackbar(error, { variant: "error" });
      return rejectWithValue(
        error.response?.data?.message || "Failed to update user"
      );
    }
  }
);

// Thunk to fetch user cards
export const getAllUsers = createAsyncThunk(
  "cards/getAllUsers",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/users`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      enqueueSnackbar(error, { variant: "error" });
      if (error.response?.status === 401) {
        console.log("error ", error.message);
      }
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user cards"
      );
    }
  }
);

// Thunk to remove a user
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (user_id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${apiUrl}/users/${user_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      enqueueSnackbar('success delete user', { variant: 'success' });
      return user_id;
    } catch (error: any) {
      enqueueSnackbar(error, { variant: "error" });
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove card"
      );
    }
  }
);

export const toggleIsBusiness = createAsyncThunk(
  "user/toggleIsBusiness",
  async (user: UserType, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${apiUrl}/users/${user._id}`,
        { user },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      enqueueSnackbar(error, { variant: "error" });
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove card"
      );
    }
  }
);

export const toggleCardLike = createAsyncThunk(
  "user/toggleCardLike",
  async (
    { card, user }: { card: CardType; user: UserType },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.patch(
        `${apiUrl}/cards/${card._id}`,
        { user },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return { user: response.data.user, card };
    } catch (error: any) {
      enqueueSnackbar(error, { variant: "error" });
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove card"
      );
    }
  }
);
