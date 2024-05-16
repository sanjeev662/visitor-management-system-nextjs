import { createSlice } from "@reduxjs/toolkit";
import { reducers } from "./reducer";

export interface  alldashboardsState{
    today_visitor_visit :  number;
    today_appointment : number;
    today_checkIn : number;
    today_checkOut : number;
}
const initialState:  alldashboardsState ={
    today_visitor_visit : 0 ,
    today_appointment : 0,
    today_checkIn : 0,
    today_checkOut : 0,
}

export const dashboardDetailsSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: reducers,
  });
  
export const dashboardDetailsActions = dashboardDetailsSlice.actions;