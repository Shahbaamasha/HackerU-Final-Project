import React, { ReactNode, useState } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAppSelector } from "../../store/hooks/useRedux";
import AllCardsPage from "../AllCardsPage/AllCardsPage";
import UserCardsPage from "../UserCardsPage/UserCardsPage";
import AllUsersPage from "../AllUsersPage/AllUsersPage";

const HomePage = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const user = useAppSelector((state) => state.user?.user);

  return (
    <Grid
      container
      direction="column"
      sx={{
        height: "100vh",
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
      }}
    >
      <Grid item>
        <Navbar />
      </Grid>
      <Grid item sx={{ overflowY: "auto" }}>
        <Container>
          <Typography variant="h4" gutterBottom sx={{ marginTop: 2 }}>
            Welcome to the Card App
          </Typography>
          <main style={{ flex: 1, padding: "20px" }}>
            {/* <Outlet /> */}
            <Routes>
              <Route path="/" element={<AllCardsPage />} />
              <Route
                path="user-cards"
                element={isLoggedIn ? <UserCardsPage /> : <Navigate to="/" />}
              />
              <Route
                path="/"
                element={
                  user?.isAdmin ? <AllUsersPage /> : <Navigate to={"/"} />
                }
              />
              <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </Container>
      </Grid>
      <Grid item>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default HomePage;
