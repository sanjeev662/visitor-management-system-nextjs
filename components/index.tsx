import { useEffect, useState } from "react";
import SideBar from "./Sidebar";
import Topbar from "./Topbar";
import Footer from "./Footer";
import { useRouter } from "next/router";
import { CircularProgress, Grid } from "@mui/material";

interface AppProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppProps> = (props) => {
  const [isSidebar, setIsSidebar] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  return (
    <div className="app">
      <SideBar />
      <main className="content">
        <Topbar />
        <Grid height={"calc(100vh - 80px)"} sx={{ overflow: "scroll" }}>
          {props.children}
        </Grid>
        {/* <Footer /> */}
      </main>
    </div>
  );
};

export default AppLayout;
