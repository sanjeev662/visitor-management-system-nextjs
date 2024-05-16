import React from "react";
import { CircularProgress, Grid } from "@mui/material";

const Loading: React.FC = () => {
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
        backgroundColor: "rgba(0, 0, 0, 0.1)",
      }}
    >
      <CircularProgress color="success" />
    </Grid>
  );
};

export default Loading;
