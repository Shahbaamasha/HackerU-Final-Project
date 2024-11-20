// src/slices/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../types/User.type";
import {
  loginUser,
  signupUser,
} from "./authThunk";

interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isLoggedIn=false;
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<{ token: string; user: UserType }>) => {
          state.loading = false;
          state.isLoggedIn = true;
          state.token = action.payload.token;
          localStorage.setItem("user_id", action.payload.user._id!);
          localStorage.setItem("token", action.payload.token);
        }
      )
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.isLoggedIn=false;
        state.error = action.payload;
      })

      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        signupUser.fulfilled,
        (state, action: PayloadAction<{ token: string; user: UserType }>) => {
          state.loading = false;
          state.token = action.payload.token;
          localStorage.setItem("user_id", action.payload.user._id!);
          localStorage.setItem("token", action.payload.token);
        }
      )
      .addCase(signupUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
  
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
