import React from "react";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CollaborationScientistImage from "../../../assets/images/collaboration-scientist.svg";
import EnvironmentalImage from "../../../assets/images/header.svg";
import Sphere from "../../../assets/images/sphere.svg";
import { Trans, useTranslation } from "react-i18next";

const Header: React.FC = () => {
  const classes = useStyles();
  useTranslation();

  const headerArray: {
    icon: JSX.Element;
    text: string;
    subtitle: string;
  }[] = [
    {
      icon: <DoneRoundedIcon />,
      text: "landing_header_reliable_profiles",
      subtitle: "landing_header_reliable_profiles_subtitle",
    },
    {
      icon: <DoneRoundedIcon />,
      text: "landing_header_privacy_mode",
      subtitle: "landing_header_privacy_mode_subtitle",
    },
    {
      icon: <DoneRoundedIcon />,
      text: "landing_header_free_of_charge",
      subtitle:
        "landing_header_free_of_charge_subtitle",
    },
    {
      icon: <DoneRoundedIcon />,
      text: "landing_header_scientists_speak_for_themselves",
      subtitle:
        "landing_header_scientists_speak_for_themselves_subtitle",
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
          <Trans i18nKey="landing_main_title"/>
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
                    <Trans i18nKey="landing_button_create_profile"/>
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item md={1} />
            <Grid item xs={12} md={5}>
              <Typography variant="h6" mb={4}>
                <Trans i18nKey="landing_title_header_section"/>
              </Typography>
              <Box component="span" fontWeight="bold" display="flex" mt={2}>
                <img src={Sphere} alt="Sphere" style={{ marginRight: "5px" }} />
                <Typography variant="body1">
                  <Trans i18nKey="landing_first_bullet_point_text"/>
                </Typography>
              </Box>
              <Box component="span" fontWeight="bold" display="flex" mb={2}>
                <img src={Sphere} alt="Sphere" style={{ marginRight: "5px" }} />
                <Typography variant="body1" mt={2.5}>
                  <Trans i18nKey="landing_second_bullet_point_text"/>
                </Typography>
              </Box>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                <Trans i18nKey="landing_subtitle_header"/>
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
                  <Trans i18nKey="landing_button_action_questions"/>
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
                  <Trans i18nKey="landing_button_action_request"/>
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
                  <Trans i18nKey="landing_header_commitments_title"/>
                </Typography>
                {headerArray.map((header) => (
                  <Box key={header.text} display="flex" gap={1} mb={1}>
                    <DoneRoundedIcon color="success" />
                    <Typography variant="body1">
                      <Trans i18nKey={header.text}/>
                      <Trans i18nKey={header.subtitle}/>
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
