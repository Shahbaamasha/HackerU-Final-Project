import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        boxShadow: "0 -4px 8px rgba(0, 0, 0, 0.2)", // Top shadow effect
        padding: "1rem",
        textAlign: "center",
        backgroundColor: "white",
        position: "fixed",
        bottom: 0,
        width: "100%",
      }}
    >
      <Typography variant="body2" color="primary.main" align="center">
        © 2024 Card App. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
