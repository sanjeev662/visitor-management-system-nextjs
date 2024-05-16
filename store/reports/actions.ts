import { AppConfig } from "../../config/config";
import { setApiState, stopLoading } from "../application/actions";
import { post, get , put} from "../../utils/http";

export const downloadAppointmentReport = (startDate: string, endDate : string, headers: any = {}) => {  
    return async (dispatch: any) => {
      try { 
        await dispatch(setApiState({ isError: false, status: 200, message: "" , title:"" , icon:""}));
        const response = await get(
          `${AppConfig.REACT_APP_API_HOSTNAME}/reportDownload/appointment-report/?start_date=${startDate}&end_date=${endDate}`,
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
        link.download = 'appointment-report.pdf';
        document.body.appendChild(link); 
        link.click();
        document.body.removeChild(link);

        await dispatch(setApiState({ isError: false, status: 200, message: "Appointment Report Downloaded Successfully" , title:"Success!" , icon:"success"}));

      } catch (error: any) {
        dispatch(
          setApiState({
            isError: true,
            status: error?.response?.data?.status ?? 500,
            message: "Check Network Connectivity And Try Again!",
            title: "Downloading Failed",
            icon:"error",
          })
        );
      } finally {
        dispatch(stopLoading());
      }
    };
};

export const downloadLoginLogoutReport = (startDate: string, endDate : string, headers: any = {}) => {  
    return async (dispatch: any) => {
      try { 
        await dispatch(setApiState({ isError: false, status: 200, message: "" , title:"" , icon:""}));
        const response = await get(
          `${AppConfig.REACT_APP_API_HOSTNAME}/reportDownload/login-logout-report/?start_date=${startDate}&end_date=${endDate}`,
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
        link.download = 'login-logout-report.pdf';
        document.body.appendChild(link); 
        link.click();
        document.body.removeChild(link);

        await dispatch(setApiState({ isError: false, status: 200, message: "Login-Logout Report Downloaded Successfully" , title:"Success!" , icon:"success"}));

      } catch (error: any) {
        dispatch(
          setApiState({
            isError: true,
            status: error?.response?.data?.status ?? 500,
            message: "Check Network Connectivity And Try Again!",
            title: "Downloading Failed",
            icon:"error",
          })
        );
      } finally {
        dispatch(stopLoading());
      }
    };
};

export const downloadVisitorReport = (startDate: string, endDate : string, headers: any = {}) => {  
    return async (dispatch: any) => {
      try { 
        await dispatch(setApiState({ isError: false, status: 200, message: "" , title:"" , icon:""}));
        const response = await get(
          `${AppConfig.REACT_APP_API_HOSTNAME}/reportDownload/visitor-report/?start_date=${startDate}&end_date=${endDate}`,
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
        link.download = 'visitor-report.pdf';
        document.body.appendChild(link); 
        link.click();
        document.body.removeChild(link);

        await dispatch(setApiState({ isError: false, status: 200, message: "Visitor Report Downloaded Successfully" , title:"Success!" , icon:"success"}));

      } catch (error: any) {
        dispatch(
          setApiState({
            isError: true,
            status: error?.response?.data?.status ?? 500,
            message: "Check Network Connectivity And Try Again!",
            title: "Downloading Failed",
            icon:"error",
          })
        );
      } finally {
        dispatch(stopLoading());
      }
    };
};

export const downloadVisitorVisitDateReport = (startDate: string, endDate : string, headers: any = {}) => { 
    return async (dispatch: any) => {
      try { 
        await dispatch(setApiState({ isError: false, status: 200, message: "" , title:"" , icon:""}));
        const response = await get(
          `${AppConfig.REACT_APP_API_HOSTNAME}/reportDownload/visitor-visit-date-report/?start_date=${startDate}&end_date=${endDate}`,
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
        link.download = 'visitor-visit-date-report.pdf';
        document.body.appendChild(link); 
        link.click();
        document.body.removeChild(link);

        await dispatch(setApiState({ isError: false, status: 200, message: "Visitor Visit Date Report Downloaded Successfully" , title:"Success!" , icon:"success"}));

      } catch (error: any) {
        dispatch(
          setApiState({
            isError: true,
            status: error?.response?.data?.status ?? 500,
            message: "Check Network Connectivity And Try Again!",
            title: "Downloading Failed",
            icon:"error",
          })
        );
      } finally {
        dispatch(stopLoading());
      }
    };
};

export const downloadGateVisitReport = (startDate: string, endDate : string, headers: any = {}) => {  
    return async (dispatch: any) => {
      try { 
        await dispatch(setApiState({ isError: false, status: 200, message: "" , title:"" , icon:""}));
        const response = await get(
          `${AppConfig.REACT_APP_API_HOSTNAME}/reportDownload/gate-visit-report/?start_date=${startDate}&end_date=${endDate}`,
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
        link.download = 'gate-visit-report.pdf';
        document.body.appendChild(link); 
        link.click();
        document.body.removeChild(link);

        await dispatch(setApiState({ isError: false, status: 200, message: "Gate Visit Report Downloaded Successfully" , title:"Success!" , icon:"success"}));

      } catch (error: any) {
        dispatch(
          setApiState({
            isError: true,
            status: error?.response?.data?.status ?? 500,
            message: "Check Network Connectivity And Try Again!",
            title: "Downloading Failed",
            icon:"error",
          })
        );
      } finally {
        dispatch(stopLoading());
      }
    };
};

export const downloadAppointmentExcelReport = (startDate: string, endDate: string, headers: any = {}) => {
  return async (dispatch: any) => {
    try {
      await dispatch(setApiState({ isError: false, status: 200, message: "", title: "", icon: "" }));

      const response = await get(
        `${AppConfig.REACT_APP_API_HOSTNAME}/reportDownload/appointment-report-excel/?start_date=${startDate}&end_date=${endDate}`,
        {
          headers: {
            "Authorization": headers.headers.Authorization,
          },
          responseType: 'blob',
        }
      );

      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'appointment-report.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      await dispatch(setApiState({
        isError: false,
        status: 200,
        message: "Appointment Excel Report Downloaded Successfully",
        title: "Success!",
        icon: "success"
      }));

    } catch (error: any) {
      dispatch(
        setApiState({
          isError: true,
          status: error?.response?.data?.status ?? 500,
          message: "Check Network Connectivity And Try Again!",
          title: "Downloading Failed",
          icon: "error",
        })
      );
    } finally {
      dispatch(stopLoading());
    }
  };
};

export const downloadLoginLogoutExcelReport = (startDate: string, endDate: string, headers: any = {}) => {
  return async (dispatch: any) => {
    try {
      await dispatch(setApiState({ isError: false, status: 200, message: "", title: "", icon: "" }));

      const response = await get(
        `${AppConfig.REACT_APP_API_HOSTNAME}/reportDownload/login-logout-report-excel/?start_date=${startDate}&end_date=${endDate}`,
        {
          headers: {
            "Authorization": headers.headers.Authorization,
          },
          responseType: 'blob',
        }
      );

      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'login-logout-report.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      await dispatch(setApiState({
        isError: false,
        status: 200,
        message: "login-logout Excel Report Downloaded Successfully",
        title: "Success!",
        icon: "success"
      }));

    } catch (error: any) {
      dispatch(
        setApiState({
          isError: true,
          status: error?.response?.data?.status ?? 500,
          message: "Check Network Connectivity And Try Again!",
          title: "Downloading Failed",
          icon: "error",
        })
      );
    } finally {
      dispatch(stopLoading());
    }
  };
};

