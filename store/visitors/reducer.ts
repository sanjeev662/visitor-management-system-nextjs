import { PayloadAction } from "@reduxjs/toolkit";

export const reducers = {
  setVisitorDetails(state: any, action: PayloadAction<any>) {
    state.visitorDetails = action.payload.visitorDetails;
  },
};
