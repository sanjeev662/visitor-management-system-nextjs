import React, { useEffect } from "react";
import { Box, Button, Avatar } from "@mui/material";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import AppLayout from "@/components";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import { useTheme } from "@mui/material";
import { tokens } from "../../../src/theme";
import AccessDenied from "../../../components/AccessDenied";
import { useAppDispatch, useAppSelector, RootState } from "../../../store";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { getEmployees } from "../../../store/employees/actions";

interface Employee {
  user_id: number;
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

const Employees: React.FC = () => {
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
    employees: { employeeDetails },
  } = useAppSelector((state: RootState) => state);

  const datas = employeeDetails?.employeeArray;

  const handleAddNewEmployee = () => {
    router.push({
      pathname: "/employee/addnewemployee",
    });
  };

  useEffect(() => {
    dispatch(
      getEmployees({
        headers: { Authorization: `bearer ${bearerToken}` },
      })
    );
  }, []);

  const columns: GridColDef[] = [
    { field: "user_id", headerName: "ID", flex: 0.5 },
    {
      field: "photo",
      headerName: "Photo",
      flex: 0.5,
      renderCell: (params) => (
        <Avatar
          alt="User Photo"
          src={`data:image/png;base64,${params.row.photo_image}`}
          style={{ width: 70, height: 70 }}
        />
      ),
    },
    { field: "user_name", headerName: "Name", flex: 0.5 },
    { field: "shift_time", headerName: "Shift Time", flex: 0.5 },
    { field: "designation", headerName: "Designation", flex: 0.5 },
    { field: "contact_number_l", headerName: "Contact Number (L)", flex: 0.5 },
    { field: "contact_number_m", headerName: "Contact Number (M)", flex: 0.5 },
    { field: "address", headerName: "Address", flex: 0.5 },
    { field: "user_type", headerName: "User Type", flex: 0.5 },
  ];

  useEffect(() => {
    if (bearerToken === "") router.push("/auth/login");
  }, [bearerToken]);

  return (
    <AppLayout>
      {user_type !== "admin" ? (
        <AccessDenied />
      ) : (
        <Box m="20px">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="Employees" subtitle="List of Employees" />
            <Box>
              <Button
                onClick={handleAddNewEmployee}
                sx={{
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                <PersonAddAltOutlinedIcon sx={{ mr: "10px" }} />
                Add Employee
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
              getRowId={(row) => row.user_id}
              rowHeight={80}
            />
          </Box>
        </Box>
      )}
    </AppLayout>
  );
};

export default Employees;
