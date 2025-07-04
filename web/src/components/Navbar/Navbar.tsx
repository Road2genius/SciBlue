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
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useSnackbar } from "notistack";
import { logoutUser } from "../../actions/auth/auth";
import { getAvatar } from "./avatar";
import { useI18n } from "../../context/I18nContext";
import { Trans, useTranslation } from "react-i18next";
import FlagComponent from "../FlagComponent/FlagComponent";

const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate: NavigateFunction = useNavigate();
  const { userContext, setUserContext } = useUserContext();
  const location = useLocation();
  const [activePage, setActivePage] = useState(location.pathname);
  useTranslation();
  const i18n = useI18n();

  const buttons: {
    name: string;
    path: string;
  }[] = [
    { name: "navbar_home", path: "/" },
    { name: "navbar_questions", path: "/discussions/list" },
    { name: "navbar_requests", path: "/request/list" },
    { name: "navbar_community", path: "/community" },
  ];

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
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
        SciBlue
      </Typography>

      <List>
        {buttons.map((button, index) => (
          <ListItem
            divider
            key={index}
            onClick={() => {
              setActivePage(button.path);
              navigate(button.path);
            }}
          >
            <ListItemButton>
              <ListItemText
                primary={<Trans i18nKey={button.name} />}
                sx={{
                  fontWeight: "bold",
                  color: activePage === button.path ? "#008080" : "primary",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const handleNavigateNavBar = (buttonPath: string) => {
    setActivePage(buttonPath);
    navigate(buttonPath);
  };

  const handleLanguageChange = (checked: boolean) => {
    const newLanguage = checked ? "fr" : "en";
    i18n.changeLanguage(newLanguage);
  };

  return (
    <AppBar position="sticky" color="default" sx={{ borderBottom: "1px solid #e0e0e0" }}>
      <Toolbar>
        <Box display="flex" flexDirection="column">
          <Typography
            variant="h6"
            fontWeight={800}
            sx={{ flexGrow: 1, color: "#00796b", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            SciBlue
          </Typography>
          <Typography variant="subtitle1" mt={-1} color="gray">
            <Trans i18nKey="sciblue_slogan" />
          </Typography>
        </Box>
        <Box
          ml={1}
          sx={{
            display: { xs: "none", md: "flex" },
            flexGrow: 1,
            justifyContent: "center",
          }}
        >
          {buttons.map((button) => (
            <Button
              key={button.name}
              color="inherit"
              onClick={() => handleNavigateNavBar(button.path)}
              sx={{
                textTransform: "none",
                mx: 1,
                fontWeight: "bold",
                color: activePage === button.path ? "#008080" : "primary",
              }}
            >
              <Trans i18nKey={button.name} />
            </Button>
          ))}
        </Box>
        <Button
          color="inherit"
          onClick={() => handleNavigateNavBar("/feedback")}
          sx={{
            textTransform: "none",
            mr: 2,
            ml: -10,
            fontWeight: "bold",
            color: activePage === "/feedback" ? "#008080" : "primary",
          }}
        >
          <Trans i18nKey="navbar_feedback" />
        </Button>
        <Box display="flex" mr={2} alignItems="center">
          <FlagComponent langI18n countryCode="GB" />
          <Switch
            checked={i18n.language === "fr"}
            onChange={(e) => handleLanguageChange(e.target.checked)}
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: "#008080",
              },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                backgroundColor: "#008080",
              },
            }}
          />
          <FlagComponent langI18n countryCode="FR" />
        </Box>
        {userContext ? (
          <>
            <Avatar
              src={getAvatar(userContext.avatar)}
              alt="User Avatar"
              sx={{ cursor: "pointer" }}
              onClick={(e) => setAnchorEl(e.currentTarget)}
            />
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
              <MenuItem
                divider
                onClick={() => {
                  navigate(`/user/profile/${userContext.userId}`);
                  setAnchorEl(null);
                }}
              >
                <Box mr={1}>
                  <ManageAccountsOutlinedIcon sx={{ color: "#008080" }} />
                </Box>
                <Typography variant="subtitle1" sx={{ marginTop: "-3px" }}>
                  <Trans i18nKey="navbar_profile" />
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Box mr={1}>
                  <LogoutOutlinedIcon sx={{ color: "#008080" }} />
                </Box>
                <Typography variant="subtitle1" sx={{ marginTop: "-3px" }}>
                  <Trans i18nKey="navbar_logout" />
                </Typography>
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button
              variant="contained"
              sx={{
                display: { xs: "none", md: "block" },
                textTransform: "none",
                color: "#000",
                borderRadius: "10px",
                borderColor: "#000",
                backgroundColor: "inherit",
                "&:hover": {
                  borderColor: "#00796b",
                  backgroundColor: "#00796b",
                  color: "#fff",
                },
              }}
              onClick={() => navigate("/login")}
            >
              <Trans i18nKey="navbar_login" />
            </Button>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton color="inherit" aria-label="open drawer" edge="end" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
            </Box>
          </>
        )}
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          {list}
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