export const downloadVisitorExcelReport = (startDate: string, endDate: string, headers: any = {}) => {
  return async (dispatch: any) => {
    try {
      await dispatch(setApiState({ isError: false, status: 200, message: "", title: "", icon: "" }));

      const response = await get(
        `${AppConfig.REACT_APP_API_HOSTNAME}/reportDownload/visitor-report-excel/?start_date=${startDate}&end_date=${endDate}`,
        {
          headers: {
            "Authorization": headers.headers.Authorization,
          },
          responseType: 'blob',
        }
      );

      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'visitor-report.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      await dispatch(setApiState({
        isError: false,
        status: 200,
        message: "Visitor Excel Report Downloaded Successfully",
        title: "Success!",
        icon: "success"
      }));

    } catch (error: any) {
      dispatch(
        setApiState({
          isError: true,
          status: error?.response?.data?.status ?? 500,
          message: "Check Network Connectivity And Try Again!",
          title: "Downloading Failed",
          icon: "error",
        })
      );
    } finally {
      dispatch(stopLoading());
    }
  };
};

export const downloadVisitorVisitDateExcelReport = (startDate: string, endDate: string, headers: any = {}) => {
  return async (dispatch: any) => {
    try {
      await dispatch(setApiState({ isError: false, status: 200, message: "", title: "", icon: "" }));

      const response = await get(
        `${AppConfig.REACT_APP_API_HOSTNAME}/reportDownload/visitor-visit-date-report-excel/?start_date=${startDate}&end_date=${endDate}`,
        {
          headers: {
            "Authorization": headers.headers.Authorization,
          },
          responseType: 'blob',
        }
      );

      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'Visitor-Visit-Date-Report.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      await dispatch(setApiState({
        isError: false,
        status: 200,
        message: "VisitorVisitDate Excel Report Downloaded Successfully",
        title: "Success!",
        icon: "success"
      }));

    } catch (error: any) {
      dispatch(
        setApiState({
          isError: true,
          status: error?.response?.data?.status ?? 500,
          message: "Check Network Connectivity And Try Again!",
          title: "Downloading Failed",
          icon: "error",
        })
      );
    } finally {
      dispatch(stopLoading());
    }
  };
};

export const downloadGateVisitExcelReport = (startDate: string, endDate: string, headers: any = {}) => {
  return async (dispatch: any) => {
    try {
      await dispatch(setApiState({ isError: false, status: 200, message: "", title: "", icon: "" }));

      const response = await get(
        `${AppConfig.REACT_APP_API_HOSTNAME}/reportDownload/gate-visit-report-excel/?start_date=${startDate}&end_date=${endDate}`,
        {
          headers: {
            "Authorization": headers.headers.Authorization,
          },
          responseType: 'blob',
        }
      );

      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'Gate-Visit-Report.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      await dispatch(setApiState({
        isError: false,
        status: 200,
        message: "GateVisitReport Excel Report Downloaded Successfully",
        title: "Success!",
        icon: "success"
      }));

    } catch (error: any) {
      dispatch(
        setApiState({
          isError: true,
          status: error?.response?.data?.status ?? 500,
          message: "Check Network Connectivity And Try Again!",
          title: "Downloading Failed",
          icon: "error",
        })
      );
    } finally {
      dispatch(stopLoading());
    }
  };
};
