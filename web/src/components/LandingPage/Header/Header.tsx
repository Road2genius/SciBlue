import React from "react";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CollaborationScientistImage from "../../../assets/images/collaboration-scientist.svg";
import EnvironmentalImage from "../../../assets/images/header.svg";
import Sphere from "../../../assets/images/sphere.svg";

const Header: React.FC = () => {
  const classes = useStyles();

  const headerArray: {
    icon: JSX.Element;
    text: string;
    subtitle: string;
  }[] = [
    {
      icon: <DoneRoundedIcon />,
      text: "Reliable profiles: ",
      subtitle: "all profiles are verified",
    },
    {
      icon: <DoneRoundedIcon />,
      text: "Privacy mode for scientists: ",
      subtitle: "if you want, you can stay anonymous on the platform",
    },
    {
      icon: <DoneRoundedIcon />,
      text: "Free of charge and no data reuse: ",
      subtitle:
        "we want to make a free for all platform, this is why you have adds on the site. Those are carefully chosen",
    },
    {
      icon: <DoneRoundedIcon />,
      text: "Scientists speak for themselves: ",
      subtitle:
        "researchers on this platform create a personal profile. Their statements do not represent the view of their institution",
    },
  ];

  return (
    <Container maxWidth="xl">
      <Box
        className={classes.root}
        sx={{
          minWidth: {
            xs: "100%",
            sm: "100%",
            md: "100%",
            lg: "100%",
            xl: "1200px",
          },
        }}
      >
        <Typography
          variant="h3"
          mb={8}
          mt={2}
          color="#00796b"
          fontWeight={600}
          align="center"
        >
          SciBlue facilitates collaboration between all active players in <br />
          environmental crisis
        </Typography>
        <Box>
          <Grid container spacing={5} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ position: "relative", textAlign: "center" }}>
                <img
                  src={CollaborationScientistImage}
                  alt="Collaboration Scientist"
                  style={{
                    width: "100%",
                    height: "auto",
                    marginBottom: "1rem",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    href="/signup"
                    sx={{
                      borderRadius: "8px",
                      textTransform: "none",
                      height: "60px",
                      fontWeight: 700,
                      backgroundColor: "#008080",
                      "&:hover": {
                        backgroundColor: "#006666",
                      },
                    }}
                  >
                    Create your profile
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item md={1} />
            <Grid item xs={12} md={5}>
              <Typography variant="h6" mb={4}>
                Scientists, NGOs and associations, governmental agencies,
                private researchers organization, ... all around the world can:
              </Typography>
              <Box component="span" fontWeight="bold" display="flex" mt={2}>
                <img src={Sphere} alt="Sphere" style={{ marginRight: "5px" }} />

                <Typography variant="body1">
                  start an <strong>open discussion or ask a question</strong>
                </Typography>
              </Box>
              <Box component="span" fontWeight="bold" display="flex" mb={2}>
                <img src={Sphere} alt="Sphere" style={{ marginRight: "5px" }} />

                <Typography variant="body1" mt={2.5}>
                  <strong>submit a collaboration request</strong> (for a new
                  project, a single
                  <br /> experiment to conduct, a partnership for a funding,
                  ...)
                </Typography>
              </Box>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                ... to the SciBlue community.
              </Typography>
              <Box
                mt={8}
                sx={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  href="/discussions/list"
                  sx={{
                    borderRadius: "8px",
                    textTransform: "none",
                    height: "50px",
                    fontWeight: 700,
                    backgroundColor: "#008080",
                    "&:hover": {
                      backgroundColor: "#006666",
                    },
                    marginRight: "8px",
                  }}
                >
                  Discussions & Questions
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  href="/request/list"
                  sx={{
                    borderRadius: "8px",
                    textTransform: "none",
                    height: "50px",
                    fontWeight: 700,
                    backgroundColor: "#008080",
                    "&:hover": {
                      backgroundColor: "#006666",
                    },
                    marginRight: "50px",
                  }}
                >
                  Requests
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ padding: "3rem" }} my={5}>
          <Grid container gap={20}>
            <Grid item xs={12} md={5}>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                <Typography variant="h5" fontWeight={600} paragraph>
                  Our commitments
                </Typography>
                {headerArray.map((header) => (
                  <Box key={header.text} display="flex" gap={1} mb={1}>
                    <DoneRoundedIcon color="success" />
                    <Typography variant="body1">
                      <strong>{header.text}</strong>
                      {header.subtitle}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                <img
                  src={EnvironmentalImage}
                  loading="lazy"
                  alt="Header Image"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Header;

const useStyles = makeStyles({
  root: {
    marginTop: "40px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    margin: "auto",
  },
});
