import React from "react";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { Box, Typography, useTheme, Theme } from "@mui/material";
import { tokens } from "../../src/theme";

interface StatBoxProps {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  progress?: string;
  increase?: string;
}

const StatBox: React.FC<StatBoxProps> = ({
  title = "",
  subtitle = "",
  icon = (
    <DownloadOutlinedIcon
      sx={(theme: Theme) => ({
        color: tokens(theme.palette.mode).greenAccent[600],
        fontSize: "26px",
      })}
    />
  ),
  progress = "0.10",
  increase = "+10%",
}) => {
  const theme: Theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
