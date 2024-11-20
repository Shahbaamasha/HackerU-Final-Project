import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { useAppDispatch, useAppSelector } from "./store/hooks/useRedux";
import UserCardsPage from "./pages/UserCardsPage/UserCardsPage";
import UserForm from "./components/UserForm/UserForm";
import { updateUserById } from "./store/user/userThunk";
import { ToastContainer } from "react-toastify";
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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<UserForm />} />
        <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
        {/* Add this line for UserCardsPage route */}
        <Route path="/user-cards" element={<UserCardsPage />} />
        {/* Optional fallback route */}
        <Route path="/*" element={<HomePage isLoggedIn={isLoggedIn} />} />
      </Routes>
      <Loader />
    </>
  );
};

export default App;
