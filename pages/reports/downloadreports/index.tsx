import React, { useState, MouseEvent, useEffect } from "react";
import { Box, TextField, useMediaQuery, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import AppLayout from "@/components";
import Header from "@/components/Header";
import AccessDenied from "../../../components/AccessDenied";
import { tokens } from "../../../src/theme";
import {
  useAppDispatch,
  useAppSelector,
  RootState,
} from "../../../store";
import {
  downloadAppointmentReport,
  downloadGateVisitReport,
  downloadVisitorVisitDateReport,
  downloadVisitorReport,
  downloadLoginLogoutReport,
  downloadGateVisitExcelReport,
  downloadVisitorVisitDateExcelReport,
  downloadVisitorExcelReport,
  downloadLoginLogoutExcelReport,
  downloadAppointmentExcelReport
} from "../../../store/reports/actions";

const DownloadReports: React.FC = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

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

  const isDatesValid = startDate && endDate && startDate <= endDate && endDate <= new Date().toISOString().split('T')[0];

  const handleDownloadAppointmentReport = async () => {
    if (isDatesValid) {
      const response = await dispatch(
        downloadAppointmentReport(startDate, endDate, {
          headers: { Authorization: `bearer ${bearerToken}` },
        })
      );
    }
  };
  const handleDownloadGateVisitReport = async () => {
    if (isDatesValid) {
      const response = await dispatch(
        downloadGateVisitReport(startDate, endDate, {
          headers: { Authorization: `bearer ${bearerToken}` },
        })
      );
    }
  };
  const handleDownloadVisitorVisitDateReport = async () => {
    if (isDatesValid) {
      const response = await dispatch(
        downloadVisitorVisitDateReport(startDate, endDate, {
          headers: { Authorization: `bearer ${bearerToken}` },
        })
      );
    }
  };
  const handleDownloadVisitorReport = async () => {
    if (isDatesValid) {
      const response = await dispatch(
        downloadVisitorReport(startDate, endDate, {
          headers: { Authorization: `bearer ${bearerToken}` },
        })
      );
    }
  };
  const handleDownloadLoginLogoutReport = async () => {
    if (isDatesValid) {
      const response = await dispatch(
        downloadLoginLogoutReport(startDate, endDate, {
          headers: { Authorization: `bearer ${bearerToken}` },
        })
      );
    }
  };

  const handleDownloadAppointmentExcelReport = async () => {
    if (isDatesValid) {
      const response = await dispatch(
        downloadAppointmentExcelReport(startDate, endDate, {
          headers: { Authorization: `bearer ${bearerToken}` },
        })
      );
    }
  };
  const handleDownloadGateVisitExcelReport = async () => {
    if (isDatesValid) {
      const response = await dispatch(
        downloadGateVisitExcelReport(startDate, endDate, {
          headers: { Authorization: `bearer ${bearerToken}` },
        })
      );
    }
  };
  const handleDownloadVisitorVisitDateExcelReport = async () => {
    if (isDatesValid) {
      const response = await dispatch(
        downloadVisitorVisitDateExcelReport(startDate, endDate, {
          headers: { Authorization: `bearer ${bearerToken}` },
        })
      );
    }
  };
  const handleDownloadVisitorExcelReport = async () => {
    if (isDatesValid) {
      const response = await dispatch(
        downloadVisitorExcelReport(startDate, endDate, {
          headers: { Authorization: `bearer ${bearerToken}` },
        })
      );
    }
  };
  const handleDownloadLoginLogoutExcelReport = async () => {
    if (isDatesValid) {
      const response = await dispatch(
        downloadLoginLogoutExcelReport(startDate, endDate, {
          headers: { Authorization: `bearer ${bearerToken}` },
        })
      );
    }
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
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Header title="Reports" subtitle="Download Reports By Time Frame" />
          </Box>
          <Box>
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
                label="Start Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                value={startDate}
                onChange={handleStartDateChange}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                label="End Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                value={endDate}
                onChange={handleEndDateChange}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>

            <Box
              display="flex"
              flexDirection={["column", "column", "row"]}
              justifyContent="space-between"
              alignItems="center"
              mt={3}
              gap={2}
            >
              <Button
                variant="contained"
                disabled={!isDatesValid}
                onClick={handleDownloadAppointmentReport}
              >
                Download Appointment pdf Report
              </Button>
              <Button
                variant="contained"
                disabled={!isDatesValid}
                onClick={handleDownloadGateVisitReport}
              >
                Download Gate Visit pdf Report
              </Button>
              <Button
                variant="contained"
                disabled={!isDatesValid}
                onClick={handleDownloadVisitorVisitDateReport}
              >
                Download VisitorVisit Date pdf Report
              </Button>
              <Button
                variant="contained"
                disabled={!isDatesValid}
                onClick={handleDownloadVisitorReport}
              >
                Download Visitor pdf Report
              </Button>
              <Button
                variant="contained"
                disabled={!isDatesValid}
                onClick={handleDownloadLoginLogoutReport}
              >
                Download Login Logout pdf Report
              </Button>
            </Box>

            <Box
              display="flex"
              flexDirection={["column", "column", "row"]}
              justifyContent="space-between"
              alignItems="center"
              mt={3}
              gap={2}
            >
              <Button
                variant="contained"
                disabled={!isDatesValid}
                onClick={handleDownloadAppointmentExcelReport}
              >
                Download Appointment Excel Report
              </Button>
              <Button
                variant="contained"
                disabled={!isDatesValid}
                onClick={handleDownloadGateVisitExcelReport}
              >
                Download Gate Visit Excel Report
              </Button>
              <Button
                variant="contained"
                disabled={!isDatesValid}
                onClick={handleDownloadVisitorVisitDateExcelReport}
              >
                Download VisitorVisit Date Excel Report
              </Button>
              <Button
                variant="contained"
                disabled={!isDatesValid}
                onClick={handleDownloadVisitorExcelReport}
              >
                Download Visitor Excel Report
              </Button>
              <Button
                variant="contained"
                disabled={!isDatesValid}
                onClick={handleDownloadLoginLogoutExcelReport}
              >
                Download Login Logout Excel Report
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </AppLayout>
  );
};

export default DownloadReports;

