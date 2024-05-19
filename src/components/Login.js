import { Button, CircularProgress, Stack, TextField, InputAdornment, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Login.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInput = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    setFormData((nextData) => ({ ...nextData, [key]: value }));
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const login = async (formData) => {
    if (!validateInput(formData)) return;
    try {
      setLoading(true);
      const url = `${config.endpoint}/auth/login`
      const res = await axios.post(url, {
        username: formData.username,
        password: formData.password,
      });
      persistLogin(
        res.data.token,
        res.data.username,
        res.data.balance
      );

      setFormData({
        username: "",
        password: "",
      });
      setLoading(false);
      enqueueSnackbar("Logged In Successfully", { variant: "success" });

      history.push("/", { from: "Login" });
    } catch (e) {
      setLoading(false);
      if (e.response && e.response.status === 400) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar("Something went wrong. Check that the backend is running, reachable and returns valid JSON",
          { variant: "error" });
      }
    }
  };

  const validateInput = (data) => {
    if (!data.username) {
      enqueueSnackbar("Username is a required field", { variant: "warning" });
      return false;
    }
    if (!data.password) {
      enqueueSnackbar("Password is a required field", { variant: "warning" });
      return false;
    }
    return true;
  };

  const persistLogin = (token, username, balance) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("balance", balance);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Login</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Username"
            fullWidth
            value={formData.username}
            onChange={handleInput}
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"} // Change the type based on showPassword state
            fullWidth
            placeholder="Password"
            value={formData.password}
            onChange={handleInput}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility}>
                    {showPassword ? <VisibilityOff /> : <Visibility />} {/* Use icons based on showPassword state */}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress size={25} color="primary" />
            </Box>
          ) : (
            <Button
              className="button"
              variant="contained"
              onClick={() => login(formData)}
            >
              LOGIN TO QKART
            </Button>
          )}
          <p className="secondary-action">
            Don't have an account?{" "}
            <a className="link" href="/register">
              Register Now
            </a>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Login;
