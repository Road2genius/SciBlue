import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";
import { useResetPassword } from "../hooks/useResetPassword";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const ResetPasswordPage: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const { token } = useParams();

  const { resetPassword } = useResetPassword({
    onSuccessResetpassword: () =>
      enqueueSnackbar("Password has been reset successfully", {
        variant: "success",
      }),
    onErrorResetpassword: (errorMessage: string) =>
      enqueueSnackbar(errorMessage, { variant: "error" }),
  });

  const handleResetPassword = () => {
    if (token) {
      resetPassword(token, password);
      setPassword("");
      navigate("/login");
    }
  };

  return (
    <>
      <Container maxWidth="xl">
        <Box className={classes.root}>
          <Typography variant="h4" fontWeight={700} color="#197278" mb={5}>
            Reset your password
          </Typography>

          <Typography variant="body1" fontWeight={600}>
            New password
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter password"
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleResetPassword}
            sx={{
              width: "160px",
              borderRadius: "8px",
              textTransform: "none",
              height: "50px",
              fontWeight: 700,
              backgroundColor: "#008080",
              "&:hover": {
                backgroundColor: "#006666",
              },
              marginLeft: "40px",
              alignSelf: "flex-end",
            }}
          >
            Reset password
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default ResetPasswordPage;

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
