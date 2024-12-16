"use client";

import { AppStore, makeStore } from "@/store";
import appSlice, { AppResponse } from "@/store/slices/appSlice";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    if (typeof window !== undefined) {
      const appHandler = (e: Event) => {
        try {
          const data: AppResponse & {
            tokens?: { accessToken: string; refreshToken: string };
            //@ts-ignore
          } = JSON.parse(e.data);

          if (data.appName === "MyApp") {
            storeRef.current?.dispatch(appSlice.actions.setFromApp(true));
            return;
          }
          if (data.safeArea) {
            storeRef.current?.dispatch(
              appSlice.actions.setSafeAreaSize(data.safeArea.size)
            );
            return;
          }
          if (
            data.tokens &&
            data.tokens.accessToken &&
            data.tokens.refreshToken
          ) {
            storeRef.current?.dispatch(
              appSlice.actions.setAuthTokens(data.tokens)
            );
          }
          if (data.login) {
            if (data.login.accessToken && data.login.refreshToken) {
              storeRef.current?.dispatch(
                appSlice.actions.setAuthTokens({
                  accessToken: data.login.accessToken,
                  refreshToken: data.login.refreshToken,
                })
              );
            }
            // TODO: should set data on userSlise
          }
        } catch (error) {
          console.log("error===", JSON.stringify(error, null, 2));
        }
      };

      // ios
      window.addEventListener("message", (e) => appHandler(e));
      // android
      window.document.addEventListener("message", (e) => appHandler(e));

      return () => {
        //clear
        window.removeEventListener("message", (e) => appHandler(e));
        window.document.removeEventListener("message", (e) => appHandler(e));
      };
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
