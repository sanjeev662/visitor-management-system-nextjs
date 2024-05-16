import React from "react";
import { CircularProgress, Grid,Box } from "@mui/material";

const AccessDenied: React.FC = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        color:"red",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
      }}
    >
      ACCESS DENIED !!!
    </Grid>
  );
};

export default AccessDenied;
