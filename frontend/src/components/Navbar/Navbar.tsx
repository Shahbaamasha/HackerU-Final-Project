import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TextField,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  InputAdornment,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { NavbarSx } from "../../styles/sxStyles";
import { useAppDispatch, useAppSelector } from "../../store/hooks/useRedux";
import { logout } from "../../store/auth/authSlice";
import { clearCard, setSearch } from "../../store/cards/cardsSlice";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import { setUser } from "../../store/user/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
    dispatch(setSearch(e.target.value))
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setUser(null));
    dispatch(clearCard());
    navigate("/");
  };

  return (
    <AppBar
      position="sticky"
      sx={{ background: "radial-gradient(circle, #90caf9, #1e88e5, #0d47a1)" }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Card App
        </Typography>
        <TextField
          variant="standard"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for cards"
          sx={NavbarSx.search_input}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton sx={{ color: "white" }}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {user ? (
          <>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
            <ProfileMenu user={user} />
          </>
        ) : (
          <>
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Link
              to="/sign-up"
              style={{ color: "white", fontFamily: "cursive" }}
            >
              Signup
            </Link>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
