import { Avatar, Box, Container, Typography } from "@mui/material";
import React from "react";
import Antoine from "../../../assets/images/antoine.svg";
import Caroline from "../../../assets/images/caroline.svg";

const AboutUs: React.FC = () => {
  const teamArray: {
    avatar: string;
    name: string;
    bio: string;
  }[] = [
    {
      avatar: Antoine,
      name: "Antoine de Zélicourt",
      bio: "Antoine has a biology PhD from Paris-Saclay University, followed by a postdoc experience. His passion for science and his concern about environmental crisis are at the heart of our collaborative approach.",
    },
    {
      avatar: Caroline,
      name: "Caroline de Kerhor",
      bio: "Caroline is a pharmacist, she has a master degree in biological an medical science. Her expertise and passion for developing digital solutions with societal impact guide our developments.",
    },
  ];

  return (
    <Box bgcolor="#E6EEE8" p={1}>
      <Container maxWidth="xl" sx={{ mt: 5, mb: 5 }}>
        <Typography variant="h6">Who are we?</Typography>

        <Typography variant="body1">
          Our team has extensive experience in working with the public sector,
          particularly in developing innovative and impactful solutions up to
          ministry level. <br /> by creating community to ally together
          administration and all actors together (associations, patient
          community, health practitioners, administration ...)
        </Typography>

        <Box display="flex" mt={2}>
          {teamArray.map((team) => (
            <Box display="flex">
              <Avatar
                src={team.avatar}
                sx={{ width: 100, height: 100, marginRight: "10px" }}
              />

              <Box display="flex" flexDirection="column">
                <Typography variant="h6" fontStyle="italic">
                  {team.name}
                </Typography>
                <Typography variant="body1" fontStyle="italic">
                  {team.bio}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default AboutUs;
