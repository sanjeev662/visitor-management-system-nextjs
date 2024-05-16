import { createSlice } from "@reduxjs/toolkit";
import { employeesModel } from "@/models/employees";
import { reducers } from "./reducer";

export interface  allEmployeesState{
    employeeDetails : any;
}
const initialState:  allEmployeesState ={
    employeeDetails : employeesModel({}),
}

export const employeeDetailsSlice = createSlice({
    name: "employees",
    initialState,
    reducers: reducers,
  });
  
export const employeeDetailsActions = employeeDetailsSlice.actions;