import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const AccountActivated: React.FC = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <Box
        className={classes.root}
        sx={{
          minWidth: {
            xs: "100%",
            sm: "100%",
            md: "100%",
            lg: "100%",
            xl: "1200px",
          },
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          color="#197278"
          sx={{ marginBottom: "20px" }}
        >
          Thanks for registrating. You can now do this, this, and this.
        </Typography>
      </Box>
    </Container>
  );
};

const useStyles = makeStyles({
  root: {
    marginTop: "40px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    margin: "auto",
  },
});

export default AccountActivated;
