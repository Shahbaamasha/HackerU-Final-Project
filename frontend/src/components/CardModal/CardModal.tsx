import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Modal,
  Grid,
  InputAdornment,
  Typography,
  IconButton,
} from "@mui/material";
import { useFormik } from "formik";
import { CardType } from "../../types/Card.type";
import { cardSchema } from "../../validation/cardSchema";
import { GeneralModal } from "../../styles/sxStyles";
import { useAppDispatch, useAppSelector } from "../../store/hooks/useRedux";
import { addCard, updateCard } from "../../store/cards/cardsThunk";
import CloseIcon from "@mui/icons-material/Close";
import BackToHomeButton from "../BackToHomeButton/BackToHomeButton";
import { enqueueSnackbar } from "notistack";

const CardModal: React.FC<{
  open: boolean;
  onClose: () => void;
  initialValues: CardType | null;
}> = ({ open, onClose, initialValues }) => {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.cards.error);

  const formik = useFormik<CardType>({
    initialValues: initialValues || {
      title: "",
      subtitle: "",
      description: "",
      phone: "",
      email: "",
      web: "",
      image: { url: "", alt: "" },
      address: {
        state: "",
        country: "",
        city: "",
        street: "",
        houseNumber: "",
      },
    },
    validationSchema: cardSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const resultAction = !initialValues
          ? await dispatch(addCard(values)).unwrap()
          : await dispatch(updateCard(values)).unwrap();
        if (resultAction.success) {
          onClose();
        }
      } catch (err: any) {
        enqueueSnackbar(err, { variant: 'error' });
        console.log(err);
      }
    },
  });

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={GeneralModal.modal_container}>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <h2>{initialValues ? "Edit Card" : "Add New Card"}</h2>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <Box
          component="form"
          sx={{ height: 350, overflowY: "auto" }}
          onSubmit={formik.handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
            </Grid>

            {/* Subtitle */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Subtitle"
                name="subtitle"
                value={formik.values.subtitle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.subtitle && Boolean(formik.errors.subtitle)
                }
                helperText={formik.touched.subtitle && formik.errors.subtitle}
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
            </Grid>

            {/* Phone */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+</InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>

            {/* Web URL */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Website URL"
                name="web"
                value={formik.values.web}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.web && Boolean(formik.errors.web)}
                helperText={formik.touched.web && formik.errors.web}
              />
            </Grid>

            {/* Image URL */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Image URL"
                name="image.url"
                value={formik.values.image.url}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.image?.url && Boolean(formik.errors.image?.url)
                }
                helperText={
                  formik.touched.image?.url && formik.errors.image?.url
                }
              />
            </Grid>

            {/* Image Alt */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Image Alt Text"
                name="image.alt"
                value={formik.values.image.alt}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.image?.alt && Boolean(formik.errors.image?.alt)
                }
                helperText={
                  formik.touched.image?.alt && formik.errors.image?.alt
                }
              />
            </Grid>

            {/* Address */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="State"
                name="address.state"
                value={formik.values.address.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.address?.state &&
                  Boolean(formik.errors.address?.state)
                }
                helperText={
                  formik.touched.address?.state && formik.errors.address?.state
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Country"
                name="address.country"
                value={formik.values.address.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.address?.country &&
                  Boolean(formik.errors.address?.country)
                }
                helperText={
                  formik.touched.address?.country &&
                  formik.errors.address?.country
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="City"
                name="address.city"
                value={formik.values.address.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.address?.city &&
                  Boolean(formik.errors.address?.city)
                }
                helperText={
                  formik.touched.address?.city && formik.errors.address?.city
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Street"
                name="address.street"
                value={formik.values.address.street}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.address?.street &&
                  Boolean(formik.errors.address?.street)
                }
                helperText={
                  formik.touched.address?.street &&
                  formik.errors.address?.street
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="House Number"
                name="address.houseNumber"
                value={formik.values.address.houseNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.address?.houseNumber &&
                  Boolean(formik.errors.address?.houseNumber)
                }
                helperText={
                  formik.touched.address?.houseNumber &&
                  formik.errors.address?.houseNumber
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
              >
                {initialValues ? "Edit Card" : "Add Card"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};

export default CardModal;
