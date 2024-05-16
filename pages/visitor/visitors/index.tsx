import React, { useEffect, useState } from "react";
import { Box, Avatar, Button } from "@mui/material";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import AppLayout from "@/components";
import Header from "@/components/Header";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useTheme } from "@mui/material";
import { tokens } from "../../../src/theme";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector, RootState } from "../../../store";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import AccessDenied from "../../../components/AccessDenied";
import {
  getVisitorDetails,
  blackListVisitor,
  unblackListVisitor,
} from "../../../store/visitors/actions";

interface Visitor {
  id: number;
  visitorId: number;
  indexId: number;
  vFirstName: string;
  vLastName: string;
  govID: string;
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

const Visitors: React.FC = () => {
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
    visitors: { visitorDetails },
  } = useAppSelector((state: RootState) => state);

  const [pageno, setPageNo] = useState<string>("1");
  const [selectedAction, setSelectedAction] = useState<string>("");

  const datas = visitorDetails?.visitorArray;
  const visitorCount = visitorDetails.count || 0;
  const visitorNext = visitorDetails.next || null;
  const visitorPrev = visitorDetails.previous || null;

  const handleClickNext = () => {
    if (visitorNext) {
      const urlObject = new URL(visitorNext);
      const pageValue = urlObject.searchParams.get('page') || "";
      setPageNo(pageValue);
      handleGetVisitors(pageValue);
    }
  }

  const handleClickPrev = () => {
    if (visitorPrev) {
      const urlObject = new URL(visitorPrev);
      const pageValue = urlObject.searchParams.get('page') || "";
      setPageNo(pageValue);
      handleGetVisitors(pageValue || '1');
    }
  }

  const handleGetVisitors = async (pageno: string) => {
    try {
      await dispatch(getVisitorDetails(pageno, {
        headers: { Authorization: `bearer ${bearerToken}` },
      }));
    } catch (error) {
      console.error('Error dispatching getAllAppointments:', error);
    }
  };

  const handleAddNewVisitor = () => {
    router.push({
      pathname: "/visitor/addnewvisitors"
    });
  };

  const generatePass = (data: Visitor) => {
    router.push({
      pathname: "/passes/generatepass",
      query: { datas: JSON.stringify(data) },
    });
  };

  const editVisitor = (data: Visitor) => {
    router.push({
      pathname: "/visitor/editvisitorinfo",
      query: { datas: JSON.stringify(data) },
    });
  };

  const blackLists = async (data: Visitor) => {
    await dispatch(
      blackListVisitor(data, {
        headers: { Authorization: `bearer ${bearerToken}` },
      })
    );
    handleGetVisitors(pageno);
  };

  const unblacklists = async (data: Visitor) => {
    await dispatch(
      unblackListVisitor(data, {
        headers: { Authorization: `bearer ${bearerToken}` },
      })
    );
    handleGetVisitors(pageno);
  };

  useEffect(() => {
    handleGetVisitors(pageno);
  }, []);

  const handleActionChange = async (event: SelectChangeEvent<string>, params: any) => {
    const selectedAction = event.target.value as string;

    if (selectedAction === "pass") {
      generatePass(params.row);
    } else if (selectedAction === "editvisitor") {
      editVisitor(params.row);
    } else if (selectedAction === "blacklist") {
      await blackLists(params.row);
    } else if (selectedAction === "unblacklist") {
      await unblacklists(params.row);
    }
    setSelectedAction("");
  };

  const columns: GridColDef[] = [
    { field: "visitorId", headerName: "ID", flex: 0.5 },
    {
      field: "photo",
      headerName: "Photo",
      flex: 0.5,
      renderCell: (params) => (
        <Avatar
          alt="User Photo"
          src={`data:image/png;base64,${params.row.vPhoto}`}
          style={{ width: 70, height: 70 }}
        />
      ),
    },
    { field: "vFirstName", headerName: "Name", flex: 0.5 },
    { field: "govID", headerName: "Government ID", flex: 0.7 },
    { field: "vAddress", headerName: "Address", flex: 0.5 },
    { field: "vMobileNo", headerName: "Mobile No", flex: 0.5 },
    { field: "visitorType", headerName: "Visitor Type", flex: 0.4 },
    { field: "blacklisted", headerName: "Blacklisted", flex: 0.4 },
    {
      field: "vCommingDate",
      headerName: "Coming Date",
      flex: 0.5,
      valueFormatter: (params) =>
        new Date(params.value).toLocaleString("en-IN"),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 0.4,
      renderCell: (params) => (
        <>
          {params.row.blacklisted ? (
            <>
              <Select
                value={selectedAction}
                onChange={(e) => handleActionChange(e, params)}
                sx={{ marginRight: 1 }}
              >
                <MenuItem value="unblacklist">UnblackList</MenuItem>
              </Select>
            </>
          ) : (
            <>
              <Select
                value={selectedAction}
                onChange={(e) => handleActionChange(e, params)}
                sx={{ marginRight: 1 }}
              >
                <MenuItem value="pass">Generate Pass</MenuItem>
                <MenuItem value="blacklist">Blacklist</MenuItem>
                <MenuItem value="editvisitor">Edit Info</MenuItem>
              </Select>
            </>
          )}
        </>
      ),
    },
  ];

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
            <Header title="VISITORS" subtitle="List of Visitors" />
            <Box>
              <Button
                onClick={handleAddNewVisitor}
                sx={{
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                <PersonAddAltOutlinedIcon sx={{ mr: "10px" }} />
                Add Visitor
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
              getRowId={(row) => row.visitorId}
              rowHeight={80}
              hideFooterPagination
            />
            <Button onClick={handleClickPrev} disabled={pageno === "1" || pageno === "0"}>Previous Page</Button>
            <Button onClick={handleClickNext} disabled={pageno === `${visitorCount / 10}`}>Next Page</Button>
          </Box>
        </Box>)}
    </AppLayout>
  );
};

export default Visitors;
