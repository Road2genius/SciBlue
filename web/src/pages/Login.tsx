import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React, { useEffect, useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { useSnackbar } from "notistack";
import Cookies from "js-cookie";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useResetPassword } from "../hooks/useResetPassword";

const LoginPage: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { login, loading, error } = useLogin();
  const { setUserContext } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [openDialogAccountActivated, setOpenDialogAccountActivated] =
    useState(false);

  useEffect(() => {
    const accountActivated = Cookies.get("accountActivated");

    if (accountActivated === "true") {
      setOpenDialogAccountActivated(true);
      Cookies.remove("accountActivated");
    }
  }, []);

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

  const { resetPasswordRequest } = useResetPassword({
    onSuccessRequestResetpassword: () =>
      enqueueSnackbar(
        "Request reset password sent, you will receive an email.",
        {
          variant: "success",
        }
      ),
    onErrorRequestResetpassword: () =>
      enqueueSnackbar("Failed to request reset password", { variant: "error" }),
  });

  const handleRequestResetPassword = () => {
    resetPasswordRequest(email);
    setEmail("");
  };

  return (
    <>
      <Container maxWidth="xl">
        <Box className={classes.root}>
          {!forgotPassword ? (
            <>
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
              <Link
                onClick={() => setForgotPassword(true)}
                color="#BCBDC7"
                alignSelf="flex-end"
                fontWeight={700}
                sx={{ cursor: "pointer" }}
              >
                Forgot password?
              </Link>
              {error && (
                <Typography color="error" mt={2}>
                  {error}
                </Typography>
              )}
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                mt={4}
              >
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
            </>
          ) : (
            <>
              <Typography variant="h4" fontWeight={700} color="#197278">
                Reset your password
              </Typography>
              <Link
                onClick={() => setForgotPassword(false)}
                color="#BCBDC7"
                alignSelf="flex-end"
                fontWeight={700}
                mb={5}
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ArrowBackIcon sx={{ marginRight: 1 }} />
                Back to log in
              </Link>
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
              <Button
                variant="contained"
                color="primary"
                onClick={handleRequestResetPassword}
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
                disabled={loading}
              >
                Reset password
              </Button>
            </>
          )}
        </Box>
      </Container>
      <Dialog
        open={openDialogAccountActivated}
        onClose={() => setOpenDialogAccountActivated(false)}
        PaperComponent={(props) => (
          <Paper
            {...props}
            elevation={24}
            sx={{ padding: "30px", borderRadius: "8px" }}
          />
        )}
      >
        <DialogTitle sx={{ fontWeight: "700", color: "#197278" }}>
          Congratulations!
          <br /> Your registration is now complete
        </DialogTitle>
        <DialogContent sx={{ marginLeft: "30px", marginY: "5px" }}>
          <Typography variant="body2" fontWeight={700}>
            You can now:
          </Typography>
          <Box display="flex" my={2}>
            <DoneRoundedIcon sx={{ color: "#197278", marginRight: "2px" }} />
            <Typography variant="body2">
              Post your own questions and discussions, vote and answer to the
              others
            </Typography>
          </Box>
          <Box display="flex" my={2}>
            <DoneRoundedIcon sx={{ color: "#197278", marginRight: "2px" }} />
            <Typography variant="body2">
              Submit a collaboration request and comment the requests posted by
              others
            </Typography>
          </Box>
          <Box display="flex" my={2}>
            <DoneRoundedIcon sx={{ color: "#197278", marginRight: "2px" }} />
            <Typography variant="body2">
              Browse the SciBlue Community
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
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
              alignSelf: "flex-end",
            }}
            onClick={() => setOpenDialogAccountActivated(false)}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
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
