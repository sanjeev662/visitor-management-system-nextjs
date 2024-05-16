interface Appointment {
    indexNo: number;
    appointmentId: number;
    fName: string;
    lName: string;
    AppointmentTime: string;
    govID: string;
    address: string;
    mobileNo: string;
    authorizedBy: any | null;
    empId: string;
    generateAppointmentTime: string;
    appointmentCancelledAt:boolean;
  }
  
  export const appointmentsModel = (appointmentObj: any = {}): Appointment => {
    return {
      indexNo: appointmentObj?.indexNo ?? 0,
      appointmentId: appointmentObj?.appointmentId ?? 0,
      fName: appointmentObj?.fName ?? "",
      lName: appointmentObj?.lName ?? "",
      AppointmentTime: appointmentObj?.AppointmentTime ?? "",
      govID: appointmentObj?.govID ?? "",
      address: appointmentObj?.address ?? "",
      mobileNo: appointmentObj?.mobileNo ?? "",
      authorizedBy: appointmentObj?.authorizedBy ?? null,
      empId: appointmentObj?.empId ?? "",
      generateAppointmentTime: appointmentObj?.generateAppointmentTime ?? "",
      appointmentCancelledAt:appointmentObj?.appointmentCancelledAt ?? false,
    };
  };
  