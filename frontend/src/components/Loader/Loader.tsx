import { Backdrop, Box, CircularProgress } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../store/hooks/useRedux";

function Loader() {
  const userLoading = useAppSelector((state) => state.user.loading);
  const cardLoading = useAppSelector((state) => state.cards?.loading);
  const authLoading = useAppSelector((state) => state.auth?.loading);
  
  return (
    <Box>
      <Backdrop
        open={userLoading || cardLoading || authLoading}
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <CircularProgress size={100} color="inherit" />
      </Backdrop>
    </Box>
  );
}

export default Loader;
