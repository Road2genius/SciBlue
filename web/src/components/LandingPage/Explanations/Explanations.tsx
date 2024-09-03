import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import CommunityImage from "../../../assets/images/community.svg";
import { Trans, useTranslation } from "react-i18next";

const Explications: React.FC = () => {
  const classes = useStyles();
  useTranslation();

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
        <Grid container gap={5}>
          <Grid
            item
            xs={12}
            md={6}
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <img
              src={CommunityImage}
              alt="Community Image"
              style={{
                width: "97.4%",
                height: "auto",
                marginBottom: "1rem",
              }}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <Box display="flex" flexDirection="column" mt={2}>
              <Typography variant="h6" fontWeight={700} paragraph>
                <Trans i18nKey="landing_explantion_title"/>
              </Typography>
              <Typography variant="body1" paragraph>
                <Trans i18nKey="landing_explanation_text"/>
              </Typography>
              <Box display="flex" justifyContent="flex-end" mt={2} mb={4}>
                <Button
                  variant="contained"
                  color="primary"
                  href="/community"
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
                  <Trans i18nKey="landing_explanation_button_action_community"/>
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  href="/signup"
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
                  <Trans i18nKey="landing_button_create_profile"/>
                </Button>
              </Box>

              <Box display="flex" flexDirection="column" mt={2}>
                <Typography variant="h6" fontWeight={700} paragraph>
                  <Trans i18nKey="landing_explantion_second_title"/>
                </Typography>

                <Typography variant="body1" paragraph>
                  <Trans i18nKey="landing_explanation_second_text"/>
                </Typography>
              </Box>
            </Box>
            <Box display="flex" justifyContent="flex-end" my={1}>
              <Button
                variant="contained"
                color="primary"
                href="/feedback"
                sx={{
                  borderRadius: "8px",
                  textTransform: "none",
                  minWidth: "171px",
                  height: "50px",
                  fontWeight: 700,
                  backgroundColor: "#008080",
                  "&:hover": {
                    backgroundColor: "#006666",
                  },
                }}
              >
                <Trans i18nKey="landing_explanation_button_action_feedback"/>
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Explications;

const useStyles = makeStyles({
  root: {
    marginTop: "40px",
    display: "flex",
    flexDirection: "column",
    margin: "auto",
  },
});
