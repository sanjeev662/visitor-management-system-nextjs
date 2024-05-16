import { AppConfig } from "../../config/config";
import { visitorPassDetailsActions } from "./slice";
import { setApiState, stopLoading } from "../application/actions";
import { post, get , put} from "../../utils/http";
import { cameraAnalysisDetailsActions } from "../camera/slice";

export const createPass = (payload: any = {}, headers: any = {}) => {
    return async (dispatch: any) => {
      try { 
        await dispatch(setApiState({ isError: false, status: 200, message: "" , title:"" , icon:""}));

        const {data} = await post(
          `${AppConfig.REACT_APP_API_HOSTNAME}/passes/create-pass/`,
          payload,
          headers
        );

        const response = await post(
          `${AppConfig.REACT_APP_API_HOSTNAME}/passDownload/pass-download/`,
          {
            "barcode": data.barcode
          },
          {
            headers: {
              "Authorization": headers.headers.Authorization,
            },
            responseType: 'blob',
          }
        );

        const blob = new Blob([response.data], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'pass.pdf';
        document.body.appendChild(link); 
        link.click();
        document.body.removeChild(link);

        await dispatch(
          cameraAnalysisDetailsActions.setVisitorTodayDetails({
              todayfName: '', 
              todayMobNo: '',
              todayImage: '',
          }),
        );

        await dispatch(setApiState({ isError: false, status: 200, message: "Pass Created Successfully" , title:"Success!" , icon:"success"}));

      } catch (error: any) {
        dispatch(
          setApiState({
            isError: true,
            status: error?.response?.data?.status ?? 500,
            message: "Something Went Wrong",
            title: "Failed To DownLoad",
            icon:"error",
          })
        );
      } finally {
        dispatch(stopLoading());
      }
    };
};

export const getVisitorPassByTime = (pageno:string , headers: any = {}) => {
  return async (dispatch: any) => {
    try { 
      await dispatch(setApiState({ isError: false, status: 200, message: "" , title:"" , icon:""}));
      await dispatch(visitorPassDetailsActions.setVisitorPassDetails({visitorPassDetails : {visitorPassArray:[]}}));

      const {data} = await get(
        `${AppConfig.REACT_APP_API_HOSTNAME}/passes/getallpasses/?page=${pageno}`,
        headers
      );

      const visitorsPassObj = data &&  data.results

      dispatch(
          visitorPassDetailsActions.setVisitorPassDetails({visitorPassDetails : {visitorPassArray:visitorsPassObj ,previous:data.previous, next:data.next, count:data.next}})
      );
    } catch (error: any) {
      dispatch(
        setApiState({
          isError: true,
          status: error?.response?.data?.status ?? 500,
          message: "Something Went Wrong",
          title: "Failed to  fetch visitor passes.",
          icon:"error",
        })
      );
    } finally {
      dispatch(stopLoading());
    }
  };
};

export const cancelPass = (payload: any = {}, headers: any = {}) => {
  return async (dispatch: any) => {       
    try { 
        await dispatch(setApiState({ isError: false, status: 200, message: "" , title:"" , icon:""}));
        const { data } = await post(
        `${AppConfig.REACT_APP_API_HOSTNAME}/passes/cancel_pass/${payload.visitorId}/`,
        {
          vDate: payload.vDate
        },
        headers
      );
      await dispatch(setApiState({ isError: false, status: 200, message: "Pass Cancelled Successfully" , title:"Success!" , icon:"success"}));
    } catch (error: any) {
      dispatch(
        setApiState({
          isError: true,
          status: error?.response?.data?.status ?? 500,
          message: "Something Went Wrong",
          title: "Failed to Cancel Pass",
          icon:"error",
        })
      );
    } finally {
      dispatch(stopLoading());
    }
  };
}