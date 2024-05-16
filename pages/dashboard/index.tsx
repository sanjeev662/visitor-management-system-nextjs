import React, { useEffect } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import AppLayout from "@/components";
import Header from "@/components/Header/index";
import StatBox from "@/components/StatBox/index";
import { tokens } from "../../src/theme";
import { useRouter } from "next/router";
import AccessDenied from "../../components/AccessDenied";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { useAppDispatch, useAppSelector, RootState } from "../../store";
import { getDashboardDetails } from "../../store/dashboard/actions";

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    application: {
      bearerToken,
      user_type,
      apiState: { status, isError, message },
      isLoginError,
    },
    dashboard: { today_appointment, today_checkOut, today_checkIn, today_visitor_visit },
  } = useAppSelector((state: RootState) => state);

  const handleAddNewVisitor = () => {
    router.push({
      pathname: "/visitor/addnewvisitors"
    });
  };

  const handleCreateNewAppointment = () => {
    router.push({
      pathname: "/appointment/createappointment",
    });
  };

  useEffect(() => {
    if (bearerToken === "") {
      router.push("/auth/login");
    } else {
      dispatch(
        getDashboardDetails({
          headers: { Authorization: `bearer ${bearerToken}` },
        })
      );
    }
  }, [bearerToken]);

  return (
    <AppLayout>

      {user_type !== "admin" && user_type !== "receptionist" ? (
        <AccessDenied />
      ) : (
        <Box m="20px">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

            <Box>
              <Button
                onClick={handleCreateNewAppointment}
                sx={{
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                }}
              >
                <CalendarTodayOutlinedIcon sx={{ mr: "10px" }} />
                Create Appointment
              </Button>
              <Button
                onClick={handleAddNewVisitor}
                sx={{
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  marginLeft: "6px"
                }}
              >
                <PersonAddAltOutlinedIcon sx={{ mr: "10px" }} />
                Add Visitor
              </Button>
            </Box>
          </Box>

          <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="140px"
            gap="20px"
          >
            {/* ROW 1 */}
            <Box
              gridColumn="span 3"
              sx={{
                backgroundColor: colors.primary[400],
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <StatBox
                title={today_checkIn?.toString()}
                subtitle="Today CheckIns"
                progress="0.75"
                increase="+14%"
                icon={
                  <LoginIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
            <Box
              gridColumn="span 3"
              sx={{
                backgroundColor: colors.primary[400],
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <StatBox
                title={today_checkOut?.toString()}
                subtitle="Today CheckOuts"
                progress="0.50"
                increase="+21%"
                icon={
                  <LogoutIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
            <Box
              gridColumn="span 3"
              sx={{
                backgroundColor: colors.primary[400],
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <StatBox
                title={today_visitor_visit?.toString()}
                subtitle="Today Visitors Visit"
                progress="0.80"
                increase="+43%"
                icon={
                  <TrafficIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
            <Box
              gridColumn="span 3"
              sx={{
                backgroundColor: colors.primary[400],
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <StatBox
                title={today_appointment?.toString()}
                subtitle="Appointment Created"
                progress="0.30"
                increase="+5%"
                icon={
                  <PersonAddIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
          </Box>
        </Box>
      )}
    </AppLayout>
  );
};

export default Dashboard;
