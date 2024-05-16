import { PayloadAction } from "@reduxjs/toolkit";

export const reducers = {
  setVisitorPassDetails(state: any, action: PayloadAction<any>) {
    state.visitorPassDetails = action.payload.visitorPassDetails;
  },
};
