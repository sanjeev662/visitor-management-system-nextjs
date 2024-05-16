import { PayloadAction } from "@reduxjs/toolkit";

export const reducers = {
  setEmployeeDetails(state: any, action: PayloadAction<any>) {
    state.employeeDetails = action.payload.employeeDetails;
  },
};
