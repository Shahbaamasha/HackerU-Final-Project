import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from './cards/cardsSlice';
import userReducer from './user/userSlice';
import authReducer from './auth/authSlice';

export const store = configureStore({
  reducer: {
    cards: cardsReducer,
    user: userReducer,
    auth: authReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
