import React from "react";
import { Box, Typography, Table, TableBody, TableRow, TableCell, useTheme } from "@mui/material";
import { tokens } from "../../src/theme";

interface TypographyDetailsProps {
  title: string;
  value: string | number | boolean;
}

const TypographyDetails: React.FC<TypographyDetailsProps> = ({ title, value }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Table size="small">
      <TableBody>
        <TableRow >
          <TableCell sx={{ color: colors.grey[100], textAlign: 'left', width: '50%' }} >
            <Typography variant="body1">
              {title}:
            </Typography>
          </TableCell>
          <TableCell sx={{ color: colors.greenAccent[500], width: '50%' }}>
            <Typography variant="body1" sx={{ textAlign: 'left' }}>
              {value}
            </Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default TypographyDetails;
