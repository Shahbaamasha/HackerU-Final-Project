import React, { useEffect, useState } from "react";
import CardList from "../../components/CardList/CardList";
import { useAppDispatch, useAppSelector } from "../../store/hooks/useRedux";
import { fetchUserCards } from "../../store/cards/cardsThunk";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function UserCardsPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cards = useAppSelector((state) => state.cards.cards);
  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    if (!user_id) return;
    dispatch(fetchUserCards(user_id));
  }, []);

  const handleNavigateToAllCards = () => {
    navigate("/");
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleNavigateToAllCards}
        style={{ marginBottom: "20px" }}
      >
        All Cards
      </Button>
      <CardList cards={cards ? cards : []} />
    </>
  );
}

export default UserCardsPage;
