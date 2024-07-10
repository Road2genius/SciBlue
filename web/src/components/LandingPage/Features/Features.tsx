import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import featuresImage from "../../../assets/images/features.svg";

const Features: React.FC = () => {
  return (
    <Box my={10}>
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={7} display="flex" flexDirection="column">
            <Typography variant="h4" fontWeight={700} color="#00796b" mb={4}>
              Respond to a collaboration request or
              <br /> answer a question
            </Typography>

            <Typography variant="body1" paragraph>
              Here you can browse all the collaboration requests and discussions
              posted in <br />
              SciForEarth by various players in the environmental field, such as
              other public
              <br /> research laboratories, NGO or other public organizations.
            </Typography>

            <Typography variant="body1" paragraph>
              Find yourself the scientific project that motivates you to jump
              in, or help other by
              <br /> taking part to open discussions and answering questions.
            </Typography>

            <Box display="flex" justifyContent="center" mt={4}>
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
                Answer a request
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
                Answer a question
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={5}>
            <Box>
              <img src={featuresImage} alt="features image" />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Features;
