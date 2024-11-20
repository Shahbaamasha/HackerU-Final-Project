// src/slices/cardsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addCard,
  deleteCard,
  fetchUserCards,
  getAllCards,
  updateCard,
} from "./cardsThunk";
import { CardType } from "../../types/Card.type";
import { UserType } from "../../types/User.type";

interface CardsState {
  cards: CardType[];
  loading: boolean;
  error: string | null;
  selectedCard: CardType | null;
  openCardModal: boolean;
  search: string;
}

const initialState: CardsState = {
  cards: [],
  loading: false,
  error: null,
  selectedCard: null,
  openCardModal: false,
  search: "",
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setSelectedCard(state, action: PayloadAction<CardType | null>) {
      state.selectedCard = action.payload;
    },
    clearCard(state) {
      state.selectedCard = null;
      state.error = null;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch user cards
      .addCase(fetchUserCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserCards.fulfilled,
        (state, action: PayloadAction<CardType[]>) => {
          state.cards = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchUserCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(getAllCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllCards.fulfilled,
        (state, action: PayloadAction<CardType[]>) => {
          state.cards = action.payload;
          state.loading = false;
        }
      )
      .addCase(getAllCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Add card
      .addCase(addCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCard.fulfilled, (state, action: PayloadAction<CardType>) => {
        state.cards.push(action.payload);
        state.loading = false;
      })
      .addCase(addCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update card
      .addCase(updateCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateCard.fulfilled,
        (state, action: PayloadAction<CardType>) => {
          const index = state.cards.findIndex(
            (card) => card._id === action.payload._id
          );
          if (index !== -1) {
            state.cards[index] = action.payload;
          }
          state.loading = false;
        }
      )
      .addCase(updateCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Remove card
      .addCase(deleteCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCard.fulfilled, (state, action: PayloadAction<string>) => {
        state.cards = state.cards.filter((card) => card._id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedCard, clearCard, setSearch } = cardsSlice.actions;

export default cardsSlice.reducer;
