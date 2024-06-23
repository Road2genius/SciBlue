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
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const buttons: {
    name: string;
    onClick: () => void;
  }[] = [
    { name: "Home", onClick: () => console.log("Home") },
    { name: "Why SciWithMe?", onClick: () => console.log("Why SciWithMe?") },
    {
      name: "Send your feedback",
      onClick: () => console.log("Send your feedback"),
    },
    { name: "Log in", onClick: () => console.log("Log in") },
  ];

  const toggleDrawer =
    (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent): void => {
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
      sx={{
        width: 250,
        backgroundColor: "#CADEE7",
        height: "100%",
      }}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {buttons.map((buttonLabel, index) => (
          <ListItem key={index}>
            <ListItemButton onClick={buttonLabel.onClick}>
              <ListItemText primary={buttonLabel.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#CADEE7", boxShadow: "none" }}
    >
      <Container maxWidth="xl">
        <Toolbar>
          <Box display="flex" flexDirection="column">
            <Typography variant="h5" color="#305B8D" fontWeight={800}>
              SciWithMe
            </Typography>
            <Typography variant="body1" color="#464D49">
              Accelerate Research Through Collaboration
            </Typography>
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              ml: "auto",
            }}
          >
            {buttons.map((buttonLabel) => (
              <Button
                key={buttonLabel.name}
                color="inherit"
                onClick={buttonLabel.onClick}
                sx={{ textTransform: "none", color: "#000", fontSize: "16px" }}
              >
                {buttonLabel.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" }, ml: "auto" }}>
            <IconButton
              aria-label="open drawer"
              edge="start"
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
