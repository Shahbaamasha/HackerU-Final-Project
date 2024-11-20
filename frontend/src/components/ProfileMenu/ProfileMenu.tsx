import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Switch,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserType } from "../../types/User.type";
import { useAppDispatch } from "../../store/hooks/useRedux";
import { deleteUser, toggleIsBusiness } from "../../store/user/userThunk";
import { useNavigate } from "react-router-dom";

const ProfileMenu = ({ user }: { user: UserType }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleToggleBusiness = () => {
    dispatch(toggleIsBusiness(user));
  };
  const handleEditUser = () => {
    navigate("/sign-up");
  };

  const handleDeleteUser = () => {
    if (!user) return;
    dispatch(deleteUser(user._id as string));
  };

  const handleManageUsers = () => {
    navigate("/all-users");
  };

  return (
    <div>
      <IconButton
        aria-label="account menu"
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        onClick={handleMenuOpen}
      >
        <AccountCircleIcon />
      </IconButton>
      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 3,
        }}
      >
        <MenuItem disabled>
          <Typography variant="subtitle1">
            Welcome, {`${user.name.first} ${user.name.last}`}
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Switch
              checked={user.isBusiness}
              onChange={handleToggleBusiness}
              inputProps={{ "aria-label": "Toggle Business Account" }}
            />
          </ListItemIcon>
          <ListItemText>
            {user.isBusiness ? "Business Account" : "Personal Account"}
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={handleEditUser }>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText>Edit Profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDeleteUser}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText>Delete Account</ListItemText>
        </MenuItem>
        {user.isAdmin && (
          <MenuItem onClick={handleManageUsers}>
            <ListItemText>Manage Users</ListItemText>
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default ProfileMenu;
