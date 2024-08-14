import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { avatars, getAvatarKey } from "./avatar";
import { useSnackbar } from "notistack";
import { logoutUser } from "../../actions/auth/auth";

const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate: NavigateFunction = useNavigate();
  const { userContext, setUserContext } = useUserContext();

  const buttons: {
    name: string;
    onClick: () => void;
  }[] = [
    { name: "Home", onClick: () => navigate("/") },
    { name: "Discussions", onClick: () => console.log("Discussions") },
    { name: "Request", onClick: () => navigate("/request/list") },
    { name: "Community", onClick: () => navigate("/community") },
    { name: "Send feedback", onClick: () => navigate("/feedback") },
  ];

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  const handleLogout = async () => {
    if (userContext?.userId) {
      await logoutUser(userContext?.userId);
    }
    setUserContext(null);
    enqueueSnackbar("Logout successful", { variant: "warning" });
    navigate("/login");
    setAnchorEl(null);
  };

  const list: JSX.Element = (
    <Box
      display="flex"
      flexDirection="column"
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Typography
        variant="h6"
        sx={{
          flexGrow: 1,
          color: "#00796b",
          fontWeight: "bold",
          marginLeft: "30px",
        }}
      >
        SciForEarth
      </Typography>
      <List>
        {buttons.map((button, index) => (
          <ListItem key={index} onClick={button.onClick}>
            <ListItemButton>
              <ListItemText primary={button.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="static"
      color="default"
      sx={{ borderBottom: "1px solid #e0e0e0" }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          fontWeight={800}
          sx={{ flexGrow: 1, color: "#00796b", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          SciForEarth
        </Typography>
        <Box sx={{ display: { xs: "none", md: "flex" }, flexGrow: 1 }}>
          {buttons.map((button) => (
            <Button
              key={button.name}
              color="inherit"
              onClick={button.onClick}
              sx={{ textTransform: "none", mx: 1 }}
            >
              {button.name}
            </Button>
          ))}
        </Box>
        {userContext ? (
          <>
            <Avatar
              src={avatars[getAvatarKey(userContext.avatar)]}
              alt="User Avatar"
              sx={{ cursor: "pointer" }}
              onClick={(e) => setAnchorEl(e.currentTarget)}
            ></Avatar>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem
                onClick={() => {
                  navigate("/profile");
                  setAnchorEl(null);
                }}
              >
                Profile Information
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button
              variant="outlined"
              sx={{
                display: { xs: "none", md: "block" },
                textTransform: "none",
                color: "#000",
                borderRadius: "10px",
                borderColor: "#000",
                "&:hover": {
                  borderColor: "#00796b",
                  backgroundColor: "#00796b",
                  color: "#fff",
                },
              }}
              onClick={() => navigate("/login")}
            >
              Login & Signup
            </Button>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              {list}
            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
