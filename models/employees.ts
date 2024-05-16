interface User {
    user_id: number;
    user_name: string;
    password: string;
    shift_time: string;
    designation: string;
    contact_number_l: string;
    contact_number_m: string;
    address: string;
    user_type: string;
    palm_image: string;
    photo_image: string;
  }
  
  export const employeesModel = (userObj: any = {}): User => {
    return {
      user_id: userObj?.user_id ?? 0,
      user_name: userObj?.user_name ?? "",
      password: userObj?.password ?? "",
      shift_time: userObj?.shift_time ?? "",
      designation: userObj?.designation ?? "",
      contact_number_l: userObj?.contact_number_l ?? "",
      contact_number_m: userObj?.contact_number_m ?? "",
      address: userObj?.address ?? "",
      user_type: userObj?.user_type ?? "",
      palm_image: userObj?.palm_image ?? "",
      photo_image: userObj?.photo_image ?? "",
    };
  };
  