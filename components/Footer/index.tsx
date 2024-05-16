import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../src/theme";
import { Box, Typography, Link, useTheme } from "@mui/material";

const Footer = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      sx={{
        // position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2),
        boxShadow: theme.shadows[5],
      }}
    >
      <Box width="100%" textAlign="center">
        <Typography
          variant="h5"
          color={colors.grey[100]}
          fontWeight="bold"
        >
          Fax: +91-11-41519898 | Email:{" "}
          <Link href="mailto:support@elkostaindia.com" color="inherit">
            support@elkostaindia.com
          </Link>{" "}
          | Website:{" "}
          <Link href="https://www.elkostaindia.com" color="inherit">
            www.elkostaindia.com
          </Link>{" "}
          | Address: 101- Mercantile House, K.G Marg, New Delhi-110001
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
