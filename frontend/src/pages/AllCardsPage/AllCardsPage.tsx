import CardList from "../../components/CardList/CardList";
import React, { useEffect, useState } from "react";
import { CardType } from "../../types/Card.type";
import axios from "axios";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks/useRedux";
import { getAllCards } from "../../store/cards/cardsThunk";
import { enqueueSnackbar } from "notistack";

function AllCardsPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [cards, setCards] = useState<CardType[]>([]);
  const user = useAppSelector((state) => state.user.user);
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await dispatch(getAllCards()).unwrap();
        setCards(response);
      } catch (error:any) {
        enqueueSnackbar(error, { variant: 'error' });
        console.error("Error fetching cards:", error);
      }
    };
    fetchCards();
  }, []);

  const handleNavigateToUserCards = () => {
    navigate("/user-cards");
  };

  return (
    <>
      <Box display={"flex"} gap={1}>
        {user && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleNavigateToUserCards}
            style={{ marginBottom: "20px" }}
          >
            My Cards
          </Button>
        )}
        {user?.isBusiness && (
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setOpenModal(!openModal)}
            style={{ marginBottom: "20px" }}
          >
            Add New Card
          </Button>
        )}
      </Box>
      <CardList cards={cards} addCard={openModal} />
    </>
  );
}

export default AllCardsPage;
