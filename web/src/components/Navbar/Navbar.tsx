import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const buttons: {
    name: string;
    onClick: () => void;
  }[] = [
    { name: "Home", onClick: () => console.log("Home") },
    { name: "Discussions", onClick: () => console.log("Discussions") },
    { name: "Request", onClick: () => console.log("Request") },
    { name: "Community", onClick: () => console.log("Community") },
    { name: "Send feedback", onClick: () => console.log("Send feedback") },
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
      <Container maxWidth="xl">
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, color: "#00796b", fontWeight: "bold" }}
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
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
