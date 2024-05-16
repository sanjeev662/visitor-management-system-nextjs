import React, { useEffect, useState } from "react";
import { Box, Button, TextField, useTheme, Typography, MenuItem, Card, CardContent } from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/router";
import AppLayout from "@/components";
import Header from "@/components/Header";
import { tokens } from "../../../src/theme";
import { useAppDispatch, useAppSelector, RootState } from "../../../store";
import { createEmployee } from "../../../store/employees/actions";
import * as yup from "yup";
import AccessDenied from "../../../components/AccessDenied";
import CameraModal from "@/components/ImageCaptures/CameraModel";
import SignatureCapture from "@/components/SignatureCapture/SignatureCapture";

interface FormValues {
  user_name: string;
  password: string;
  shift_time: string;
  designation: string;
  contact_number_l: string;
  contact_number_m: string;
  address: string;
  user_type: string;
  palm_image: string;
  photo_image: string;
}

const AddNewEmployee: React.FC = () => {
  const [palmImage, setPalmImage] = useState("");
  const [selectedRowData, setSelectedRowData] = useState("");
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [isFaceCaptured, setIsFaceCaptured] = useState(false);

  const handleOpenCameraModal = () => {
    setIsFaceCaptured(false);
    setIsCameraModalOpen(true);
  };

  const handleCloseCameraModal = () => {
    setIsCameraModalOpen(false);
    router.push("/dashboard");
  };

  const handleCapturedConfirmed = () => {
    setIsCameraModalOpen(false);
    setIsFaceCaptured(true);
  };

  useEffect(() => {
    handleOpenCameraModal();
  }, []);

  useEffect(() => {
    if (selectedRowData) {
      router.push("/employee/employees");
    }
  }, [selectedRowData]);

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
    cameraAnalysiss: { cameraAnalysisDetails },
  } = useAppSelector((state: RootState) => state);

  const photoImage = cameraAnalysisDetails?.cameraAnalysisArray?.[0] ?? "";
  const cameraImageSrc = photoImage ? `data:image/jpeg;base64,${photoImage}` : "../../noimage.jpg";

  const handleSignatureCapture = (data: string) => {
    setPalmImage(data);
  };

  const handleFormSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    const formattedValues = {
      ...values,
      palm_image: palmImage,
      photo_image: photoImage,
    };
    const response = await dispatch(
      createEmployee(formattedValues, {
        headers: { Authorization: `bearer ${bearerToken}` },
      })
    );
    router.push("/employee/employees");
  };

  const checkoutSchema = yup.object().shape({
    user_name: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
    shift_time: yup.string().required("Shift Time is required"),
    designation: yup.string().required("Designation is required"),
    contact_number_m: yup.string().required("Contact number (Mobile) is required"),
    address: yup.string().required("Address is required"),
    user_type: yup.string().required("User Type is required"),
  });

  const initialValues: FormValues = {
    user_name: "",
    password: "",
    shift_time: "",
    designation: "",
    contact_number_l: "",
    contact_number_m: "",
    address: "",
    user_type: "",
    palm_image: "",
    photo_image: "",
  };

  useEffect(() => {
    if (bearerToken === "") router.push("/auth/login");
  }, [bearerToken]);

  return (
    <AppLayout>
      {user_type !== "admin" ? (
        <AccessDenied />
      ) : (
        <Box m="20px">
          <Header title="REGISTER NEW EMPLOYEE" />

          {!isFaceCaptured && <CameraModal open={isCameraModalOpen} onClose={handleCloseCameraModal} onCaptured={handleCapturedConfirmed} />}
          {isFaceCaptured &&
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
                      label="Username"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.user_name}
                      name="user_name"
                      error={!!touched.user_name && !!errors.user_name}
                      helperText={touched.user_name && errors.user_name}
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="password"
                      label="Password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      name="password"
                      error={!!touched.password && !!errors.password}
                      helperText={touched.password && errors.password}
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Shift Time"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.shift_time}
                      name="shift_time"
                      error={!!touched.shift_time && !!errors.shift_time}
                      helperText={touched.shift_time && errors.shift_time}
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Designation"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.designation}
                      name="designation"
                      error={!!touched.designation && !!errors.designation}
                      helperText={touched.designation && errors.designation}
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Contact Number (Landline)"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.contact_number_l}
                      name="contact_number_l"
                      error={
                        !!touched.contact_number_l && !!errors.contact_number_l
                      }
                      helperText={
                        touched.contact_number_l && errors.contact_number_l
                      }
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Contact Number (Mobile)"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.contact_number_m}
                      name="contact_number_m"
                      error={
                        !!touched.contact_number_m && !!errors.contact_number_m
                      }
                      helperText={
                        touched.contact_number_m && errors.contact_number_m
                      }
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
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      select
                      fullWidth
                      variant="filled"
                      type="text"
                      label="User Type"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.user_type}
                      name="user_type"
                      error={!!touched.user_type && !!errors.user_type}
                      helperText={touched.user_type && errors.user_type}
                      sx={{ gridColumn: "span 4" }}
                    >
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="receptionist">Receptionist</MenuItem>
                      <MenuItem value="guard">Guard</MenuItem>
                    </TextField>

                  </Box>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                      "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                    }}>
                    <Box flex={1} m={1} p={2}>
                      <Card style={{ height: '200px' }}>
                        {cameraImageSrc ? (
                          <img src={cameraImageSrc} alt="Camera" style={{ height: '100%', objectFit: 'cover', padding: '10px' }} />
                        ) : (
                          <CardContent style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography variant="body2" color="textSecondary">
                              No image found
                            </Typography>
                          </CardContent>
                        )}
                      </Card>
                      <Button variant="outlined" color="primary" style={{ marginTop: "5px" }} onClick={handleOpenCameraModal}>
                        Retake Image
                      </Button>
                    </Box>
                    <Box flex={1} m={1} p={2}>
                      <SignatureCapture onCapture={handleSignatureCapture} />
                    </Box>
                  </Box>
                  <Box display="flex" justifyContent="end" mt="20px">
                    <Button type="submit" color="secondary" variant="contained">
                      Register
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          }
        </Box>
      )}
    </AppLayout>
  );
};

export default AddNewEmployee;
