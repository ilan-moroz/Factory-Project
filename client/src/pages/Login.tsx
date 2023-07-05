import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { fetchLogin } from "../utils/fetchData";
import { useForm } from "react-hook-form";
import { InputAdornment } from "@mui/material";
import { Password, Person } from "@mui/icons-material";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { useNavigate } from "react-router-dom";
import { store } from "../redux/Store";
import { setLoginAction } from "../redux/UserReducer";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      style={{ color: "white" }}
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit">Moroz Factory</Link> {new Date().getFullYear()}
    </Typography>
  );
}

const defaultTheme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
        },
        notchedOutline: {
          borderColor: "white",
        },
        input: {
          color: "white", // Make input text white
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "white", // Make icon color white
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "white", // Make the form label white
          "&.Mui-focused": {
            color: "white", // Make the form label white when focused
          },
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          color: "white", // Make the adornment white
        },
      },
    },
  },
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const notyf = new Notyf({
    position: {
      x: "center",
      y: "top",
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    const { userName, password } = data;
    const loginData = { userName, password };
    try {
      const response = await fetchLogin(loginData);
      if (!response) {
        notyf.error(
          "Invalid Username or password. Please check your credentials and try again"
        );
      } else {
        store.dispatch(setLoginAction(response.user, response.token));
        navigate("/home");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Typography
        component="h1"
        variant="h2"
        sx={{
          display: "flex",
          justifyContent: "center",
          borderBottom: "1px solid black",
          p: 2,
        }}
      >
        Moroz Factory
      </Typography>
      <Container component="main" maxWidth="xs">
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
          <Typography component="h1" variant="h4">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="userName"
              label="User Name"
              autoComplete="userName"
              autoFocus
              {...register("userName", { required: true })}
              error={Boolean(errors.userName)}
              helperText={errors.userName && "User Name is required"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password", { required: true })}
              error={Boolean(errors.password)}
              helperText={errors.password && "Password is required"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Password />
                  </InputAdornment>
                ),
              }}
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
              <Grid item xs></Grid>
              <Grid item></Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
