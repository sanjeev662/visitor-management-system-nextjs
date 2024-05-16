import { AppConfig } from "../../config/config";
import { setApiState, stopLoading } from "../application/actions";
import { post, get , put} from "../../utils/http";


export const addAdamDetail = (payload: any = {}, headers: any = {}) => {
    return async (dispatch: any) => {
      try {
        await dispatch(setApiState({ isError: false, status: 200, message: "" , title:"" , icon:""}));
        const {data} = await post(
          `${AppConfig.REACT_APP_API_HOSTNAME}/adam/adam-details/`,
          payload,
          headers
        );
        await dispatch(setApiState({ isError: false, status: 200, message: "Adam Detal Added Successfully" , title:"Success!" , icon:"success"}));
      } catch (error: any) {
        dispatch(
          setApiState({
            isError: true,
            status: error?.response?.data?.status ?? 500,
            message: "Something Went Wrong",
            title: "Failed to add adam detail",
            icon:"error",
          })
        );
      } finally {
        dispatch(stopLoading());
      }
    };
  };