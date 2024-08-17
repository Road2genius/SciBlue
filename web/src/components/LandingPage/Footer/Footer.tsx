import { Box, Container, Grid, Link, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const links: {
  text: string;
  href: string;
}[] = [
  { text: "Legal Notice", href: "#" },
  { text: "Terms of Use", href: "#" },
  { text: "Privacy Policy", href: "#" },
  { text: "Contact Us", href: "#" },
];

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Box
        bgcolor="#197278"
        p={2}
        display="flex"
        justifyContent="center"
        sx={{ zIndex: 2, position: "relative" }}
      >
        <Link
          href="/feedback"
          sx={{
            textDecorationColor: "#FFF",
            color: "#FFF",
            "&:hover": { color: "gray" },
          }}
        >
          <Typography variant="body1" fontWeight={600}>
            This is the first version of the platform, we will keep making it
            better. Which feature would you like us to add ?
          </Typography>
        </Link>
      </Box>
      <Box className={classes.footer}>
        <Container maxWidth="lg">
          <Grid container justifyContent="center" spacing={8}>
            {links.map((link, index) => (
              <Grid item key={index}>
                <Link
                  href={link.href}
                  sx={{
                    color: "#000",
                    textDecoration: "none",
                    "&:hover": { color: "#305B8D" },
                  }}
                >
                  <Typography variant="body1">{link.text}</Typography>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Footer;

const useStyles = makeStyles({
  footer: {
    backgroundColor: "#D9D9D9",
    padding: "10px 0",
  },
});
