import React, { useEffect, useState } from "react";
import { Box, Button, TextField, useTheme, Typography, MenuItem } from "@mui/material";
import { Formik, FormikHelpers, FormikValues } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/router";
import AppLayout from "@/components";
import Header from "@/components/Header";
import { tokens } from "../../../src/theme";
import AccessDenied from "../../../components/AccessDenied";
import { useAppDispatch, useAppSelector, RootState } from "../../../store";
import { editVisitor } from "../../../store/visitors/actions";
import * as yup from "yup";

interface FormValues {
  visitorId: number;
  vFirstName: string;
  vLastName: string;
  govID: string;
  vMobileNo: string;
  vAddress: string;
  visitorType: string;
}

interface PropsData {
  id: number;
  visitorId: number;
  indexId: number;
  vFirstName: string;
  vLastName: string;
  vehicalNo: string;
  vAddress: string;
  vMobileNo: string;
  visitorType: string;
  blacklisted: boolean;
  vPhoto: string;
  vSignature: string;
  vCommingDate: string;
  vTemplate: string | null;
  vSuspicious: string | null;
  Reason: string | null;
}

const AddNewVisitor: React.FC = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useAppDispatch();
  const router = useRouter();
  let data: PropsData | undefined = JSON.parse(
    (router?.query?.datas as string) || "{}"
  );

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
      editVisitor(formattedValues, {
        headers: { Authorization: `bearer ${bearerToken}` },
      })
    );
    router.push("/visitor/visitors");
  };

  const checkoutSchema = yup.object().shape({
    vFirstName: yup
      .string()
      .required("First Name is required"),
    vLastName: yup
      .string()
      .required("Last Name is required"),
    vMobileNo: yup
      .string()
      .matches(/^[0-9]{10}$/, "Mobile number must be a 10-digit number")
      .required("Mobile number is required"),
    vAddress: yup.string().required("Address is required"),
    govID: yup.string().required("GovernmentID is required"),
    visitorType: yup.string().required("visitorType is required"),
  });

  const initialValues: FormValues = {
    visitorId: data?.visitorId || 0,
    vFirstName: data?.vFirstName || "",
    vLastName: data?.vLastName || "",
    govID: data?.vehicalNo || "",
    vMobileNo: data?.vMobileNo || "",
    vAddress: data?.vAddress || "",
    visitorType: data?.visitorType || "",
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
          <Header title="EDIT VISITOR" />

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
                    value={values.vFirstName}
                    name="vFirstName"
                    error={!!touched.vFirstName && !!errors.vFirstName}
                    helperText={touched.vFirstName && errors.vFirstName}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.vLastName}
                    name="vLastName"
                    error={!!touched.vLastName && !!errors.vLastName}
                    helperText={touched.vLastName && errors.vLastName}
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
                    value={values.vMobileNo}
                    name="vMobileNo"
                    error={!!touched.vMobileNo && !!errors.vMobileNo}
                    helperText={touched.vMobileNo && errors.vMobileNo}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    select
                    fullWidth
                    variant="filled"
                    type="text"
                    label="visitorType"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.visitorType}
                    name="visitorType"
                    error={!!touched.visitorType && !!errors.visitorType}
                    helperText={touched.visitorType && errors.visitorType}
                    sx={{ gridColumn: "span 2" }}
                  >
                    <MenuItem value="Normal">Normal</MenuItem>
                    <MenuItem value="VIP">VIP</MenuItem>
                    <MenuItem value="VVIP">VVIP</MenuItem>
                  </TextField>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Address"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.vAddress}
                    name="vAddress"
                    error={!!touched.vAddress && !!errors.vAddress}
                    helperText={touched.vAddress && errors.vAddress}
                    sx={{ gridColumn: "span 2" }}
                  />
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Save Changes
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

export default AddNewVisitor;
