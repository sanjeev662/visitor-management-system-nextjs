import React, { useEffect, useState } from "react";
import { AppConfig } from "../../config/config";
import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  Grid,
  Modal,
  Card,
  CardContent,
  TextField,
} from "@mui/material";
import AppLayout from "@/components";
import { post } from "../../utils/http";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import { tokens } from "../../src/theme";
import AccessDenied from "../../components/AccessDenied";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { useAppDispatch, useAppSelector, RootState } from "../../store";
import Footer from "@/components/Footer";
const MySwal = withReactContent(Swal);

interface ApiResponse {
  visitorId: string;
  daysImage: string;
  ToMeet: string;
  visitorName: string;
  message: string;
}

const Guard: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const router = useRouter();

  const handleAdamDetails = () => {
    router.push({
      pathname: "/guard/addadamdetail",
    });
  };

  const {
    application: {
      bearerToken,
      user_type,
      apiState: { status, isError, message },
      isLoginError,
    },
    visitors: { visitorDetails },
  } = useAppSelector((state: RootState) => state);

  const imageData = visitorDetails.visitorsByImageArray;

  const [currentResponse, setCurrentResponse] = useState<ApiResponse | null>(
    null
  );
  const [previousResponses, setPreviousResponses] = useState<ApiResponse[]>([]);
  const [scannedData, setScannedData] = useState<string>("");
  const [storedData, setStoredData] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const [gateStatus, setGateStatus] = useState<string>("entry");

  const handleToggleGateStatus = () => {
    setGateStatus((prevStatus) => (prevStatus === "entry" ? "exit" : "entry"));
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      fetchData(scannedData);
    } else {
      setScannedData((prevData) => prevData + event.key);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [scannedData]);


  const handleButtonClick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const videoElement = document.createElement("video");
      videoElement.srcObject = stream;
      await videoElement.play();

      const canvas = document.createElement("canvas");
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      canvas.getContext("2d")?.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

      const imageData = canvas.toDataURL("image/jpeg");

      const base64ImageWithoutPrefix = imageData.replace(
        /^data:image\/jpeg;base64,/,
        ""
      );
      stream.getTracks().forEach((track) => track.stop());
      return base64ImageWithoutPrefix;
    } catch (error) {
      throw new Error("There was a problem accessing the camera.");
    }
  };

  function extractNumericSubstring(data: string) {
    const regex = /(\d{18})\D*$/;
    const match = data.match(regex);
    if (match) {
      return match[1];
    } else {
      return "0".repeat(18);
    }
  }

  const fetchData = async (data: string) => {
    const numberStr = data?.toString();
    const extractedNumber = extractNumericSubstring(numberStr);
    if (extractedNumber) {
      try {
        const todayImage = await handleButtonClick();

        if (todayImage) {
          const { data } = await post(
            `${AppConfig.REACT_APP_API_HOSTNAME}/passes/view_passs/${extractedNumber}/${gateStatus}/`,
            { image: todayImage },
            {
              headers: {
                Authorization: `bearer ${bearerToken}`,
              },
            }
          );
          setStoredData("");
          setScannedData("");

          setCurrentResponse(data);
          setPreviousResponses((prevResponses) => {
            const updatedResponses = [data, ...prevResponses.slice(0, 3)];
            return updatedResponses;
          });
        } else {
          alert("Take Clear Image");
        }
      } catch (error: any) {
        let errorMessage = "Try Again!";
        if (
          error.response &&
          error.response.data &&
          typeof error.response.data.error === "string"
        ) {
          errorMessage = error.response.data.error;
        }
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: errorMessage,
          timer: 2500,
          timerProgressBar: true,
        });

        setStoredData("");
        setScannedData("");
      }
    }
  };

  useEffect(() => {
    if (bearerToken === "") router.push("/auth/login");
  }, [bearerToken]);

  return (
    <AppLayout>
      {user_type !== "guard" ? (
        <AccessDenied />
      ) : (
        <>
          <Box m="20px" height="calc(100vh - 200px)">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Header title="WELCOME" subtitle="Visitor Details" />
              <Box>
                <Button
                  onClick={handleToggleGateStatus}
                  sx={{
                    backgroundColor: colors.blueAccent[700],
                    color: colors.grey[100],
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "10px 20px",
                    m: "2px",
                  }}
                >
                  {gateStatus === "exit" ? "Exit" : "Entry"}
                </Button>
                <Button
                  onClick={handleAdamDetails}
                  sx={{
                    backgroundColor: colors.blueAccent[700],
                    color: colors.grey[100],
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "10px 20px",
                  }}
                >
                  <PersonAddAltOutlinedIcon sx={{ mr: "10px" }} />
                  Add Adam Details
                </Button>
              </Box>
            </Box>
           
            <Box
              display="grid"
              height="85vh"
              maxHeight="85vh"
              gridTemplateColumns={{
                xs: "repeat(12, 1fr)",
                md: "repeat(12, 1fr)",
                lg: "repeat(15, 1fr)",
              }}
              gridTemplateRows={{
                xs: "repeat(6, 1fr)",
                md: "repeat(6, 1fr)",
                lg: "repeat(6, 1fr)",
              }}
              gridAutoRows="58px"
              gap="20px"
              sx={{ paddingBottom: "100px" }}
            >
              <Box
                gridColumn={{ xs: "span 12", md: "span 12", lg: "span 5" }}
                gridRow={{ xs: "span 2", md: "span 3", lg: "span 6" }}
                gridTemplateColumns={{
                  xs: "repeat(6, 1fr)",
                  md: "repeat(6, 1fr)",
                  lg: "repeat(6, 1fr)",
                }}
                sx={{
                  backgroundColor: colors.primary[400],
                  overflow: "auto",
                  padding: 2,
                  display: "grid",
                  gap: "5px",
                }}
              >
                <Box
                  gridColumn={{ xs: "span 3", md: "span 3", lg: "span 6" }}
                  gridRow={{ xs: "span 6", md: "span 6", lg: "span 4" }}
                  borderRadius="10px"
                  overflow="hidden"
                >
                  <img
                    src={
                      previousResponses[0]?.daysImage
                        ? `data:image/jpeg;base64,${previousResponses[0]?.daysImage}`
                        : "../../noimage.jpg"
                    }
                    alt="Your Image"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>

                <Box
                  gridColumn={{ xs: "span 3", md: "span 3", lg: "span 6" }}
                  gridRow={{ xs: "span 6", md: "span 6", lg: "span 2" }}
                  sx={{
                    backgroundColor: colors.primary[400],
                    borderRadius: "10px",
                    overflow: "hidden",
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  <Box
                    display="grid"
                    gridColumn={{ xs: "span 3", md: "span 3", lg: "span 6" }}
                    gridTemplateColumns={{
                      xs: "repeat(1, 1fr)",
                      md: "repeat(1, 1fr)",
                      lg: "repeat(6, 1fr)",
                    }}
                    gap="10px"
                  >
                    <Box
                      p={1}
                      textAlign="center"
                      gridColumn={{ xs: "span 1", md: "span 1", lg: "span 2" }}
                    >
                      <Typography
                        variant="h4"
                        align="center"
                        sx={{ color: colors.grey[100], fontWeight: "bold" }}
                      >
                        Name
                      </Typography>
                      <Typography
                        variant="h4"
                        align="center"
                        sx={{
                          color: colors.greenAccent[500],
                          fontWeight: "bold",
                        }}
                      >
                        {previousResponses[0]?.visitorName}
                      </Typography>
                    </Box>

                    <Box
                      p={1}
                      textAlign="center"
                      gridColumn={{ xs: "span 1", md: "span 1", lg: "span 2" }}
                    >
                      <Typography
                        variant="h4"
                        align="center"
                        sx={{ color: colors.grey[100], fontWeight: "bold" }}
                      >
                        To-Meet
                      </Typography>
                      <Typography
                        variant="h4"
                        align="center"
                        sx={{
                          color: colors.greenAccent[500],
                          fontWeight: "bold",
                        }}
                      >
                        {previousResponses[0]?.ToMeet}
                      </Typography>
                    </Box>

                    <Box
                      p={1}
                      textAlign="center"
                      gridColumn={{ xs: "span 1", md: "span 1", lg: "span 2" }}
                    >
                      <Typography
                        variant="h4"
                        align="center"
                        sx={{ color: colors.grey[100], fontWeight: "bold" }}
                      >
                        Access
                      </Typography>
                      <Typography
                        variant="h4"
                        align="center"
                        sx={{
                          color: colors.greenAccent[500],
                          fontWeight: "bold",
                        }}
                      >
                        {previousResponses[0]?.message}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
              {previousResponses?.map((response, index) => (
                <Box
                  key={index}
                  gridColumn={{ xs: "span 6", md: "span 3", lg: "span 5" }}
                  gridRow={{ xs: "span 2", md: "span 3", lg: "span 3" }}
                  sx={{
                    backgroundColor: colors.primary[400],
                    overflow: "auto",
                    padding: 2,
                    display: "grid",
                    gridTemplateColumns: "repeat(6, 1fr)",
                    gridTemplateRows: "repeat(6, 1fr)",
                    gap: "5px",
                  }}
                >
                  <Box
                    gridColumn={{ xs: "span 6", md: "span 6", lg: "span 3" }}
                    gridRow={{ xs: "span 4", md: "span 4", lg: "span 6" }}
                    borderRadius="10px"
                    overflow="hidden"
                  >
                    <img
                      src={
                        response.daysImage
                          ? `data:image/jpeg;base64,${response.daysImage}`
                          : "../../noimage.jpg"
                      }
                      alt="Your Image"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                  <Box
                    gridColumn={{ xs: "span 6", md: "span 6", lg: "span 3" }}
                    gridRow={{ xs: "span 2", md: "span 2", lg: "span 6" }}
                    sx={{
                      backgroundColor: colors.primary[400],
                    }}
                  >
                    <Box justifyContent="space-between">
                      <Box>
                        <Typography
                          variant="h5"
                          fontWeight="bold"
                          align="center"
                          p={1}
                          sx={{ color: colors.grey[100] }}
                        >
                          DETAILS
                        </Typography>
                      </Box>
                      {/* <Box justifyContent="space-between" mt="2px"> */}
                      <Box
                        display="grid"
                        gridTemplateColumns={{
                          xs: "repeat(3, 1fr)",
                          md: "repeat(3, 1fr)",
                          lg: "repeat(1, 1fr)",
                        }}
                        gap="10px"
                      >
                        <Box p={1} textAlign="center">
                          <Typography
                            variant="h5"
                            align="center"
                            sx={{ color: colors.grey[100] }}
                          >
                            Name
                          </Typography>
                          <Typography
                            variant="h5"
                            align="center"
                            sx={{ color: colors.greenAccent[500] }}
                          >
                            {response.visitorName}
                          </Typography>
                        </Box>
                        <Box p={1} textAlign="center">
                          <Typography
                            variant="h5"
                            align="center"
                            sx={{ color: colors.grey[100] }}
                          >
                            Meet
                          </Typography>
                          <Typography
                            variant="h5"
                            align="center"
                            sx={{ color: colors.greenAccent[500] }}
                          >
                            {response.ToMeet}
                          </Typography>
                        </Box>
                        <Box p={1} textAlign="center">
                          <Typography
                            variant="h5"
                            align="center"
                            sx={{ color: colors.grey[100] }}
                          >
                            Access
                          </Typography>
                          <Typography
                            variant="h5"
                            align="center"
                            sx={{ color: colors.greenAccent[500] }}
                          >
                            {response.message}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
          {/* <Footer /> */}
        </>
      )}
    </AppLayout>
  );
};

export default Guard;
