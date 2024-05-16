import React, { useEffect, useState } from "react";
import { Box, Avatar, Button, Typography } from "@mui/material";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import AppLayout from "@/components";
import Header from "@/components/Header";
import { useTheme } from "@mui/material";
import { tokens } from "../../../src/theme";
import { useRouter } from "next/router";
import PassView from "../../../components/PassView";
import AccessDenied from "../../../components/AccessDenied";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useAppDispatch, useAppSelector, RootState } from "../../../store";
import { cancelPass, getVisitorPassByTime } from "../../../store/pass/actions";

interface PassDetails {
  barcode: string;
  indexId: number;
  passNumber: number;
  vDate: string;
  toMeet: string;
  department: string;
  noOfItems: string;
  allowedGates: string;
  validFor: string;
  authoByWhome: string;
  purpose: string;
  access: boolean;
  daysImage: string;
  passCancelledAt: string;
  visitorId: number;
}

const ViewAndCancelPass: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    application: {
      bearerToken,
      user_type,
      apiState: { status, isError, message },
      isLoginError,
    },
    visitorsPass: { visitorPassDetails },
  } = useAppSelector((state: RootState) => state);

  const datas = visitorPassDetails.visitorPassArray;
  const passCount = visitorPassDetails.count || 0;
  const passNext = visitorPassDetails.next || null;
  const passPrev = visitorPassDetails.previous || null;

  const [pageno, setPageNo] = useState<string>("1");
  const [selectedPass, setSelectedPass] = useState<PassDetails | null>(null);
  const [isPassDetailDialogOpen, setIsPassDetailDialogOpen] = useState(false);

  const handleClickNext = () => {
    if (passNext) {
      const urlObject = new URL(passNext);
      const pageValue = urlObject.searchParams.get('page') || "";
      setPageNo(pageValue);
      handleGetPasses(pageValue);
    }
  }

  const handleClickPrev = () => {
    if (passPrev) {
      const urlObject = new URL(passPrev);
      const pageValue = urlObject.searchParams.get('page') || "";
      setPageNo(pageValue);
      handleGetPasses(pageValue || '1');
    }
  }

  const router = useRouter();
  const cancelPasses = async (data: PassDetails) => {
    await dispatch(
      cancelPass(data, {
        headers: { Authorization: `bearer ${bearerToken}` },
      })
    );
    handleGetPasses(pageno);
  };

  useEffect(() => {
    handleGetPasses(pageno);
  }, []);

  const handleGetPasses = async (pageno: string) => {
    try {
      await dispatch(
        getVisitorPassByTime(pageno, {
          headers: { Authorization: `bearer ${bearerToken}` },
        })
      );
    } catch (error) {
      console.error('Error dispatching getallPasses:', error);
    }
  };

  const handleViewPass = (passDetails: PassDetails) => {
    setSelectedPass(passDetails);
    setIsPassDetailDialogOpen(true);
  };

  const handleClosePassDetailDialog = () => {
    setIsPassDetailDialogOpen(false);
  };

  const columns: GridColDef[] = [
    { field: "passNumber", headerName: "Pass Number", flex: 0.5 },
    { field: "barcode", headerName: "Barcode", flex: 0.5 },
    { field: "vDate", headerName: "Visit Date", flex: 0.5 },
    { field: "toMeet", headerName: "To Meet", flex: 0.5 },
    { field: "department", headerName: "Department", flex: 0.5 },
    { field: "noOfItems", headerName: "No of Items", flex: 0.4 },
    { field: "validFor", headerName: "Valid For", flex: 0.5 },
    { field: "authoByWhome", headerName: "Authorized By", flex: 0.5 },
    { field: "purpose", headerName: "Purpose", flex: 0.5 },
    {
      field: "access",
      headerName: "Access",
      flex: 0.5,
      renderCell: (params) => (params.value ? "Yes" : "No"),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 0.8,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="secondary"
            disabled={params.row.passCancelledAt !== "not cancelled"}
            onClick={() => cancelPasses(params.row)}
            style={{ marginRight: "10px" }}
          >
            {params.row.passCancelledAt !== "not cancelled"
              ? <DeleteForeverIcon />
              : <DeleteOutlineIcon />}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleViewPass(params.row as PassDetails)}
          >
            <VisibilityIcon />
          </Button>
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
          <Header title="VIEW AND CANCEL PASS" subtitle="List Pass" />
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
              getRowId={(row) => row.indexId}
              rowHeight={80}
              hideFooterPagination
            />
            <Button onClick={handleClickPrev} disabled={pageno === "1" || pageno === "0"}>Previous Page</Button>
            <Button onClick={handleClickNext} disabled={pageno === `${passCount / 10}`}>Next Page</Button>
            {selectedPass && (
              <PassView
                open={isPassDetailDialogOpen}
                onClose={handleClosePassDetailDialog}
                passDetails={selectedPass}
              />
            )}
          </Box>
        </Box>
      )}
    </AppLayout>
  );
};

export default ViewAndCancelPass;
