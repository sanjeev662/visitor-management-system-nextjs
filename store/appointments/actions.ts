import { AppConfig } from "../../config/config";
import { allAppointmentDetailsActions } from "./slice";
import { setApiState, stopLoading } from "../application/actions";
import { post, get , put} from "../../utils/http";
import { appointmentsModel } from "@/models/appointments";

export const getAllAppointments = (pageno:string ,headers: any = {}) => {
    return async (dispatch: any) => {
      try { 
        await dispatch(setApiState({ isError: false, status: 200, message: "" , title:"" , icon:""})); 
        await dispatch(allAppointmentDetailsActions.setAllAppointmentDetails({allAppointmentDetails : {appointmentArray:[]}}));

        const {data} = await get(
          `${AppConfig.REACT_APP_API_HOSTNAME}/appointments/api/get-all-appointments/?page=${pageno}`,
          headers
        );

        const appointmentsObj =
            data && data.results && data.results.length > 0
                ? data.results.map((appointmentObj: any) => appointmentsModel(appointmentObj))
                : [];

       dispatch(
            allAppointmentDetailsActions.setAllAppointmentDetails({allAppointmentDetails : {appointmentArray:appointmentsObj ,previous:data.previous, next:data.next, count:data.next}})
        );
      } catch (error: any) {
        dispatch(
          setApiState({
            isError: true,
            status: error?.response?.data?.status ?? 500,
            message: "Something Went Wrong",
            title: "Failed To Get Appointments",
            icon:"error",
          })
        );
      } finally {
        dispatch(stopLoading());
      }
    };
};

export const cancelAppointment = (payload: any = {}, headers: any = {}) => {
  return async (dispatch: any) => {
    try { 
      await dispatch(setApiState({ isError: false, status: 200, message: "" , title:"" , icon:""})); 

      const { data } = await put(
        `${AppConfig.REACT_APP_API_HOSTNAME}/appointments/api/update-appointment/${payload.appointmentId}/`,{},
        headers
      );
      
      await dispatch(setApiState({ isError: false, status: 200, message: "Appointment Cancelled Successfully" , title:"Success!" , icon:"success"}));

    } catch (error: any) {
      dispatch(
        setApiState({
          isError: true,
          status: error?.response?.data?.status ?? 500,
          message: "Something Went Wrong",
          title: "Failed to Cancel Appointment",
          icon:"error",
        })
      );
    } finally {
      dispatch(stopLoading());
    }
  };
}

export const createAppointment = (payload: any = {}, headers: any = {}) => {
  return async (dispatch: any) => {
    try { 
      await dispatch(setApiState({ isError: false, status: 200, message: "" , title:"" , icon:""}));
      const {data} = await post(
        `${AppConfig.REACT_APP_API_HOSTNAME}/appointments/api/create-appointment/`,
        payload,
        headers
      );
      await dispatch(setApiState({ isError: false, status: 200, message: "Appointment Created Successfully" , title:"Success!" , icon:"success"}));
    } catch (error: any) {
      dispatch(
        setApiState({
          isError: true,
          status: error?.response?.data?.status ?? 500,
          message: "Something Went Wrong",
          title: "Appointment Creation Failed",
          icon:"error",
        })
      );
    } finally {
      dispatch(stopLoading());
    }
  };
};
