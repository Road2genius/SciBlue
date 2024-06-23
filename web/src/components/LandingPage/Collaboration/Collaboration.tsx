import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import map from "../../../assets/images/map.svg";

const Collaboration: React.FC = () => {
  return (
    <Box p={2} bgcolor={"#F4F8FB"}>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h5" fontWeight={700} color="#305B8D" gutterBottom>
          Respond to a collaboration request by proposing your team as a
          candidate
        </Typography>

        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6} display="flex" flexDirection="column">
            <Typography variant="body1" paragraph>
              Here you can browse all the collaboration requests posted in
              SciWithMe by various actors such as other public research
              laboratories, private actors, NGO or even other public actors.
            </Typography>

            <Typography variant="body1" paragraph>
              Find yourself the scientific project that motivates you to jump
              in.
            </Typography>

            <Button
              variant="contained"
              color="primary"
              sx={{
                textTransform: "none",
                fontWeight: 700,
                alignSelf: "center",
              }}
            >
              Answer a request
            </Button>
          </Grid>

          <Grid item xs={12} md={6}>
            <img src={map} alt="map of collaborator" width="100%" />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Collaboration;
