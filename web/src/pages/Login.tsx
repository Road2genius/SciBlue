import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { useSnackbar } from "notistack";

const LoginPage: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { login, loading, error } = useLogin();
  const { setUserContext } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password).then((response) => {
      if (response) {
        const { userId, avatar } = response;
        setUserContext({ userId, avatar });
        enqueueSnackbar("Login successful", { variant: "success" });
        navigate("/");
      }
    });
  };

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
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ marginBottom: "20px" }}
      />
      <Link href="#" color="#BCBDC7" alignSelf="flex-end" fontWeight={700}>
        Forgot password?
      </Link>
      {error && (
        <Typography color="error" mt={2}>
          {error}
        </Typography>
      )}
      <Box display="flex" justifyContent="flex-end" alignItems="center" mt={4}>
        <Link href="/signup" color="#197278" fontWeight={700}>
          Sign up
        </Link>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
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
          disabled={loading}
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
    padding: "20px",
  },
});
