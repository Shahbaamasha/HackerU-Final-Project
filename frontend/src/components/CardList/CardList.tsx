import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { CardType } from "../../types/Card.type";
import SingleCard from "./Card/Card";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks/useRedux";
import { clearCard } from "../../store/cards/cardsSlice";
import CardModal from "../CardModal/CardModal";

type CardListProps = {
  cards: CardType[];
  addCard?: boolean;
};

const CardList = ({ cards, addCard = false }: CardListProps) => {
  const dispatch = useAppDispatch();
  const selectedCard = useAppSelector((state) => state.cards.selectedCard);
  const search = useAppSelector((state) => state.cards.search);
  const [openModal, setOpenModal] = useState<boolean>(addCard);
  const [filteredCards, setFilteredCards] = useState<CardType[]>(cards);
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    setOpenModal(addCard);
  }, [addCard]);

  useEffect(() => {
    if (search === "") {
      setFilteredCards(cards);
    } else {
      const filtered = filteredCards.filter(
        (card) =>
          card.title.toLowerCase().includes(search) ||
          card.subtitle.toLowerCase().includes(search) ||
          card.description.toLowerCase().includes(search)
      );
      setFilteredCards(filtered);
    }
  }, [search,cards]);

  useEffect(() => {
    if (!selectedCard) return;
    handleOpenModal();
  }, [selectedCard]);

  const handleCloseModal = () => {
    setOpenModal(false);
    dispatch(clearCard());
  };

  return (
    <>
      {filteredCards.length > 0 ? (
        <Grid container spacing={3}>
          {filteredCards.map((card) => (
            <SingleCard key={card._id} card={card} />
          ))}
        </Grid>
      ) : (
        <Typography variant="h6">No cards were added yet</Typography>
      )}
      <CardModal
        initialValues={selectedCard}
        open={openModal}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default CardList;
