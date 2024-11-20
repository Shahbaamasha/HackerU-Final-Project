import React, { useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  CardActions,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { CardType } from "../../../types/Card.type";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/useRedux";
import { setSelectedCard } from "../../../store/cards/cardsSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteCard } from "../../../store/cards/cardsThunk";
import { toggleCardLike } from "../../../store/user/userThunk";
import { enqueueSnackbar } from "notistack";
import classes from "./Card.module.css";

type SingleCardProps = {
  card: CardType;
};

const SingleCard = ({ card }: SingleCardProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const error = useAppSelector((state) => state.cards.error);
  const token = localStorage.getItem("token");
  const API_URL = process.env.REACT_APP_API_BASE_URL;

  const handleLikeToggle = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    try {
      if (!user) return;
      dispatch(toggleCardLike({ card, user }));
    } catch (error: any) {
      enqueueSnackbar(error, { variant: "error" });
      console.error("Error liking card", error);
    }
  };

  const handleCardClick = () => {
    dispatch(setSelectedCard(card));
  };

  const handleDeleteCard = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    try {
      event.stopPropagation();
      const resultAction = await dispatch(deleteCard(card._id!)).unwrap();
    } catch (err: any) {
      enqueueSnackbar(err, { variant: "error" });
      console.log(err);
    }
  };

  return (
    <Grid item xs={12} sm={6} md={4} key={card._id}>
      <Card
        className={classes.card}
        sx={{
          height: 150,
          cursor: "pointer",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          },
        }}
        onClick={() => user && handleCardClick()}
      >
        <CardContent sx={{ pb: 0, height: 90 }}>
          <Typography variant="h6">{card.title}</Typography>
          <Typography variant="body2">{card.subtitle}</Typography>
          <Typography variant="body1">{card.description}</Typography>
        </CardContent>

        {user && (
          <CardActions>
            <IconButton
              sx={{ pt: 0 }}
              onClick={handleLikeToggle}
              color={user?.likes.includes(card._id!) ? "primary" : "default"}
            >
              <FavoriteIcon />
            </IconButton>
            <IconButton
              sx={{ pt: 0 }}
              aria-label="delete card"
              color="error"
              onClick={handleDeleteCard}
            >
              <DeleteIcon />
            </IconButton>
          </CardActions>
        )}
      </Card>
    </Grid>
  );
};

export default SingleCard;
