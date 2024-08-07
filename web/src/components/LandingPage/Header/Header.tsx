import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import CollaborationScientistImage from "../../../assets/images/collaboration-scientist.svg";
import HeaderImage from "../../../assets/images/header.svg";
import Sphere from "../../../assets/images/sphere.svg";

const Header: React.FC = () => {
  // const classes = useStyles();

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
    <Box my={15}>
      <Container maxWidth="xl" sx={{ mt: 2 }}>
        <Typography
          variant="h3"
          mb={8}
          gutterBottom
          color="#00796b"
          fontWeight={600}
          align="center"
        >
          SciBlue facilitates collaboration between all active players in <br />
          environmental crisis
        </Typography>

        <Box sx={{ padding: "2rem" }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={5}>
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
                    top: "45%",
                    left: "40%",
                    textAlign: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      borderRadius: "8px",
                      textTransform: "none",
                      height: "50px",
                      fontWeight: 700,
                      backgroundColor: "#008080",
                      "&:hover": {
                        backgroundColor: "#006666",
                      },
                      marginRight: "30px",
                    }}
                  >
                    Create your profile
                  </Button>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={5}>
              <Typography variant="h6" gutterBottom>
                Scientists, NGOs and associations, governmental agencies,
                private researchers organization, ... all around the world can:
              </Typography>

              <Box component="span" fontWeight="bold" display="flex" mt={2}>
                <img src={Sphere} alt="Sphere" style={{ marginRight: "5px" }} />

                <Typography variant="body2">
                  start an <strong>open discussion or ask a question</strong>
                </Typography>
              </Box>

              <Box component="span" fontWeight="bold" display="flex" mb={2}>
                <img src={Sphere} alt="Sphere" style={{ marginRight: "5px" }} />

                <Typography variant="body2">
                  <strong>submit a collaboration request</strong> (for a new
                  project, a single experiment to conduct, a partnership for a
                  funding, ...)
                </Typography>
              </Box>

              <Typography variant="h6" fontWeight="bold" gutterBottom>
                ... to the SciBlue community.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: "1rem",
                  marginTop: "1rem",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    borderRadius: "8px",
                    textTransform: "none",
                    height: "50px",
                    fontWeight: 700,
                    backgroundColor: "#008080",
                    "&:hover": {
                      backgroundColor: "#006666",
                    },
                  }}
                >
                  Discussions & Questions
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    borderRadius: "8px",
                    textTransform: "none",
                    height: "50px",
                    fontWeight: 700,
                    backgroundColor: "#008080",
                    "&:hover": {
                      backgroundColor: "#006666",
                    },
                  }}
                >
                  Requests
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Grid container gap={15}>
          <Grid item xs={12} md={6}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              height="100%"
            >
              <Typography variant="h5" fontWeight={600} paragraph>
                Our commitments
              </Typography>

              {headerArray.map((header) => (
                <Box
                  key={header.text}
                  display="flex"
                  alignItems="center"
                  gap={1}
                  mb={1}
                  flexWrap="wrap"
                >
                  <DoneRoundedIcon color="success" />

                  <Typography variant="body1" fontWeight={600}>
                    {header.text}
                  </Typography>

                  <Typography variant="body1">{header.subtitle}</Typography>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              height="100%"
            >
              {/* <img
                src={HeaderImage}
                loading="lazy"
                alt="Header Image"
                className={classes.headerImage}
              /> */}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Header;

// const useStyles = makeStyles({
//   headerImage: {
//     width: "100%",
//     height: "auto",
//   },
// });
