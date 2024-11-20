import React from "react";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const BackToHomeButton = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <IconButton
      onClick={handleBackClick}
      color="primary"
      sx={{
        position: "absolute",
        top: 16,
        left: 16,
        zIndex: 10,
      }}
    >
      <ArrowBackIcon />
    </IconButton>
  );
};

export default BackToHomeButton;
