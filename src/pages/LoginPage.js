import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ROUTE_PATHS } from "../routing/routes";
import MaterialLink from "../components/Link";
import { loginUser } from "../api/apiService";
import { NOTIFICATION_TYPE, emitNotification } from "../utils/emitNotification";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setAccessTokenState,
  setUserIdState,
  setUsernameState,
} from "../redux/authSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.auth.accessToken);
  useEffect(() => {
    if (!Object.is(accessToken, null) && !Object.is(accessToken, undefined)) {
      navigate(ROUTE_PATHS.dashboard);
    }
  }, [accessToken]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username");
    const password = data.get("password");
    try {
      const response = await loginUser(username, password);
      dispatch(setAccessTokenState(response.data.token));
      dispatch(setUserIdState(response.data.userId));
      dispatch(setUsernameState(username));
      emitNotification(NOTIFICATION_TYPE.SUCCESS, "Succesfully Logged in");
    } catch (error) {
      emitNotification(NOTIFICATION_TYPE.ERROR, error.message);
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs" sx={{ pt: 10 }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <MaterialLink
                  to={ROUTE_PATHS.register}
                  variant="body2"
                  text={"Don't have an account? Sign Up"}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default LoginPage;
