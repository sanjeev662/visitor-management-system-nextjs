import type { NextPage } from "next";
import { useEffect } from "react";
import { CircularProgress, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector, RootState } from "../store";


const Home: NextPage = () => {
  const router = useRouter();

  const {
    application: {
      bearerToken,
      user_name,
      user_type,
      apiState: { status, isError, message },
      isLoginError,
    },
  } = useAppSelector((state: RootState) => state);

  useEffect(() => {
    if (bearerToken === "") router.push("/auth/login");
    else if (user_type != "guard") router.push("/dashboard");
    else router.push("/guard");
  }, [bearerToken]);

  return (
    <Grid
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        zIndex: 9999,
      }}
    >
      <CircularProgress color="success" />
    </Grid>
  );
};

export default Home;
