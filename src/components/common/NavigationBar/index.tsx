"use client";

import React, { useEffect, useState } from "react";

import { Frame } from "@/atoms";
import { useCustomRouter } from "@/hooks";

import { Button, Icon } from "@/components";
import { colors } from "@/styles";
import { usePathname } from "next/navigation";

import { useAppSelector } from "@/store";

const TabbarPathList = [
  "/",
  "/userboard",
  "/donation",
  "/profile",
  "/profile/membership",
];

export default function NavigationBar() {
  const { replace } = useCustomRouter();
  const pathname = usePathname();
  const safeArea = useAppSelector((state) => state.app.response.safeArea);
  const [isNavigationBar, setIsNavigationBar] = useState(true);
  const [path, setPath] = useState("");

  useEffect(() => {
    const visibilityChangeHandler = () => {
      if (typeof window !== undefined) {
        if (TabbarPathList.some((path) => path === location.pathname)) {
          setIsNavigationBar(true);
          setPath(location.pathname);
        } else {
          setIsNavigationBar(false);
        }
      }
    };
    visibilityChangeHandler();
  }, [pathname]);

  return (
    <>
      {isNavigationBar && (
        <>
          <Frame w={"100%"} bg={safeArea.color.bottom} minH={66} h={66} />
          <Frame
            zIndex={9999}
            w={"100%"}
            row
            position="fixed"
            left={0}
            h={66 + safeArea.size.bottom}
            minH={66 + safeArea.size.bottom}
            bottom={0}
          >
            <Frame
              row
              w={"100%"}
              h={66 + safeArea.size.bottom}
              minH={66 + safeArea.size.bottom}
              pb={safeArea.size.bottom}
              bg={colors.white}
              pt={1}
              stroke={{
                size: 1,
                perSide: ["top"],
                color: colors.neutral["200"],
              }}
            >
              <Button
                fontSize={"12px"}
                fontWeight={"400"}
                lineHeight={"22px"}
                flex={1}
                col
                gap={4}
                h={"100%"}
                onClick={() => {
                  if (TabbarPathList[0] !== path) {
                    replace("main", true);
                  }
                }}
                fontColor={colors.black}
                activeStyle={{
                  opacity: 0.3,
                }}
                bg={colors.white}
              >
                <Frame minW={28} minH={28} w={28} h={28} alignment="center">
                  <Icon
                    size={28}
                    type="menu"
                    name={TabbarPathList[0] !== path ? "home" : "home-selected"}
                  />
                </Frame>
                홈
              </Button>

              <Button
                fontSize={"12px"}
                fontWeight={"400"}
                lineHeight={"22px"}
                flex={1}
                col
                gap={4}
                h={"100%"}
                onClick={() => {
                  if (TabbarPathList[1] !== path) {
                    replace("userboard", true);
                  }
                }}
                fontColor={colors.black}
                bg={colors.white}
                activeStyle={{ opacity: 0.3 }}
              >
                <Frame minW={28} minH={28} w={28} h={28} alignment="center">
                  <Icon
                    size={20}
                    type="menu"
                    name={
                      TabbarPathList[1] === path ? "board-selected" : "board"
                    }
                  />
                </Frame>
                게시판
              </Button>
              <Button
                fontSize={"12px"}
                fontWeight={"400"}
                lineHeight={"22px"}
                flex={1}
                col
                gap={4}
                h={"100%"}
                onClick={() => {
                  if (TabbarPathList[2] !== path) {
                    replace("donation", true);
                  }
                }}
                fontColor={colors.black}
                bg={colors.white}
                activeStyle={{ opacity: 0.3 }}
              >
                <Frame minW={28} minH={28} w={28} h={28} alignment="center">
                  <Icon
                    type="menu"
                    name={
                      TabbarPathList[2] === path
                        ? "donation-selected-new"
                        : "donation-new"
                    }
                    size={21}
                  />
                </Frame>
                후원신청
              </Button>
              <Button
                fontSize={"12px"}
                fontWeight={"400"}
                lineHeight={"22px"}
                flex={1}
                col
                gap={4}
                h={"100%"}
                onClick={() => {
                  if (TabbarPathList[3] !== path) {
                    replace("profile", true);
                  }
                }}
                fontColor={colors.black}
                activeStyle={{
                  opacity: 0.3,
                }}
                bg={colors.white}
              >
                <Frame minW={28} minH={28} w={28} h={28} alignment="center">
                  <Icon
                    type="menu"
                    name={
                      TabbarPathList[3] === path ||
                      path === "/profile/membership"
                        ? "profile-selected"
                        : "profile"
                    }
                    size={28}
                  />
                </Frame>
                마이페이지
              </Button>
            </Frame>
          </Frame>
        </>
      )}
    </>
  );
}
