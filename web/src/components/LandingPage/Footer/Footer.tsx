import React from "react";
import { Box, Container, Grid, Link, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Trans, useTranslation } from "react-i18next";

const links: {
  text: string;
  href: string;
}[] = [
  { text: "landing_footer_legal_notive", href: "#" },
  { text: "landing_footer_terms_of_use", href: "#" },
  { text: "landing_footer_private_policy", href: "#" },
  { text: "landing_footer_contact_us", href: "#" },
];

const Footer: React.FC = () => {
  const classes = useStyles();
  useTranslation();

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
            <Trans i18nKey="landing_footer_beta_text"/>
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
                  <Typography variant="body1">
                    <Trans i18nKey={link.text}/>
                  </Typography>
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
