import { Box, Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import SciCollabLogo from "../../../assets/images/sci-collab.svg";

const Header: React.FC = () => {
  const classes = useStyles();

  return (
    <Box my={15}>
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Typography
          variant="h3"
          align="center"
          mb={8}
          gutterBottom
          color="#00796b"
          fontWeight={700}
        >
          Accelerate change through independent scientific collaboration
        </Typography>

        <Grid container>
          <Grid item xs={12} md={6}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              height="100%"
            >
              <Typography variant="h5" fontWeight={600} paragraph>
                We think that Science is essential to alert, <br /> comprehend,
                explain and find solutions in response to <br /> the global
                environmental crisis.
              </Typography>

              <Typography variant="body1" fontWeight={400} paragraph>
                SciFor Earth facilitates collaboration with independent
                scientists for projects
                <br /> that respond to environmental crisis.
                <br />
                <br />
                NGOs, academic independent researchers, or other actors such as
                <br />
                governmental agencies can <strong>ask a question</strong>, start
                an <strong>open discussion</strong> or <br />
                submit a <strong>collaboration request</strong> (for a new
                project, a single experiment to <br />
                realize, a partnership for a funding, ...).
                <br />
                <br />
                Anyone with a <strong>
                  validated professional profile
                </strong>{" "}
                can respond and be advised
                <br /> when a relevant collaboration request, discussion or
                question is submitted.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              height="100%"
            >
              <img
                src={SciCollabLogo}
                alt="SciCollab"
                className={classes.headerImage}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Header;

const useStyles = makeStyles({
  headerImage: {
    width: "100%",
    height: "auto",
  },
});
