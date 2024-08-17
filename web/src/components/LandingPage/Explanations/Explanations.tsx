import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import CommunityImage from "../../../assets/images/community.svg";

const Explications: React.FC = () => {
  const classes = useStyles();

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
                A community
              </Typography>
              <Typography variant="body1" paragraph>
                We aspire to a platform where{" "}
                <strong>all active players</strong> who contribute to or aspire
                to be part of the environmental solution can{" "}
                <strong>
                  easily connect, share ideas, and innovate together.
                </strong>
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
                  Explore our community
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
                  Create your profile
                </Button>
              </Box>

              <Box display="flex" flexDirection="column" mt={2}>
                <Typography variant="h6" fontWeight={700} paragraph>
                  Contribute to the interface!
                </Typography>

                <Typography variant="body1" paragraph>
                  Our project is resolutely collaborative. Your{" "}
                  <strong>feedback and suggestions</strong> will be continuously
                  integrated to improve the platform and make it as useful as
                  possible for you.
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
                Help us improve
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
