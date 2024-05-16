import { createSlice } from "@reduxjs/toolkit";
import { visitorsPassModel } from "@/models/visitorspass";
import { reducers } from "./reducer";

export interface  visitorPassDetailsState{
    visitorPassDetails : any;
}
const initialState:  visitorPassDetailsState ={
    visitorPassDetails : visitorsPassModel({}),
}

export const visitorPassDetailsSlice = createSlice({
    name: "visitorsPass",
    initialState,
    reducers: reducers,
  });
  
export const visitorPassDetailsActions = visitorPassDetailsSlice.actions;