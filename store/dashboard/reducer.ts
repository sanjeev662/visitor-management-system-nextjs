import { PayloadAction } from "@reduxjs/toolkit";

export const reducers = {
  setDashboardDetails(state: any, action: PayloadAction<any>) {
    const { today_appointment, today_checkOut , today_checkIn , today_visitor_visit } = action.payload;
    state.today_appointment = today_appointment;
    state.today_checkOut = today_checkOut;
    state.today_checkIn = today_checkIn;
    state.today_visitor_visit = today_visitor_visit;
  },
};
