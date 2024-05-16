import React, { useEffect, useState } from "react";
import { Box, Button, TextField, useTheme, Typography } from "@mui/material";
import { Formik, FormikHelpers, FormikValues } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/router";
import AppLayout from "@/components";
import Header from "@/components/Header";
import { useAppDispatch, useAppSelector, RootState } from "../../../store";
import { tokens } from "../../../src/theme";
import { createAppointment } from "../../../store/appointments/actions";
import AccessDenied from "../../../components/AccessDenied";
import * as yup from "yup";

interface FormValues {
  fName: string;
  lName: string;
  AppointmentTime: string;
  govID: string;
  mobileNo: string;
  address: string;
}

const CreateAppointment = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    application: {
      bearerToken,
      user_type,
      apiState: { status, isError, message },
      isLoginError,
    },
  } = useAppSelector((state: RootState) => state);

  const handleFormSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    const formattedValues = { ...values };

    if (formattedValues.AppointmentTime) {
      const rawDate = formattedValues.AppointmentTime;
      const formattedDate = rawDate.replace("T", " ");
      formattedValues.AppointmentTime = formattedDate
    }

    const response = await dispatch(
      createAppointment(formattedValues, {
        headers: { Authorization: `bearer ${bearerToken}` },
      })
    );
    router.push("/appointment/appointments");
  };

  const checkoutSchema = yup.object().shape({
    fName: yup
      .string()
      .required("First Name is required"),
    lName: yup
      .string()
      .required("Last Name is required"),
    AppointmentTime: yup
      .date()
      .required("Appointment Time is required")
      .min(new Date(new Date().setHours(0, 0, 0, 0)), "Appointment Time cannot be in the past")
      .test("valid-date", "Invalid Appointment Time", (value) => {
        const appointmentTime = new Date(value);
        const currentYear = new Date().getFullYear();
        return appointmentTime.getFullYear() >= 1900 && appointmentTime.getFullYear() <= currentYear;
      })
      .transform((originalValue, originalObject) => {
        return originalObject.AppointmentTime
          ? originalObject.AppointmentTime.toISOString().split("T")[0]
          : originalValue;
      }),
    mobileNo: yup
      .string()
      .required("Mobile number is required"),
    address: yup.string().required("Address is required"),
    govID: yup.string().required("Government ID is required"),
  });

  const initialValues: FormValues = {
    fName: "",
    lName: "",
    AppointmentTime: "",
    govID: "",
    mobileNo: "",
    address: "",
  };

  useEffect(() => {
    if (bearerToken === "") router.push("/auth/login");
  }, [bearerToken]);

  return (
    <AppLayout>
      {user_type !== "admin" && user_type !== "receptionist" ? (
        <AccessDenied />
      ) : (
        <Box m="20px">
          <Header title="CREATE AN APPOINTMENT" />

          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                  }}
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.fName}
                    name="fName"
                    error={!!touched.fName && !!errors.fName}
                    helperText={touched.fName && errors.fName}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lName}
                    name="lName"
                    error={!!touched.lName && !!errors.lName}
                    helperText={touched.lName && errors.lName}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="datetime-local"
                    label="Appointment Time"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.AppointmentTime}
                    name="AppointmentTime"
                    error={!!touched.AppointmentTime && !!errors.AppointmentTime}
                    helperText={touched.AppointmentTime && errors.AppointmentTime}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Government ID"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.govID}
                    name="govID"
                    error={!!touched.govID && !!errors.govID}
                    helperText={touched.govID && errors.govID}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Mobile No"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.mobileNo}
                    name="mobileNo"
                    error={!!touched.mobileNo && !!errors.mobileNo}
                    helperText={touched.mobileNo && errors.mobileNo}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Address"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.address}
                    name="address"
                    error={!!touched.address && !!errors.address}
                    helperText={touched.address && errors.address}
                    sx={{ gridColumn: "span 2" }}
                  />
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Create Appointment
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      )}
    </AppLayout>
  );
};

export default CreateAppointment;
