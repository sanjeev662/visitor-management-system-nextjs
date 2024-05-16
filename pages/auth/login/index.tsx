import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Link,
  Box,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector, RootState } from "../../../store";
import { signIn } from "../../../store/application/actions";
import Cookies from "js-cookie";

const LoginPage: React.FC = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
    showPassword: false,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    application: {
      bearerToken,
      apiState: { status, isError, message },
      isLoginError,
    },
  } = useAppSelector((state: RootState) => state);

  useEffect(() => {
    if (bearerToken != "") {
      router.push("/");
    }
  }, [bearerToken]);

  const handleChange =
    (prop: keyof typeof values) =>
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
      };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = (event: React.FormEvent) => {
    try {
      event.preventDefault();
      dispatch(
        signIn({ user_name: values.username, password: values.password })
      );
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      style={{
        backgroundImage: `url('/bg9.jpg')`,
        backgroundSize: "cover",
      }}
    >
      <Box
        p={4}
        m={4}
        textAlign="center"
        sx={{
          boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
          backgroundColor: "white",
          borderRadius: 2,
        }}
      >
        <Box>
          <Link href="#">
            <img src="/web-logo.png" alt="logo" />
          </Link>
          <Typography variant="h6" gutterBottom style={{ fontWeight: "bold" }}>
            Government of National Capital Territory of Delhi
          </Typography>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            राष्ट्रीय राजधानी क्षेत्र दिल्ली सरकार
          </Typography>

          <form onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="username" required>
                Username
              </InputLabel>
              <Input
                id="username"
                type="text"
                value={values.username}
                onChange={handleChange("username")}
              />
              <FormHelperText>Enter your Government username.</FormHelperText>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="password" required>
                Password
              </InputLabel>
              <Input
                id="password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText>
                Enter the password that accompanies your username.
              </FormHelperText>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "25px", width: "-webkit-fill-available" }}
            >
              Log in
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
