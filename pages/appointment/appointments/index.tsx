import React, { useEffect, useState } from "react";
import AccessDenied from "@/components/AccessDenied";
import Loading from "@/components/Loading";
import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import AppLayout from "@/components";
import Header from "@/components/Header";
import { useTheme } from "@mui/material";
import { tokens } from "../../../src/theme";
import { useRouter } from "next/router";
import MenuItem from "@mui/material/MenuItem";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useAppDispatch, useAppSelector, RootState } from "../../../store";
import {
  getAllAppointments,
  cancelAppointment,
} from "../../../store/appointments/actions";
import { Padding } from "@mui/icons-material";

interface Appointment {
  indexNo: number;
  appointmentId: number;
  fName: string;
  lName: string;
  AppointmentTime: string;
  vehicleNo: string;
  address: string;
  mobileNo: string;
  authorizedBy: string | null;
  empId: string;
  generateAppointmentTime: string;
  appointmentCancelledAt: boolean;
}

const Appointments: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const router = useRouter();

  const {
    application: {
      bearerToken,
      user_type,
      apiState: { status, isError, message },
      isLoginError,
    },
    allAppointments: { allAppointmentDetails },
  } = useAppSelector((state: RootState) => state);

  const [pageno, setPageNo] = useState<string>("1");
  const [selectedAction, setSelectedAction] = useState<string>("");

  const datas = allAppointmentDetails.appointmentArray || [];
  const appointmentCount = allAppointmentDetails.count || 0;
  const appointmentNext = allAppointmentDetails.next || null;
  const appointmentPrev = allAppointmentDetails.previous || null;

  const handleClickNext = () => {
    if (appointmentNext) {
      const urlObject = new URL(appointmentNext);
      const pageValue = urlObject.searchParams.get('page') || "";
      setPageNo(pageValue);
      handleGetAppointments(pageValue);
    }
  }

  const handleClickPrev = () => {
    if (appointmentPrev) {
      const urlObject = new URL(appointmentPrev);
      const pageValue = urlObject.searchParams.get('page') || "";
      setPageNo(pageValue);
      handleGetAppointments(pageValue || '1');
    }
  }

  const handleGetAppointments = async (pageno: string) => {
    try {
      await dispatch(getAllAppointments(pageno, {
        headers: { Authorization: `bearer ${bearerToken}` },
      }));
    } catch (error) {
      console.error('Error dispatching getAllAppointments:', error);
    }
  };

  const cancelAppointments = async (data: Appointment) => {
    await dispatch(
      cancelAppointment(data, {
        headers: { Authorization: `bearer ${bearerToken}` },
      })
    );
    handleGetAppointments(pageno);
  };

  const handleContinue = (data: Appointment) => {
    router.push({
      pathname: "/visitor/addnewvisitors",
      query: { datas: JSON.stringify(data) },
    });
  };

  const handleActionChange = async (event: SelectChangeEvent<string>, params: any) => {
    const selectedAction = event.target.value as string;
    if (selectedAction === "cancelappointments") {
      cancelAppointments(params.row);
    } else if (selectedAction === "handlecontinue") {
      handleContinue(params.row);
    }
    setSelectedAction("");
  };

  useEffect(() => {
    handleGetAppointments(pageno);
  }, [dispatch, bearerToken]);

  const columns: GridColDef[] = [
    { field: "appointmentId", headerName: "ID", flex: 0.5 },
    { field: "fName", headerName: "Name", flex: 0.5 },
    { field: "AppointmentTime", headerName: "Appointment Time", flex: 0.5 },
    { field: "govID", headerName: "Government ID", flex: 0.5 },
    { field: "address", headerName: "Address", flex: 0.5 },
    { field: "mobileNo", headerName: "Mobile No", flex: 0.5 },
    {
      field: "action",
      headerName: "Action",
      flex: 0.3,
      renderCell: (params) => (
        <>
          {params.row.appointmentCancelledAt ? (
            <Select sx={{ marginRight: 1 }}>
              <MenuItem value="" disabled> Cancelled</MenuItem>
            </Select>
          ) : (
            <Select
              value={selectedAction}
              onChange={(e) => handleActionChange(e, params)}
              sx={{ marginRight: 1 }}
            >
              <MenuItem value="handlecontinue">Continue</MenuItem>
              <MenuItem value="cancelappointments">Cancel</MenuItem>
            </Select>
          )}
        </>
      ),
    },
  ];

  const handleCreateNewAppointment = () => {
    router.push({
      pathname: "/appointment/createappointment",
    });
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
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="Appointments" subtitle="Welcome to your Appointments" />
            <Box>
              <Button
                onClick={handleCreateNewAppointment}
                sx={{
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                <CalendarTodayOutlinedIcon sx={{ mr: "10px" }} />
                Create Appointment
              </Button>
            </Box>
          </Box>
          <Box
            m="20px 0 0 0"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.greenAccent[300],
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
              },
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${colors.grey[100]} !important`,
              },
            }}
          >
            <DataGrid
              rows={datas || []}
              columns={columns}
              components={{ Toolbar: GridToolbar }}
              getRowId={(row) => row.appointmentId}
              rowHeight={80}
              hideFooterPagination
            />
            <Button onClick={handleClickPrev} disabled={pageno === "1" || pageno === "0"}>Previous Page</Button>
            <Button onClick={handleClickNext} disabled={pageno === `${appointmentCount / 10}`}>Next Page</Button>
          </Box>
        </Box>
      )}
    </AppLayout>
  );
};

export default Appointments;
