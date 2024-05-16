import { createSlice } from "@reduxjs/toolkit";
import { appointmentsModel } from "../../models/appointments";
import { reducers } from "./reducer";

export interface  allAppointmentDetailsState{
    allAppointmentDetails : any;
}
const initialState:  allAppointmentDetailsState ={
    allAppointmentDetails : appointmentsModel({}),
}

export const allAppointmentDetailsSlice = createSlice({
    name: "allAppointments",
    initialState,
    reducers: reducers,
  });
  
export const allAppointmentDetailsActions = allAppointmentDetailsSlice.actions;