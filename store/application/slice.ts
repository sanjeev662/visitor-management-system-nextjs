import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { reducers } from "./reducer";

export interface applicationState {
  bearerToken: string;
  user_type: string;
  user_pic: string;
  user_name: string;
  apiState: {
    isError: boolean;
    status: number;
    message: string;
    title:string;
    icon : string;
  };
  isLoginError: boolean;
  adminUsers: any;
  loaderState: boolean;
}

const initialState: applicationState = {
  bearerToken: Cookies.get("bearerToken") ?? "",
  user_type: Cookies.get("user_type") ?? "",
  user_pic: Cookies.get("user_pic") ?? "",
  user_name: Cookies.get("user_name") ?? "",
  apiState: {
    isError: false,
    status: 0,
    message: "",
    title:"Success!",
    icon:"success"
  },
  isLoginError: false,
  adminUsers: {},
  loaderState: false,
};

export const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: reducers,
});

export const applicationActions = applicationSlice.actions;
