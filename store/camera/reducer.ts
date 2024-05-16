import { PayloadAction } from "@reduxjs/toolkit";

export const reducers = {
  setCameraAnalysisDetails(state: any, action: PayloadAction<any>) {
    state.cameraAnalysisDetails = action.payload.cameraAnalysisDetails;
  },
  setVisitorFaceAnalysisDetails(state: any, action: PayloadAction<any>) {
    state.visitorFaceAnalysisDetails = action.payload.visitorFaceAnalysisDetails;
  },
  setVisitorTodayDetails(state: any, action: PayloadAction<any>) {
    const { todayfName, todayMobNo , todayImage } = action.payload;
    state.todayfName = todayfName;
    state.todayMobNo = todayMobNo;
    state.todayImage = todayImage;
  },
};
