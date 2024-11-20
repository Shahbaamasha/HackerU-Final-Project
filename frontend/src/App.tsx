import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { useAppDispatch, useAppSelector } from "./store/hooks/useRedux";
import UserCardsPage from "./pages/UserCardsPage/UserCardsPage";
import AllCardsPage from "./pages/AllCardsPage/AllCardsPage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import UserForm from "./components/UserForm/UserForm";
import { updateUserById } from "./store/user/userThunk";
import { ToastContainer } from "react-toastify";
import { BorderClear, BorderColor } from "@mui/icons-material";
import AllUsersPage from "./pages/AllUsersPage/AllUsersPage";
import { Backdrop, Box, CircularProgress } from "@mui/material";
import Loader from "./components/Loader/Loader";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const user_id = localStorage.getItem("user_id");
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (!user_id) return;
    dispatch(updateUserById(user_id!));
  }, [dispatch]);

  return (
    <>
      <Routes>
        {/* <Routes> */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<UserForm />} />
          <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
          <Route path="/*" element={<HomePage isLoggedIn={isLoggedIn} />} />
        </Routes>
      <Loader />
    </>
  );
};

export default App;
