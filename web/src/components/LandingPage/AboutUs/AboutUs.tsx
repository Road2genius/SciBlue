import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";

const AboutUs: React.FC = () => {
  return (
    <Box bgcolor="#283D3B" p={1}>
      <Container maxWidth="xl" sx={{ mt: 5, mb: 5 }}>
        <Typography
          variant="h4"
          align="center"
          fontWeight={700}
          gutterBottom
          color="#CDE6D1"
        >
          SciForEarth in a nutshell
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="#CDE6D1"
          mb={6}
          fontStyle="italic"
          gutterBottom
        >
          This is the first version of the plateform, we will keep making it
          better according to your feedback
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h6"
              color="#DAD7CD"
              fontWeight={700}
              gutterBottom
            >
              Why SciForEarth?
            </Typography>
            <Typography variant="body1" color="#DAD7CD" paragraph>
              We believe in a wolrd where planet, environment, biodiversity,
              ecology is <br /> central. At SciForEarth we want to be part of
              the change we all need to do. <br /> Science is a powerfull tool
              to be used in the crisis we experiment. It helps to <br /> alerte
              on the situation, to comprehend complexe phenomena at stake, to{" "}
              <br />
              explain what is going on and what might happen. But also, Sicence
              can help <br /> design solutions for the change needed.
            </Typography>
            <Typography
              variant="h6"
              color="#DAD7CD"
              fontWeight={700}
              gutterBottom
            >
              What is SciForEarth?
            </Typography>
            <Typography variant="body1" color="#DAD7CD" paragraph>
              SciForEarth is a matchmaking plateforme design to ease links
              between <br />
              academic reaserchers and field actors (such as NOGs, governement
              ect...). <br /> On this plateform, you can respeond to an open
              question or to a request for <br /> collaboration.
            </Typography>
            <Typography
              variant="h6"
              color="#DAD7CD"
              fontWeight={700}
              gutterBottom
            >
              How do we work?
            </Typography>
            <Typography variant="body1" color="#DAD7CD" paragraph>
              At SciForEarth, we are committed in creating digital solutions
              with a <br /> significant impact on society. To achieve this, our
              project is resolutely <br />
              collaborative. Your feedback and suggestions will be continuously
              integrated <br />
              to improve the platform and make it as useful as possible for you.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h6"
              color="#DAD7CD"
              fontWeight={700}
              gutterBottom
            >
              Who are we?
            </Typography>
            <Typography variant="body1" color="#DAD7CD" paragraph>
              Our team has solid experience in working for the public sector,
              particularly in <br /> developing innovative solutions with impact
              for the French Ministry of Health.
            </Typography>
            <Typography
              variant="body1"
              color="#DAD7CD"
              fontWeight={700}
              sx={{ fontStyle: "italic" }}
              gutterBottom
            >
              Antoine de Zélicourt
            </Typography>
            <Typography variant="body1" color="#DAD7CD" paragraph>
              Antoine has a professional doctorate in pharmacy and a biology PhD
              from <br />
              the Paris Saclay University, followed by a postdoc experience. His
              knowledge <br /> and passion for science are at the heart of our
              innovative approach.
            </Typography>
            <Typography
              variant="body1"
              color="#DAD7CD"
              fontWeight={700}
              sx={{ fontStyle: "italic" }}
              gutterBottom
            >
              Caroline de Kerhor
            </Typography>
            <Typography variant="body1" color="#DAD7CD" paragraph>
              Caroline is also a pharmacist, she has a master degree in
              biological an <br /> Medical Science and a MBA at ESSEC buisiness
              School. Her expertise and <br /> passion for developing digital
              solutions with a strong societal impact guide <br />
              our deployments.
            </Typography>
            <Typography
              variant="h6"
              color="#DAD7CD"
              fontWeight={700}
              gutterBottom
            >
              A community
            </Typography>
            <Typography
              variant="body1"
              fontStyle="italic"
              color="#DAD7CD"
              paragraph
            >
              “Together, we can create an environment where researchers can
              easily <br />
              connect, share ideas, and innovate with those who act to create a
              better <br /> future. Join us today and participate to precipitate
              the tipping point <br />
              where of scientific research with SciForEarth!”
            </Typography>
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="center" mt={6}>
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
            Create your profile
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
            Send feedback
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutUs;
