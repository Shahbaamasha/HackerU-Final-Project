import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../types/User.type";
import {
  deleteUser,
  getAllUsers,
  toggleCardLike,
  toggleIsBusiness,
  updateUser,
  updateUserById,
} from "./userThunk";

interface UserState {
  loading: boolean;
  user: UserType | null;
  users: UserType[] | null;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserType| null>) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllUsers.fulfilled,
        (state, action: PayloadAction<UserType[]>) => {
          state.users = action.payload;
          state.loading = false;
        }
      )
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateUserById.fulfilled,
        (state, action: PayloadAction<UserType>) => {
          state.loading = false;
          state.user = action.payload;
        }
      )
      .addCase(updateUserById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateUser.fulfilled,
        (state, action: PayloadAction<UserType>) => {
          state.loading = false;
          state.user = action.payload;
        }
      )
      .addCase(updateUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        if (!state.users) return;
        state.users = state.users.filter((card) => card._id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(toggleIsBusiness.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        toggleIsBusiness.fulfilled,
        (state, action: PayloadAction<UserType>) => {
          if (!state.user) return;
          state.user.isBusiness = action.payload.isBusiness;
          state.loading = false;
        }
      )
      .addCase(toggleIsBusiness.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(toggleCardLike.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        toggleCardLike.fulfilled,
        (state, action: PayloadAction<any>) => {
          if (!state.user) return;
          state.user = action.payload.user;
          state.loading = false;
        }
      )
      .addCase(toggleCardLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
