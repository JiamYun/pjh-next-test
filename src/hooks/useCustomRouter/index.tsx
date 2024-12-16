"use client";

import { useRouter } from "next/navigation";

import { useAppSelector } from "@/store";
import { useMemo } from "react";
export const routes = {
  main: "/",
  login: "/login",
  userboard: "/userboard",
  userboard_detail: "/userboard/[id]",
  userboard_edit: "/userboard/[id]/edit",
  userboard_write: "/userboard/write",
  donation: "/donation",
  profile: "/profile",
  settings: "/profile/settings",
  membership: "/profile/membership",
  notice: "/notice",
  notice_detail: "/notice/[id]",
  notification: "/notification",
  notification_detail: "/notification/[id]",
  museum: "/menu/museum",
  directions: "/menu/directions",
  facility: "/menu/facility",
  foundation: "/menu/foundation",
  library: "/menu/library",
  storyum: "/menu/storyum",
  menu: "/menu",
  terms: "/policies/terms",
  privacy: "/policies/privacy",
  presidentInfo: "/president-info",
  myPosts: "/profile/myposts",
  profileSettings: "/profile/settings/info",
} as const;
export type Routes = (typeof routes)[keyof typeof routes];
export type RootStackParamList = {
  main: {};
  login: {};
  userboard: {};
  donation: {};
  userboard_detail: { id: number };
  userboard_write: {};
  profile: {};
  settings: {};
  membership: {};
  notice: {};
  notice_detail: { id: number };
  notification: {};
  notification_detail: { id: number };
  museum: {};
  directions: {};
  facility: {};
  foundation: {};
  library: {};
  storyum: {};
  menu: {};
  terms: {};
  privacy: {};
  presidentInfo: {};
  myPosts: {};
  profileSettings: {};
};

// type ParamsRequired<Name extends keyof typeof routes> =
//   routeMap[Name] extends undefined ? never : routeMap[Name];

const useCustomRouter = () => {
  const fromApp = useAppSelector((state) => state.app.fromApp);
  const router = useRouter();

  const appRouterHandler = (
    type: "push" | "pop" | "replace",
    name?: string
  ) => {
    try {
      if (typeof window !== undefined) {
        // @ts-ignore
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            routes: {
              type,
              path: name ? name : "",
            },
          })
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  // function push<Name extends keyof typeof routes>(
  //   name: Name,
  //   params: ParamsRequired<Name>
  // ): void; // 'userboardDetail'은 path가 필수

  async function push<Name extends keyof typeof routes>(
    name: Name,
    params: RootStackParamList[Name]
  ) {
    const url = params
      ? // @ts-ignore
        routes[name].replace("[id]", `${params.id}`)
      : routes[name];
    if (fromApp) {
      appRouterHandler("push", url);
    } else {
      router.push(url);
    }
  }
  const pop = () => {
    if (fromApp) {
      appRouterHandler("pop");
    } else {
      router.back();
    }
  };
  const replace = (
    name: keyof typeof routes,
    isNavigationBar: boolean = false
  ) => {
    if (fromApp && !isNavigationBar) {
      appRouterHandler("replace", name);
    } else {
      router.replace(routes[name]);
    }
  };
  return useMemo(
    () => ({
      push,
      pop,
      replace,
    }),
    [push, pop, replace]
  );
};

export default useCustomRouter;
