import { createSlice } from "@reduxjs/toolkit";
import { cameraModel,visitorFaceAnalysisModel } from "@/models/camera";
import { reducers } from "./reducer";

export interface  allCameraAnalysissState{
    cameraAnalysisDetails : any;
    visitorFaceAnalysisDetails : any;
    todayfName : string; 
    todayMobNo : string; 
    todayImage : string; 

}
const initialState:  allCameraAnalysissState ={
    cameraAnalysisDetails : cameraModel({}),
    visitorFaceAnalysisDetails : visitorFaceAnalysisModel({}),
    todayfName : "", 
    todayMobNo : "", 
    todayImage : "",
}

export const cameraAnalysisDetailsSlice = createSlice({
    name: "cameraAnalysiss",
    initialState,
    reducers: reducers,
  });
  
export const cameraAnalysisDetailsActions = cameraAnalysisDetailsSlice.actions;