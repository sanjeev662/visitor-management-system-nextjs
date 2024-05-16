import React, { useEffect, useState } from "react";
import { Box, Button, TextField, useTheme, MenuItem } from "@mui/material";
import { Formik, FormikHelpers, FormikValues } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/router";
import AppLayout from "@/components";
import Header from "@/components/Header";
import { useAppDispatch, useAppSelector, RootState } from "../../../store";
import { tokens } from "../../../src/theme";
import { addAdamDetail } from "../../../store/adam/actions";
import AccessDenied from "../../../components/AccessDenied";
import * as yup from "yup";

interface FormValues {
  ip: string;
  port: string;
  address1: number;
  address2: number;
  count: number;
  category: string;
}

const AddAdamDetail = () => {
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
    const response = await dispatch(
      addAdamDetail(formattedValues, {
        headers: { Authorization: `bearer ${bearerToken}` },
      })
    );
    router.push("/guard");
  };

  const checkoutSchema = yup.object().shape({
    ip: yup.string().required("IP is required"),
    port: yup.string().required("Port is required"),
    address1: yup.number().required("Address1 is required"),
    address2: yup.number().required("Address2 is required"),
    count: yup.number().required("Count is required"),
    category: yup.string().required("Category is required"),
  });

  const initialValues: FormValues = {
    ip: "",
    port: "",
    address1: 0,
    address2: 0,
    count: 0,
    category: "",
  };

  useEffect(() => {
    if (bearerToken === "") router.push("/auth/login");
  }, [bearerToken]);

  return (
    <AppLayout>
      {user_type !== "guard" ? (
        <AccessDenied />
      ) : (
        <Box m="20px">
          <Header title="ADD ADAM DETAILS" />

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
                  gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                  sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
                  }}
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="IP"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.ip}
                    name="ip"
                    error={!!touched.ip && !!errors.ip}
                    helperText={touched.ip && errors.ip}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Port"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.port}
                    name="port"
                    error={!!touched.port && !!errors.port}
                    helperText={touched.port && errors.port}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Address1"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.address1}
                    name="address1"
                    error={!!touched.address1 && !!errors.address1}
                    helperText={touched.address1 && errors.address1}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Address2"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.address2}
                    name="address2"
                    error={!!touched.address2 && !!errors.address2}
                    helperText={touched.address2 && errors.address2}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Count"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.count}
                    name="count"
                    error={!!touched.count && !!errors.count}
                    helperText={touched.count && errors.count}
                  />
                  <TextField
                    select
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Category"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.category}
                    name="category"
                    error={!!touched.category && !!errors.category}
                    helperText={touched.category && errors.category}
                  >
                    <MenuItem value="entry">Entry</MenuItem>
                    <MenuItem value="exit">Exit</MenuItem>
                  </TextField>
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    ADD DETAIL
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

export default AddAdamDetail;
