import { createSlice } from "@reduxjs/toolkit";
import { visitorsModel } from "@/models/visitors";
import { reducers } from "./reducer";

export interface  visitorDetailsState{
    visitorDetails : any;
}
const initialState:  visitorDetailsState ={
    visitorDetails : visitorsModel({}),
}

export const visitorDetailsSlice = createSlice({
    name: "visitors",
    initialState,
    reducers: reducers,
  });
  
export const visitorDetailsActions = visitorDetailsSlice.actions;