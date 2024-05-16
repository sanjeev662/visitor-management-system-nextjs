import { AppConfig } from "../../config/config";
import { visitorDetailsActions } from "./slice";
import { setApiState, stopLoading } from "../application/actions";
import { post, get ,put} from "../../utils/http";
import { visitorsByImageModel,VisitorsByImage  } from "@/models/visitorsbyimage";
import { cameraAnalysisDetailsActions } from "../camera/slice";


export const getVisitorDetails = (pageno:string , headers: any = {}) => {
    return async (dispatch: any) => {
      try { 
        await dispatch(setApiState({ isError: false, status: 200, message: "" , title:"" , icon:""})); 
        await dispatch(visitorDetailsActions.setVisitorDetails({visitorDetails : {visitorArray:[]}}));
        
        const {data} = await get(
          `${AppConfig.REACT_APP_API_HOSTNAME}/visitors/api/get-all-visitors/?page=${pageno}`,
          headers
        );

        const visitorsObj = data &&  data.results
        dispatch(
            visitorDetailsActions.setVisitorDetails({visitorDetails : {visitorArray:visitorsObj, previous:data.previous, next:data.next, count:data.next}})
        );
      } catch (error: any) {
        dispatch(
          setApiState({
            isError: true,
            status: error?.response?.data?.status ?? 500,
            message: "Something Went Wrong",
            title: "Failed To Get Visitors",
            icon:"error",
          })
        );
      } finally {
        dispatch(stopLoading());
      }
    };
};

export const getVisitorDetailsByImage = (headers: any = {}) => {
  return async (dispatch: any) => {
    try { 
        await dispatch(setApiState({ isError: false, status: 200, message: "" , title:"" , icon:""}));
      const {data} = await get(
        `${AppConfig.REACT_APP_API_HOSTNAME}/visitors/api/get-all-visitors?include_images=true`,
        headers
      );
      const visitorsByImageObj : VisitorsByImage[] = visitorsByImageModel(data);
      dispatch(
          visitorDetailsActions.setVisitorDetails({visitorDetails : {visitorsByImageArray:visitorsByImageObj}})
      );
    } catch (error: any) {
      dispatch(
        setApiState({
          isError: true,
          status: error?.response?.data?.status ?? 500,
          message: "Something Went Wrong",
          title: "Failed To Get Visitor Images",
          icon:"error",
        })
      );
    } finally {
      dispatch(stopLoading());
    }
  };
};

export const createVisitor = (payload: any = {}, headers: any = {}) => {
  return async (dispatch: any) => {
    try { 
        await dispatch(setApiState({ isError: false, status: 200, message: "" , title:"" , icon:""}));
      const {data} = await post(
        `${AppConfig.REACT_APP_API_HOSTNAME}/visitors/api/register-visitor/`,
        payload,
        headers
      );
      await dispatch(
        cameraAnalysisDetailsActions.setVisitorTodayDetails({
            todayfName: '',
            todayMobNo: '',
            todayImage: '',
        }),
      );
      await dispatch(setApiState({ isError: false, status: 200, message: "Visitor Created Successfully" , title:"Success!" , icon:"success"}));
    } catch (error: any) {
      dispatch(
        setApiState({
          isError: true,
          status: error?.response?.data?.status ?? 500,
          message: "Something Went Wrong",
          title: "Failed To Add Visitor",
          icon:"error",
        })
      );
    } finally {
      dispatch(stopLoading());
    }
  };
};

export const editVisitor = (payload: any = {}, headers: any = {}) => {
  return async (dispatch: any) => {
    try { 
        await dispatch(setApiState({ isError: false, status: 200, message: "" , title:"" , icon:""}));
      const {data} = await put(
        `${AppConfig.REACT_APP_API_HOSTNAME}/visitors/api/update-visitor/${payload.visitorId}/`,
        payload,
        headers
      );
      await dispatch(setApiState({ isError: false, status: 200, message: "Data Updated Successfully" , title:"Success!" , icon:"success"}));
    } catch (error: any) {
      dispatch(
        setApiState({
          isError: true,
          status: error?.response?.data?.status ?? 500,
          message: "Something Went Wrong",
          title: "Failed To Update",
          icon:"error",
        })
      );
    } finally {
      dispatch(stopLoading());
    }
  };
};

export const blackListVisitor = (payload: any = {}, headers: any = {}) => {
  return async (dispatch: any) => {
    try { 
        await dispatch(setApiState({ isError: false, status: 200, message: "" , title:"" , icon:""}));
      const { data } = await post(
        `${AppConfig.REACT_APP_API_HOSTNAME}/visitors/api/blacklist-visitor/${payload.visitorId}/`,{},
        headers
      );
      await dispatch(setApiState({ isError: false, status: 200, message: "Visitor BlackListed Successfully" , title:"Success!" , icon:"success"}));

    } catch (error: any) {
      dispatch(
        setApiState({
          isError: true,
          status: error?.response?.data?.status ?? 500,
          message: "Something Went Wrong",
          title: "Failed To BlackList Visitor",
          icon:"error",
        })
      );
    } finally {
      dispatch(stopLoading());
    }
  };
}

export const unblackListVisitor = (payload: any = {}, headers: any = {}) => {
  return async (dispatch: any) => {
    try { 
        await dispatch(setApiState({ isError: false, status: 200, message: "" , title:"" , icon:""}));
      const { data } = await post(
        `${AppConfig.REACT_APP_API_HOSTNAME}/visitors/api/remove-from-blacklist/${payload.visitorId}/`,{},
        headers
      );
      await dispatch(setApiState({ isError: false, status: 200, message: "Visitor UnBlackListed Successfully" , title:"Success!" , icon:"success"}));
    } catch (error: any) {
      dispatch(
        setApiState({
          isError: true,
          status: error?.response?.data?.status ?? 500,
          message: error?.response?.data?.message ?? "Something Went Wrong",
          title: "Failed To UnBlackList Visitor",
          icon:"error",
        })
      );
    } finally {
      dispatch(stopLoading());
    }
  };
}