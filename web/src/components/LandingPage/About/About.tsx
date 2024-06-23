import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";

const About: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
      <Typography
        variant="h3"
        align="center"
        fontWeight={700}
        gutterBottom
        color="#305B8D"
      >
        SciWithMe in a nutshell
      </Typography>

      <Typography
        variant="h5"
        align="center"
        color="#305B8D"
        mb={4}
        fontWeight={700}
        gutterBottom
      >
        This is the first version of the platform, we will keep making it better
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Why SciWithMe?
          </Typography>
          <Typography variant="body1" paragraph>
            We are passionate about improving collaboration in the field of
            scientific research, whether it is between public actors or between
            the public and private sectors. We believe that collaboration is
            crucial to research.
          </Typography>

          <Typography variant="h6" fontWeight={700} gutterBottom>
            What is SciWithMe?
          </Typography>
          <Typography variant="body1" paragraph>
            The world of public research needs effective solutions to foster
            collaboration. At SciWithMe, we believe the key to success lies in
            creating a collaborative platform that allows everyone to highlight
            their collaboration needs. SciWithMe helps you find a qualified,
            available, and motivated partner for your next collaboration.
          </Typography>

          <Typography variant="h6" fontWeight={700} gutterBottom>
            How SciWithMe works?
          </Typography>
          <Typography variant="body1" paragraph>
            At SciWithMe, we are committed in creating digital solutions with a
            significant impact on society. To achieve this, our project is
            resolutely collaborative. Your feedback and suggestions will be
            continuously integrated to improve the platform and make it as
            useful as possible for you. You can vote for the next feature to be
            developed.
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Who are we?
          </Typography>
          <Typography variant="body1" paragraph>
            Our team has solid experience in working for the public sector,
            particularly in developing innovative solutions with impact for the
            French Ministry of Health.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Antoine de Zélicourt</strong>
            <br />
            Antoine is a doctor of pharmacy with extensive experience in the
            field of research. His deep knowledge and passion for science are at
            the heart of our innovative approach.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Caroline de Kerhor</strong>
            <br />
            Caroline is also a pharmacist. Her expertise and passion for
            developing digital solutions with a strong societal impact guide our
            deployments.
          </Typography>

          <Typography variant="h6" fontWeight={700} gutterBottom>
            A community
          </Typography>

          <Typography variant="body1" paragraph>
            “By joining our community, you contribute to making SciWithMe the
            reference tool for starting successful scientific collaborations.
            Together, we can create an environment where researchers can easily
            connect, share ideas, and innovate. Join us today and participate in
            the revolution of scientific research with SciWithMe!”
          </Typography>
        </Grid>
      </Grid>

      <Box display="flex" justifyContent="center" mt={4}>
        <Button
          variant="contained"
          color="primary"
          sx={{ mr: 3, textTransform: "none", fontWeight: 700 }}
        >
          Create your profile
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: "none", fontWeight: 700 }}
        >
          Send feedback
        </Button>
      </Box>
    </Container>
  );
};

export default About;
