import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const Header: React.FC = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography
        variant="h3"
        align="center"
        mb={8}
        gutterBottom
        color="#305B8D"
        fontWeight={700}
      >
        SciWithMe is the matchmaker to start your next collaborative project
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            height="100%"
          >
            <Typography variant="h6" fontStyle="italic" paragraph>
              "With SciWithMe, private companies, public research laboratories,
              or other actors such as NGOs can submit a request of collaboration
              (for a new project, a single experiment to realize, a partnership
              for a funding, ...), <br />
              <br /> and anyone with an active profile can be advised when a
              relevant collaboration request is submit."
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box className={classes.verticalBar}>
            <Typography variant="body1" paragraph>
              You are a researcher and need to find quickly a collaborator with
              a specific skill that can conduct a one-time experiment? You are
              an ONG and need to find a public and independent expert about
              climate change or air pollution? You are a private cosmetic
              company and you need to evaluate the skin absorption of your last
              face moisturizer? You are a researcher and need a product to
              finalize an experiment in response to your reviewer? ...{" "}
              <strong>What ever is your need, submit a request</strong>
            </Typography>

            <Button
              variant="contained"
              color="primary"
              style={{
                alignSelf: "flex-end",
                textTransform: "none",
                fontWeight: 700,
              }}
            >
              Submit a request
            </Button>
          </Box>

          <Box className={classes.verticalBar}>
            <Typography variant="body1" paragraph>
              Your laboratory has a specific murine model or you are a flow
              cytometry expert and are willing to be advised when a need is
              posted? You are open to work with NGOs on a specific area? Your
              organization is open to fund academic research projects in your
              field of application? You are open to be contacted to be a partner
              to apply for a grant on a new research project? ...{" "}
              <strong>What ever is your case, create your profil</strong>
            </Typography>

            <Button
              variant="contained"
              color="primary"
              style={{
                alignSelf: "flex-end",
                textTransform: "none",
                fontWeight: 700,
              }}
            >
              Create your profile
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Header;

const useStyles = makeStyles({
  verticalBar: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    paddingLeft: "20px",
    marginBottom: "20px",
    "&::before": {
      content: '""',
      position: "absolute",
      left: "0",
      top: "0",
      bottom: "0",
      width: "1px",
      backgroundColor: "#000",
    },
    "&::after": {
      content: '""',
      position: "absolute",
      left: "-3.5px",
      top: "0",
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      backgroundColor: "#000",
    },
    "&:last-child::after": {
      bottom: "0",
      top: "auto",
    },
  },
});
