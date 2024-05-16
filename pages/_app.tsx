import * as React from "react";
import "../styles/globals.css";
import { useAppDispatch } from "../store/index";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { wrapper } from "../store/index";
import { ColorModeContext, useMode } from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
const clientSideEmotionCache = createEmotionCache();
import { useEffect } from "react";
import swal from "sweetalert";
import AppLayout from "../components";
import Footer from "@/components/Footer";

import { useRouter } from "next/router";
import { useAppSelector, RootState } from "../store";

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const [theme, colorMode] = useMode();
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const dispatch = useAppDispatch();

  const router = useRouter();
  const {
    application: {
      bearerToken,
      apiState: { status, isError, message, title, icon },
      isLoginError,
    },
  } = useAppSelector((state: RootState) => state);

  useEffect(() => {
    if (message != "") {
      swal({
        title: title,
        text: message,
        icon: icon,
      });
    }
  }, [isError, isLoginError, message, status, bearerToken]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* <AppLayout> */}
          <Component {...pageProps} />
          {/* </AppLayout> */}
          {/* <Footer/> */}
        </ThemeProvider>
      </CacheProvider>
    </ColorModeContext.Provider>
  );
}

export default wrapper.withRedux(MyApp);
