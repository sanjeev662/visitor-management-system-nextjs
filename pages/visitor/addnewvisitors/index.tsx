import React, { useEffect, useState } from "react";
import { Box, Button, TextField, useTheme, Typography, MenuItem, InputAdornment, CardContent, Card } from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/router";
import AppLayout from "@/components";
import Header from "@/components/Header";
import { tokens } from "../../../src/theme";
import { useAppDispatch, useAppSelector, RootState } from "../../../store";
import { createVisitor } from "../../../store/visitors/actions";
import * as yup from "yup";
import AccessDenied from "../../../components/AccessDenied";
import SignatureCapture from "@/components/SignatureCapture/SignatureCapture";
import CameraModal from "@/components/ImageCaptures/CameraModel";
import FaceAnalysisModel from "../../../components/ImageCaptures/FaceAnalysisModel";

interface FormValues {
  vFirstName: string;
  vLastName: string;
  govID: string;
  vMobileNo: string;
  vAddress: string;
  visitorType: string;
  vPhoto: string;
  vSignature: string;
}

interface PropsData {
  indexNo: number;
  appointmentId: number;
  fName: string;
  lName: string;
  govID: string;
  address: string;
  mobileNo: string;
  generateAppointmentTime: string;
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
    cameraAnalysiss: { cameraAnalysisDetails, visitorFaceAnalysisDetails },
    cameraAnalysiss: { todayfName, todayMobNo, todayImage }
  } = useAppSelector((state: RootState) => state);

  const [vSignature, setVsignature] = useState("");
  const [selectedRowData, setSelectedRowData] = useState("");
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [isNewVisitor, setIsNewVisitor] = useState(false);
  const [isFaceCaptured, setIsFaceCaptured] = useState(false);
  const datas = cameraAnalysisDetails.cameraAnalysisArray;
  const cameraImageSrc = todayImage ? `data:image/jpeg;base64,${todayImage}` : "../../noimage.jpg";

  const handleSignatureCapture = (data: string) => {
    setVsignature(data);
  };

  const handleFormSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    const formattedValues = {
      ...values,
      vPhoto: todayImage,
      vSignature: vSignature,
    };
    await dispatch(
      createVisitor(formattedValues, {
        headers: { Authorization: `bearer ${bearerToken}` },
      })
    );
    router.push("/visitor/visitors");
  };

  const checkoutSchema = yup.object().shape({
    vFirstName: yup
      .string()
      .required("First Name is required")
      .matches(/^[A-Za-z]+$/, 'First Name can only contain alphabets'),
    vLastName: yup
      .string()
      .required("Last Name is required")
      .matches(/^[A-Za-z]+$/, 'Last Name can only contain alphabets'),
    vMobileNo: yup
      .string()
      .required("Mobile number is required")
      .matches(/^[0-9]+$/, 'Mobile number can only contain numbers'),
    vAddress: yup.string().required("Address is required"),
    govID: yup.string().required("Government ID is required"),
    visitorType: yup.string().required("visitorType is required"),
  });

  const initialValues: FormValues = {
    vFirstName: data?.fName || todayfName || "",
    vLastName: data?.lName || "",
    govID: data?.govID || "",
    vMobileNo: data?.mobileNo || todayMobNo || "",
    vAddress: data?.address || "",
    visitorType: "Normal",
    vPhoto: todayImage || "",
    vSignature: "",
  };

  const handleOpenCameraModal = () => {
    setIsFaceCaptured(false);
    setIsCameraModalOpen(true);
  };

  const handleCloseCameraModal = () => {
    setIsCameraModalOpen(false);
    router.push("/dashboard");
  };

  const handleCloseFaceAnalysisModal = () => {
    handleOpenCameraModal();
  };

  const handleNoMatch = () => {
    setIsNewVisitor(true);
  };

  const handleCapturedConfirmed = () => {
    setIsCameraModalOpen(false);
    setIsFaceCaptured(true);
  };

  useEffect(() => {
    if (selectedRowData) {
      router.push("/visitor/visitors");
    }
  }, [selectedRowData]);

  useEffect(() => {
    handleOpenCameraModal();
  }, []);

  useEffect(() => {
    if (bearerToken === "") router.push("/auth/login");
  }, [bearerToken]);

  return (
    <AppLayout>
      {user_type !== "admin" && user_type !== "receptionist" ? (
        <AccessDenied />
      ) : (
        <>
          {!isFaceCaptured && <CameraModal open={isCameraModalOpen} onClose={handleCloseCameraModal} onCaptured={handleCapturedConfirmed} />}
          {isFaceCaptured && <FaceAnalysisModel onNoMatch={handleNoMatch} onCloseFaceAnalysis={handleCloseFaceAnalysisModal} appointmentData={data} />}
          {isNewVisitor &&
            <Box m="20px">
              <Header title="REGISTER NEW VISITOR" />

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
                        disabled
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
                      </Box>
                      <Box flex={1} m={1} p={2}>
                        <SignatureCapture onCapture={handleSignatureCapture} />
                      </Box>
                    </Box>
                    <Box display="flex" justifyContent="end" mt="20px">
                      <Button type="submit" color="secondary" variant="contained">
                        REGISTER
                      </Button>
                    </Box>
                  </form>
                )}
              </Formik>
            </Box>}
        </>)}
    </AppLayout>
  );
};

export default AddNewVisitor;
