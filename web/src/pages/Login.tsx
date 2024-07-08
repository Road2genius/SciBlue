import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const LoginPage: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h4" fontWeight={700} color="#197278" mb={4}>
        Login
      </Typography>

      <Typography variant="body1" fontWeight={600}>
        Mail
      </Typography>
      <TextField
        fullWidth
        placeholder="Enter mail address"
        variant="outlined"
        sx={{ marginBottom: "20px" }}
      />

      <Typography variant="body1" fontWeight={600}>
        Password
      </Typography>
      <TextField
        fullWidth
        placeholder="Enter password"
        type="password"
        variant="outlined"
        sx={{ marginBottom: "20px" }}
      />

      <Link href="#" color="#BCBDC7" alignSelf="flex-end">
        Forgot password?
      </Link>

      <Box display="flex" justifyContent="flex-end" alignItems="center" mt={4}>
        <Link href="/signup" color="#197278">
          Sign up
        </Link>

        <Button
          variant="contained"
          color="primary"
          sx={{
            width: "150px",
            borderRadius: "8px",
            textTransform: "none",
            height: "50px",
            fontWeight: 700,
            backgroundColor: "#008080",
            "&:hover": {
              backgroundColor: "#006666",
            },
            marginLeft: "40px",
          }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;

const useStyles = makeStyles({
  root: {
    marginTop: "40px",
    marginLeft: "80px",
    maxWidth: "700px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
});
