import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import ExplanationImage from "../../../assets/images/explanation.svg";

const Explications: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Container maxWidth="xl" sx={{ marginY: "40px" }}>
        <Grid container>
          <Grid
            item
            xs={12}
            md={4}
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Typography
              variant="h4"
              color="#CDE6D1"
              fontWeight={700}
              className={classes.test}
            >
              For who and for what ?<br /> Use cases
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box>
              <Typography
                variant="body1"
                color="#DAD7CD"
                fontStyle="italic"
                paragraph
              >
                You are an NGO and need to find an available and motivated
                academic independent expert about air pollution?
              </Typography>
              <Typography
                variant="body1"
                color="#DAD7CD"
                fontStyle="italic"
                paragraph
              >
                You are a researcher and need to find a NGO or a private actor
                to apply to a specific grant for projects linked to <br />
                climate change?
              </Typography>
              <Typography
                variant="body1"
                color="#DAD7CD"
                fontStyle="italic"
                paragraph
              >
                You are an NGO and need an explanation about a scientific method
                used to measure the decline of the bee
                <br /> population?
              </Typography>
              <Typography
                variant="body1"
                color="#DAD7CD"
                fontStyle="italic"
                mb={3}
              >
                You are a researcher and need to find quickly a collaborator
                with a specific skill that can conduct a one-time
                <br /> experiment?
              </Typography>
              <Typography
                variant="body1"
                color="#DAD7CD"
                fontWeight={600}
                paragraph
              >
                ... Whatever is your need, submit a collaboration request or
                simply start an open discussion
              </Typography>
              <Box display="flex" justifyContent="center">
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
                  Start a discussion
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
                  Submit a request
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid container mt={10}>
          <Grid item xs={12} md={8}>
            <Box display="flex" flexDirection="column">
              <Typography
                variant="body1"
                color="#DAD7CD"
                fontStyle="italic"
                paragraph
              >
                You are a researcher and your laboratory is open to work with
                NGOs on a specific area?
              </Typography>
              <Typography
                variant="body1"
                color="#DAD7CD"
                fontStyle="italic"
                paragraph
              >
                Your organization is open to fund academic research projects
                linked to environmental crises?
              </Typography>
              <Typography
                variant="body1"
                color="#DAD7CD"
                fontStyle="italic"
                paragraph
              >
                You are open to be contacted to be a partner to apply for a
                grant on a new research project?
              </Typography>
              <Typography
                variant="body1"
                color="#DAD7CD"
                fontStyle="italic"
                paragraph
              >
                Your laboratory has a specific murine model or you are a flow
                cytometry expert and are willing to be
                <br /> advised when a need is posted?
              </Typography>
              <Typography
                variant="body1"
                color="#DAD7CD"
                fontStyle="italic"
                paragraph
              >
                Overall, you are a professional and believe that your skills can
                be useful for any projects that <br /> responds to environmental
                crisis?
              </Typography>
              <Typography
                variant="body1"
                color="#DAD7CD"
                fontWeight={600}
                paragraph
              >
                ... Whatever is your case, create your profile
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  alignSelf: "center",
                  textTransform: "none",
                  fontWeight: 700,
                  borderRadius: "8px",
                  height: "50px",
                  backgroundColor: "#008080",
                  "&:hover": {
                    backgroundColor: "#006666",
                  },
                  marginTop: "30px",
                }}
              >
                Create your profile
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box>
              <img src={ExplanationImage} alt="Explanation image" />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Explications;

const useStyles = makeStyles({
  root: {
    backgroundColor: "#22423D",
    color: "#FFFFFF",
    padding: "40px 0",
    marginTop: "40px",
  },
  test: {
    color: "#ecf0f1",
    fontSize: "1.5em",
    fontWeight: "600",
    textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
});
