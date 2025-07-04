import { Box, Button, Container, IconButton, InputAdornment, Link, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { useSnackbar } from "notistack";
import { Trans, useTranslation } from "react-i18next";

const LoginPage: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { login, loading, error } = useLogin();
  const { setUserContext } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
    <Container maxWidth="xl">
      <Box className={classes.root}>
        <Typography variant="h4" fontWeight={700} color="#197278" mb={4}>
          <Trans i18nKey="login_title" />
        </Typography>
        <Typography variant="body1" fontWeight={600}>
          <Trans i18nKey="login_mail" />
        </Typography>
        <TextField
          fullWidth
          placeholder={t("loing_mail_placeholder")}
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginBottom: "20px" }}
        />
        <Typography variant="body1" fontWeight={600}>
          <Trans i18nKey="login_password" />
        </Typography>
        <TextField
          fullWidth
          placeholder={t("login_password_placeholder")}
          type={!showPassword ? "password" : "text"}
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ marginBottom: "20px" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={(event) => event.preventDefault()}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Link href="#" color="#BCBDC7" alignSelf="flex-end" fontWeight={700}>
          <Trans i18nKey="login_forgot_password" />
        </Link>
        {error && (
          <Typography color="error" mt={2}>
            {error}
          </Typography>
        )}
        <Box display="flex" justifyContent="flex-end" alignItems="center" mt={4}>
          <Link href="/signup" color="#197278" fontWeight={700}>
            <Trans i18nKey="login_button_sign_up" />
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
            <Trans i18nKey="login_button_next" />
          </Button>
        </Box>
      </Box>
    </Container>
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
