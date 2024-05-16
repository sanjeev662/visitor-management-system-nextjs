import { AppConfig } from "../../config/config";
import { employeeDetailsActions } from "./slice";
import { setApiState, stopLoading } from "../application/actions";
import { post, get , put} from "../../utils/http";
import { employeesModel } from "@/models/employees";


export const getEmployees = (headers: any = {}) => {
    return async (dispatch: any) => {
      try { 
        await dispatch(setApiState({ isError: false, status: 200, message: "" , title:"" , icon:""})); 
        await dispatch(employeeDetailsActions.setEmployeeDetails({employeeDetails : {employeeArray:[]}}));
        
        const {data} = await get(
          `${AppConfig.REACT_APP_API_HOSTNAME}/accounts/getall/users`,
          headers
        );

        const employeesObj =
        data && data.length > 0
            ? data.map((employeeObj: any) => employeesModel(employeeObj))
            : [];
  
        dispatch(
          employeeDetailsActions.setEmployeeDetails({employeeDetails : {employeeArray:employeesObj}})
        );
      } catch (error: any) {
        dispatch(
          await setApiState({
            isError: true,
            status: error?.response?.data?.status ?? 500,
            message: error?.response?.data?.message ?? "Something Went Wrong",
            title: "Failed To Get Employees",
            icon:"error",
          })
        );
      } finally {
        dispatch(stopLoading());
      }
    };
};


export const createEmployee = (payload: any = {}, headers: any = {}) => {
  return async (dispatch: any) => {
    try { 
        await dispatch(setApiState({ isError: false, status: 200, message: "" , title:"" , icon:""}));
      const {data} = await post(
        `${AppConfig.REACT_APP_API_HOSTNAME}/accounts/create/users`,
        payload,
        headers
      );
      dispatch(setApiState({ isError: false, status: 200, message: "Employee Added Successfully" , title:"Success!" , icon:"success" }));
    } catch (error: any) {
      dispatch(
        setApiState({
          isError: true,
          status: error?.response?.data?.status ?? 500,
          message:"Something Went Wrong",
          title: "Failed to Add Employee",
          icon:"error",
        })
      );
    } finally {
      dispatch(stopLoading());
    }
  };
};

