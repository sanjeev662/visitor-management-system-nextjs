import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { createWrapper } from "next-redux-wrapper"; 
import { applicationSlice } from "./application/slice";
import { visitorDetailsSlice } from "./visitors/slice";
import { visitorPassDetailsSlice } from "./pass/slice";
import { allAppointmentDetailsSlice } from "./appointments/slice";
import { employeeDetailsSlice } from "./employees/slice";
import { dashboardDetailsSlice } from "./dashboard/slice";
import { cameraAnalysisDetailsSlice } from "./camera/slice";

const makeStore = () =>
  configureStore({
    reducer: {
      [applicationSlice.name]: applicationSlice.reducer,
      [visitorDetailsSlice.name]: visitorDetailsSlice.reducer,
      [allAppointmentDetailsSlice.name]: allAppointmentDetailsSlice.reducer,
      [employeeDetailsSlice.name]: employeeDetailsSlice.reducer,
      [dashboardDetailsSlice.name]: dashboardDetailsSlice.reducer,
      [cameraAnalysisDetailsSlice.name]: cameraAnalysisDetailsSlice.reducer,
      [visitorPassDetailsSlice.name]: visitorPassDetailsSlice.reducer,     
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
  });

  type Store = ReturnType<typeof makeStore>;
  export type AppDispatch = Store["dispatch"];
  export type RootState = ReturnType<Store["getState"]>;
  export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const wrapper = createWrapper<Store>(makeStore);
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;