import { AppConfig } from "../../config/config";
import { setApiState, stopLoading } from "../application/actions";
import { post, get , put} from "../../utils/http";
import { visitorFaceAnalysisModel } from "@/models/camera";
import { cameraAnalysisDetailsActions } from "./slice";

export const cropFaces= (payload: any = {}, headers: any = {}) => {  
    return async (dispatch: any) => {
      try { 
        await dispatch(setApiState({ isError: false, status: 200, message: "" , title:"" , icon:""}));
        dispatch(cameraAnalysisDetailsActions.setCameraAnalysisDetails({cameraAnalysisDetails : {cameraAnalysisArray:[]}}));
        
        const response = await post(
          `${AppConfig.REACT_APP_API_HOSTNAME}/faceanalysis/cropFaces/`,
          payload,
          headers
        );

        const cameraAnalysissObj =response.data.croppedImages;

        if(cameraAnalysissObj.length>0){
          setApiState({ isError: false, status: 200, message: "Take Clear Picture" , title:"No Face Detected" , icon:"error"})
        }
  
        dispatch(
          cameraAnalysisDetailsActions.setCameraAnalysisDetails({cameraAnalysisDetails : {cameraAnalysisArray:cameraAnalysissObj}})
        );

      } catch (error: any) {
        dispatch(
          setApiState({
            isError: true,
            status: error?.response?.data?.status ?? 500,
            message: "Check Network Connectivity And Try Again!",
            title: "Failed To Crop Face Image",
            icon:"error",
          })
        );
      } finally {
        dispatch(stopLoading());
      }
    };
};

export const analyseVisitorFace= (payload: any = {}, headers: any = {}) => {  
  return async (dispatch: any) => {
          try { 
        await dispatch(setApiState({ isError: false, status: 200, message: "" , title:"" , icon:""}));
      dispatch(
        cameraAnalysisDetailsActions.setVisitorTodayDetails({
            todayfName: payload?.name ?? '', 
            todayMobNo: payload?.mobileNumber ?? '',
            todayImage: payload?.Image ?? '',
        }),
      );

      const {data} = await post(
        `${AppConfig.REACT_APP_API_HOSTNAME}/faceanalysis/visitor-facematch/`,
        payload,
        headers
      );


      const visitorFaceAnalysissObj =
      data && data.length > 0
          ? data.map((visitorFaceAnalysisObj: any) => visitorFaceAnalysisModel(visitorFaceAnalysisObj))
          : [];

      dispatch(
        cameraAnalysisDetailsActions.setVisitorFaceAnalysisDetails({visitorFaceAnalysisDetails : {visitorFaceAnalysisArray:visitorFaceAnalysissObj}})
      );

      dispatch(
        cameraAnalysisDetailsActions.setCameraAnalysisDetails({cameraAnalysisDetails : {cameraAnalysisArray:[]}})
      );

      await dispatch(setApiState({ isError: false, status: 200, message: "Face Analyzed Successfully" , title:"Success!" , icon:"success"}));

    } catch (error: any) {
      dispatch(
        setApiState({
          isError: true,
          status: error?.response?.data?.status ?? 500,
          message: "Check Network Connectivity And Try Again!",
          title: "Failed To Analyse Faces",
          icon:"error",
        })
      );
    } finally {
      dispatch(stopLoading());
    }
  };
};

