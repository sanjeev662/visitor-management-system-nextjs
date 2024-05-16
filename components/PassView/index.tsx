import React from "react";
import { tokens } from "../../src/theme";
import { Dialog, DialogTitle, DialogContent, Button, Box, Typography, useTheme } from "@mui/material";
import TypographyDetails from "./TypographyDetails";

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

interface PassDetailDialogProps {
  open: boolean;
  onClose: () => void;
  passDetails: PassDetails;
}

const PassDetailDialog: React.FC<PassDetailDialogProps> = ({ open, onClose, passDetails }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{backgroundColor: colors.primary[400], fontWeight:"bold"}}>
          Pass Details
      </DialogTitle>
      <DialogContent  sx={{ height: '400px' , backgroundColor: colors.primary[400],}}>
        <Box
          gridColumn="span 5"
          gridRow="span 1"
          mb={1}
          sx={{
            backgroundColor: colors.primary[400],
            overflow: 'auto',
            padding: 2,
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '5px',
          }}
        >
          <Box
            gridColumn="span 3"
            borderRadius="10px"
            overflow="hidden"
          >
            <img
              src={`data:image/jpeg;base64,${passDetails.daysImage}`}
              alt="Your Image"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
          <Box
            gridColumn="span 4"
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
                  sx={{ color: colors.grey[100] }}
                >
                  DETAILS
                </Typography>
              </Box>
              <Box mt="2px" ml="2px">
                <TypographyDetails title="Pass Number" value={passDetails.passNumber} />
                <TypographyDetails title="Barcode" value={passDetails.barcode} />
                <TypographyDetails title="Visit Date" value={passDetails.vDate} />
                <TypographyDetails title="To Meet" value={passDetails.toMeet} />
                <TypographyDetails title="Department" value={passDetails.department} />
                <TypographyDetails title="No of Items" value={passDetails.noOfItems} />
                <TypographyDetails title="Valid For" value={passDetails.validFor} />
                <TypographyDetails title="Authorized By" value={passDetails.authoByWhome} />
                <TypographyDetails title="Purpose" value={passDetails.purpose} />
                <TypographyDetails title="Pass Cancelled Or Not" value={passDetails.passCancelledAt} />
              </Box>
            </Box>
          </Box>
        </Box>

        <Button variant="contained" color="primary" onClick={onClose}>
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default PassDetailDialog;

