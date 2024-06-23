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
    <Box className={classes.footer}>
      <Container maxWidth="lg">
        <Grid container justifyContent="center" spacing={4}>
          {links.map((link, index) => (
            <Grid item key={index}>
              <Link
                href={link.href}
                sx={{
                  color: "#000",
                  textDecorationColor: "#000",
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
  );
};

export default Footer;

const useStyles = makeStyles({
  footer: {
    backgroundColor: "#e0e0e0",
    padding: "10px 0",
  },
});
