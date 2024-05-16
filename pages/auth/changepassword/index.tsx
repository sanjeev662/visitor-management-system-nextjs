import React, { useState, useEffect } from "react";
import { AppConfig } from "../../../config/config";
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
import Header from "@/components/Header";
import AppLayout from "@/components";

const ForgotPassword: React.FC = () => {
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
    otp: "",
    newPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const {
    application: {
      bearerToken,
      apiState: { status, isError, message },
    },
  } = useAppSelector((state: RootState) => state);

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


  const handleGenerateOTP = async () => {
    try {
      const response = await fetch(
        `${AppConfig.REACT_APP_API_HOSTNAME}/accounts/generateotp/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${bearerToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to generate OTP. Status: ${response.status}`);
      }

      const responseData = await response.json();

      alert("OTP generated Successfully");
      setValues({ ...values, otp: responseData.otp });
    } catch (error) {
      setErrorMessage("Failed to generate OTP. Please try again.");
    }
  };


  const handleResetPassword = async () => {
    const response = await fetch(
      `${AppConfig.REACT_APP_API_HOSTNAME}/accounts/resetpassword/users`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${bearerToken}`,
        },
        body: JSON.stringify({
          otp: values.otp,
          new_password: values.newPassword,
        }),
      }
    );

    if (!response.ok) {
      alert("Failed To update password!");
      return;
    }

    alert("Your password has been successfully updated!");

    router.push({
      pathname: "/dashboard",
    });
  };

  const isFormDisabled = () => {
    return values.newPassword.length < 8 || values.otp === "";
  };


  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!values.otp) {
      handleGenerateOTP();
    } else {
      handleResetPassword();
    }
  };

  return (
    <AppLayout>
      <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="Forgot Password"
          />
        </Box>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
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
            <Typography
              variant="h6"
              gutterBottom
              style={{ fontWeight: "bold" }}
            >
              Government of National Capital Territory of Delhi
            </Typography>
            <Typography variant="h6" style={{ fontWeight: "bold" }}>
              राष्ट्रीय राजधानी क्षेत्र दिल्ली सरकार
            </Typography>
            {!values.otp ? (
              <div>
                <Typography variant="h6" gutterBottom>
                  Forgot Password
                </Typography>
                <form onSubmit={handleFormSubmit}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{
                      marginTop: "25px",
                      width: "-webkit-fill-available",
                    }}
                  >
                    Generate OTP
                  </Button>
                </form>
              </div>
            ) : (
              <div>
                <Typography variant="h6" gutterBottom>
                  Reset Password
                </Typography>
                <form onSubmit={handleFormSubmit}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel htmlFor="otp" required>
                      OTP
                    </InputLabel>
                    <Input
                      id="otp"
                      type="text"
                      value={values.otp}
                      onChange={handleChange("otp")}
                      disabled
                    />
                    <FormHelperText>Enter the OTP you received.</FormHelperText>
                  </FormControl>
                  <FormControl fullWidth margin="normal">
                    <InputLabel htmlFor="newPassword" required>
                      New Password
                    </InputLabel>
                    <Input
                      id="newPassword"
                      type={values.showPassword ? "text" : "password"}
                      value={values.newPassword}
                      onChange={handleChange("newPassword")}
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
                      {values.newPassword.length < 8
                        ? "Password should be at least 8 characters."
                        : "Enter your new password."}
                    </FormHelperText>
                  </FormControl>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{
                      marginTop: "25px",
                      width: "-webkit-fill-available",
                    }}
                    disabled={isFormDisabled()}
                  >
                    Reset Password
                  </Button>
                </form>
              </div>
            )}
          </Box>
        </Box>
      </Box>
    </AppLayout>
  );
};

export default ForgotPassword;

