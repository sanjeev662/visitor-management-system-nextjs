import { AppConfig } from "../../config/config";
import { dashboardDetailsActions } from "./slice";
import { setApiState, stopLoading } from "../application/actions";
import { post, get , put} from "../../utils/http";


export const getDashboardDetails = (headers: any = {}) => {
    return async (dispatch: any) => {
      try { 
        await dispatch(setApiState({ isError: false, status: 200, message: "" , title:"" , icon:""})); 
        await dispatch(
          dashboardDetailsActions.setDashboardDetails({
            today_visitor_visit : 0,
            today_appointment : 0,
            today_checkIn : 0,
            today_checkOut : 0,
          })
      );
      
        const {data} = await get(
          `${AppConfig.REACT_APP_API_HOSTNAME}/dashboard`,
          headers
        ); 
        await dispatch(
            dashboardDetailsActions.setDashboardDetails({
              today_visitor_visit : data?.today_visitor_visit?.length ?? 0,
              today_appointment : data?.today_appointment?.length ?? 0,
              today_checkIn : data?.today_checkIn?.length ?? 0,
              today_checkOut : data?.today_checkOut?.length ?? 0,
            })
        );
      } catch (error: any) {
        dispatch(
          await setApiState({
            isError: true,
            status: error?.response?.data?.status ?? 500,
            message: error?.response?.data?.message ?? "Something Went Wrong",
            title: "Failed To Get Dashboard Details",
            icon:"error",
          })
        );
      } finally {
        dispatch(stopLoading());
      }
    };
};