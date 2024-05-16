import React, { useEffect, useState } from "react";
import { Typography, Box, useTheme, Theme } from "@mui/material";
import { tokens } from "../../src/theme";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const theme = useTheme<Theme>();
  const colors = tokens(theme.palette.mode);

  return (
    <Box mb="20px">
      {title && (
        <Typography
          variant="h3"
          color={colors.grey[100]}
          fontWeight="bold"
          sx={{ m: "0 0 5px 0" }}
        >
          {title}
        </Typography>
      )}
      {subtitle && (
        <Typography variant="h5" color={colors.greenAccent[400]}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default Header;
