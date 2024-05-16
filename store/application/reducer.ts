import { PayloadAction } from "@reduxjs/toolkit";

export const reducers = {
  setApplicationState(state: any, action: PayloadAction<any>) {
    const { bearerToken, user_type, user_name,user_pic } = action.payload;
    state.bearerToken = bearerToken;
    state.user_type = user_type;
    state.user_pic = user_pic;
    state.user_name = user_name;
  },
  setApiState(state: any, action: PayloadAction<any>) {
    state.apiState = action.payload;
  },
  setLoaderState(state: any, action: PayloadAction<any>) {
    state.loaderState = action.payload.loaderState;
  },
  setIsLoginError(state: any, action: PayloadAction<any>) {
    state.isLoginError = action.payload.isLoginError;
  }
};