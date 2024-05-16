import React, { useEffect } from "react";
import { departmentOptions } from '../../../utils/data/departmentOptions';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Box, Button, TextField, useTheme } from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/router";
import AppLayout from "@/components";
import Header from "@/components/Header";
import { tokens } from "../../../src/theme";
import AccessDenied from "../../../components/AccessDenied";
import { useAppDispatch, useAppSelector, RootState } from "../../../store";
import { createPass } from "../../../store/pass/actions";
import * as yup from "yup";

interface FormValues {
  toMeet: string;
  department: string;
  allowedGates: string;
  validFor: string;
  purpose: string;
  daysImage: string;
  visitorId: string;
}

interface PropsData {
  id: number;
  visitorId: string;
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

const GeneratePass: React.FC = () => {
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
    cameraAnalysiss: { todayfName, todayMobNo, todayImage }
  } = useAppSelector((state: RootState) => state);

  const handleFormSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    const formattedValues = { ...values };

    if (formattedValues.validFor) {
      const selectedDuration = values.validFor;
      let endDate;
      switch (selectedDuration) {
        case 'oneDay':
          endDate = new Date();
          endDate.setHours(18, 0, 0, 0);
          break;
        case 'oneWeek':
          endDate = new Date();
          endDate.setDate(endDate.getDate() + 6);
          endDate.setHours(18, 0, 0, 0);
          break;
        case 'threeMonths':
          endDate = new Date();
          endDate.setMonth(endDate.getMonth() + 3);
          endDate.setDate(endDate.getDate() - 1);
          endDate.setHours(18, 0, 0, 0);
          break;
        default:
          endDate = null;
      }
      const formattedEndDate = endDate
        ? endDate.toISOString().slice(0, -1) + 'Z'
        : '';
      formattedValues.validFor = formattedEndDate;
    }

    const response = await dispatch(
      createPass(formattedValues, {
        headers: { Authorization: `bearer ${bearerToken}` },
      })
    );
    router.push("/visitor/visitors");
  };

  const checkoutSchema = yup.object().shape({
    toMeet: yup.string().required("To Meet is required"),
    department: yup.string().required("Department is required"),
    validFor: yup.string().required("Valid For is required"),
    purpose: yup.string().required("Purpose is required"),
    visitorId: yup.string().required("Visitor ID is required"),
  });

  const initialValues: FormValues = {
    toMeet: "",
    department: "",
    allowedGates: "",
    validFor: "",
    purpose: "",
    daysImage: todayImage || data?.vPhoto || "",
    visitorId: data?.visitorId || "",
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
          <Header title="GENERATE NEW PASS" />

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
                    label="To Meet"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.toMeet}
                    name="toMeet"
                    error={!!touched.toMeet && !!errors.toMeet}
                    helperText={touched.toMeet && errors.toMeet}
                    sx={{ gridColumn: "span 2" }}
                  />

                  <TextField
                    select
                    fullWidth
                    variant="filled"
                    label="Department"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.department}
                    name="department"
                    error={!!touched.department && !!errors.department}
                    helperText={touched.department && errors.department}
                    sx={{ gridColumn: "span 2" }}
                  >
                    <MenuItem value="">Select a department</MenuItem>
                    {departmentOptions.map((department) => (
                      <MenuItem key={department} value={department}>{department}</MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    select
                    label="Valid For"
                    name="validFor"
                    type="text"
                    fullWidth
                    variant="filled"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.validFor}
                    error={!!touched.validFor && !!errors.validFor}
                    helperText={touched.validFor && errors.validFor}
                    sx={{ gridColumn: "span 2" }}
                  >
                    <MenuItem value="oneDay">One Day</MenuItem>
                    <MenuItem value="oneWeek">One Week</MenuItem>
                    <MenuItem value="threeMonths">Three Months</MenuItem>
                  </TextField>


                  <TextField
                    select
                    fullWidth
                    variant="filled"
                    label="Purpose"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.purpose}
                    name="purpose"
                    error={!!touched.purpose && !!errors.purpose}
                    helperText={touched.purpose && errors.purpose}
                    sx={{ gridColumn: "span 2" }}
                  >
                    <MenuItem value="">Select a purpose</MenuItem>
                    <MenuItem value="Official">Official</MenuItem>
                    <MenuItem value="Personal">Personal</MenuItem>
                  </TextField>
                  
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Visitor ID"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.visitorId}
                    name="visitorId"
                    error={!!touched.visitorId && !!errors.visitorId}
                    helperText={touched.visitorId && errors.visitorId}
                    sx={{ gridColumn: "span 2" }}
                    disabled
                  />
                </Box>

                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Generate Pass
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

export default GeneratePass;
