import { PayloadAction } from "@reduxjs/toolkit";

export const reducers = {
  setAllAppointmentDetails(state: any, action: PayloadAction<any>) {
    state.allAppointmentDetails = action.payload.allAppointmentDetails;
  },
};
