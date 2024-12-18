const mongoose = require("mongoose");
const Card = require("../models/Card");
const User = require("../models/User");

const getAllCards = async (req, res, next) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
};

const getUserCards = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).send();
    }
    const likedCards = await Card.find({
      _id: { $in: user.likes },
    });
    // if (!likedCards.length) {
    //   return res.status(404).json({ message: "No cards found for this user" });
    // }
    res.status(200).json(likedCards);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user cards", error: error.message });
    next(error);
  }
};

const getCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.id);

    if (!card) {
      return res.status(404).send();
    }
    res.status(200).send(card);
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
};

const generateUniqueBizNumber = async () => {
  let bizNumber;
  let card;
  do {
    bizNumber = Math.floor(100000 + Math.random() * 900000);
    card = await Card.findOne({ bizNumber });
  } while (card);
  return bizNumber;
};

const createCard = async (req, res, next) => {
  try {
    const bizNumber = await generateUniqueBizNumber();
    const newCard = new Card({
      ...req.body,
      user_id: req.userId,
      bizNumber: bizNumber,
    });
    await newCard.save();
    res.status(201).json({ message: "Card created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
};

const updateCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.id);

    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    if (card.user_id.toString() !== req.userId) {
      return res.status(403).json({
        message: "Only the user who created the card can edit it",
      });
    }

    // Bonus: Check if the user is admin and if bizNumber is unique
    if (req.isAdmin) {
      if (req.body.bizNumber && req.body.bizNumber !== card.bizNumber) {
        const existingCard = await Card.findOne({ bizNumber: req.body.bizNumber });
        if (existingCard) {
          return res.status(400).json({
            message: "bizNumber already exists. Please use a different one.",
          });
        }
      }
    }

    // Update the card with the data from req.body
    const updatedCard = await Card.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json(updatedCard);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating card", error: error.message });
    next(error);
  }
};


const likeCard = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const updateOperation = user.likes.includes(req.params.id)
      ? { $pull: { likes: req.params.id } }
      : { $addToSet: { likes: req.params.id } };

    const updatedUser = await User.findByIdAndUpdate(
      req.body.user._id,
      updateOperation,
      { new: true }
    );

    res.json({ message: "Like toggled successfully", user: updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating card", error: error.message });
    next(error);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).send();
    }
    if (card.user_id.toString() !== req.userId && !req.isAdmin) {
      return res.status(403).json({
        message: "Only the user created the card or admin can delete the card",
      });
    }

    await Card.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Card deleted successfully", card });
  } catch (error) {
    res.status(500).send(err.message);
    next(error);
  }
};

module.exports = {
  getAllCards,
  getUserCards,
  getCard,
  createCard,
  updateCard,
  deleteCard,
  likeCard,
};
