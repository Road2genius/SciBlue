import { Avatar, Box, Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import Antoine from "../../../assets/images/antoine.svg";
import Caroline from "../../../assets/images/caroline.svg";
import { Trans, useTranslation } from "react-i18next";

const AboutUs: React.FC = () => {
  const classes = useStyles();
  useTranslation();

  const teamArray: {
    avatar: string;
    name: string;
    bio: string;
  }[] = [
    {
      avatar: Antoine,
      name: "landing_team_antoine_name",
      bio: "landing_team_antoine_bio",
    },
    {
      avatar: Caroline,
      name: "landing_team_caroline_name",
      bio: "landing_team_caroline_bio",
    },
   
  ];

  return (
    <Box bgcolor="#E6EEE8" p={2} mt={15} pb={5}>
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
          <Typography variant="h6" fontWeight={600}>
            <Trans i18nKey="landing_about_us_title"/>
          </Typography>

          <Typography variant="body1">
            <Trans i18nKey="landing_about_us_text"/>
          </Typography>

          <Box display="flex" mt={2}>
            <Grid container gap={2} spacing={10} justifyContent="center">
              {teamArray.map((team, index) => (
                <Grid item md={5} key={index}>
                  <Box display="flex">
                    <Avatar
                      src={team.avatar}
                      sx={{ width: 100, height: 100, marginRight: "10px" }}
                    />
                    <Box display="flex" flexDirection="column">
                      <Typography variant="h6" fontStyle="italic">
                        <Trans i18nKey={team.name} />
                      </Typography>
                      <Typography variant="body1" fontStyle="italic">
                        <Trans i18nKey={team.bio} />
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutUs;

const useStyles = makeStyles({
  root: {
    marginTop: "40px",
    display: "flex",
    flexDirection: "column",
    margin: "auto",
  },
});
