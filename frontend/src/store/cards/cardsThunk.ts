// userCardsSlice.ts
import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { useAppDispatch } from "../hooks/useRedux";
import { logout } from "../auth/authSlice";
import { CardType } from "../../types/Card.type";
import { clearCard } from "./cardsSlice";
import { UserType } from "../../types/User.type";
import { toast } from "react-toastify";
import { enqueueSnackbar } from "notistack";

const apiUrl = process.env.REACT_APP_API_BASE_URL;

// Thunk to fetch user cards
export const fetchUserCards = createAsyncThunk(
  "userCards/fetchUserCards",
  async (userId: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUrl}/cards/user-cards`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
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

// Thunk to fetch user cards
export const getAllCards = createAsyncThunk(
  "cards/getAllCards",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/cards`
      );
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

// Thunk to add a new card
export const addCard = createAsyncThunk(
  "userCards/addCard",
  async (card: Omit<CardType, "id">, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiUrl}/cards`, card, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      enqueueSnackbar('success create card card', { variant: 'success' });
      return response.data;
    } catch (error: any) {
      enqueueSnackbar(error, { variant: 'error' });
      if (error.response?.status === 401) {
        dispatch(logout());
        dispatch(clearCard());
      }
      return rejectWithValue(
        error.response?.data?.message || "Failed to add card"
      );
    }
  }
);

// Thunk to update an existing card
export const updateCard = createAsyncThunk(
  "userCards/updateCard",
  async (card: CardType, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${apiUrl}/cards/${card._id}`, card, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      enqueueSnackbar('success update card', { variant: 'success' });
      return response.data;
    } catch (error: any) {
      enqueueSnackbar(error, { variant: 'error' });
      return rejectWithValue(
        error.response?.data?.message || "Failed to update card"
      );
    }
  }
);

// Thunk to remove a card
export const deleteCard = createAsyncThunk(
  "userCards/deleteCard",
  async (cardId: string, { rejectWithValue }) => {
    try {
      const res=await axios.delete(`${apiUrl}/cards/${cardId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      enqueueSnackbar('success delete card', { variant: 'success' });
      return cardId;
    } catch (error: any) {
      enqueueSnackbar(error, { variant: 'error' });
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove card"
      );
    }
  }
);
