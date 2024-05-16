// 'use client'
import { AppConfig } from "../../config/config";
import { applicationActions } from "./slice";
import { post, get , put} from "../../utils/http";
import Cookies from "js-cookie";

export const signIn = ({ user_name, password }: any) => {
    return async (dispatch: any) => {
      try { await dispatch(setApiState({ isError: false, status: 200, message: "" , title:"" , icon:""}));
        await dispatch(
          applicationActions.setIsLoginError({
            isLoginError:  false,
          })
        );
        const { data } = await post(
          `${AppConfig.REACT_APP_API_HOSTNAME}/accounts/login/users`,
          { user_name, password }
        );

        let bearerTokenString: string = data.token;
        let tokenObject: { access: string, refresh: string } = JSON.parse(bearerTokenString.replace(/'/g, "\""));

        await dispatch(
          applicationActions.setApplicationState({
            bearerToken: tokenObject.access ?? "",
            user_type: data.user.user_type ?? "",
            user_pic: data.user.photo_image ?? "",
            user_name: data.user.user_name ?? "",
          })
        );

        localStorage.setItem("user_name", data.user.user_name);
        localStorage.setItem("user_type", data.user.user_type);
        localStorage.setItem("user_pic", data.user.photo_image);
        localStorage.setItem("bearerToken", tokenObject.access);
        Cookies.set("user_name", data.user.user_name);
        Cookies.set("user_type", data.user.user_type);
        Cookies.set("user_pic", data.user.photo_image);
        Cookies.set("bearerToken", tokenObject.access);
        
        await dispatch(setApiState({ isError: false, status: 200, message: "Logged In Successfully" , title:"Success!" , icon:"success"}));

      } catch (error: any) {
        dispatch(
          setApiState({
            isError: true,
            status: error?.status ?? 500,
            message:  "Something Went Wrong, Please try again later.",
            title: "Sign In Failed",
            icon:"error",
          })
        ); 
        dispatch(
          applicationActions.setIsLoginError({
            isLoginError: true,
          })
        );
      }
    };
  };
  
  export const logout = (headers: any = {}) => {
    return async (dispatch: any) => {
      try { 
        await dispatch(setApiState({ isError: false, status: 200, message: "" , title:"" , icon:""}));
        // if(Cookies.get("bearerToken")){
        // const { data } = await post(
        //   `${AppConfig.REACT_APP_API_HOSTNAME}/accounts/logout/users`,
        //   {},headers          
        // );
        // }

        Cookies.set("bearerToken", "");  
        Cookies.set("user_name", "");
        Cookies.set("user_type", "");
        Cookies.set("user_pic", "");
        localStorage.removeItem("bearerToken");
        localStorage.removeItem("user_name");
        localStorage.removeItem("user_type");
        localStorage.removeItem("user_pic");   

        await dispatch(
          applicationActions.setApplicationState({
            bearerToken: "",
            user_type: "",
            user_pic: "",
            user_name: "",
          })
        );
        
      } catch (error: any) {
        Cookies.set("bearerToken", "");  
        Cookies.set("user_name", "");
        Cookies.set("user_type", "");
        Cookies.set("user_pic", "");
        localStorage.removeItem("bearerToken");
        localStorage.removeItem("user_name");
        localStorage.removeItem("user_type");
        localStorage.removeItem("user_pic");   
      }
    };
  };

  export const setApiState = (apiStateObj: {
    isError: boolean;
    status: number;
    message: string;
    title: string;
    icon: string;
  }) => {
    return async (dispatch: any) => {
      try {
        dispatch(applicationActions.setApiState(apiStateObj));
      } catch (error) {
        console.log(error);
      }
    };
  };

  export const startLoading = () => {
    return async (dispatch: any) => {
      dispatch(applicationActions.setLoaderState({ loaderState: true }));
    };
  };

  export const stopLoading = () => {
    return async (dispatch: any) => {
      dispatch(applicationActions.setLoaderState({ loaderState: false }));
    };
  };
