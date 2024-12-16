import { configureStore } from "@reduxjs/toolkit";
import noticeReducer from "./slices/noticeSlice";
import infiniteScrollReducer from "./slices/infiniteScrollSlice";
import userboardReducer from "./slices/userboardSlice";
import appReducer from "./slices/appSlice";
import { useDispatch, useSelector, useStore } from "react-redux";
import notificationSlice from "./slices/notificationSlice";
import signupSlice from "./slices/singupSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      app: appReducer.reducer,
      notice: noticeReducer.reducer,
      infiniteScroll: infiniteScrollReducer.reducer,
      userboard: userboardReducer.reducer,
      notification: notificationSlice.reducer,
      signup: signupSlice.reducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
