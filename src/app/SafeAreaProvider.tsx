"use client";
import React from "react";
import { Frame } from "@/atoms";
import { useAppSelector } from "@/store";

export default function SafeAreaProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const safeArea = useAppSelector((state) => state.app.response.safeArea);
  return (
    <div className="w-full h-full">
      <Frame
        w={"100%"}
        h={safeArea.size.top}
        minH={safeArea.size.top}
        bg={safeArea.color.top}
        zIndex={999}
      />
      <Frame w={"100%"} flex={1}>
        {children}
      </Frame>
      <Frame
        w={"100%"}
        h={safeArea.size.bottom}
        minH={safeArea.size.bottom}
        bg={safeArea.color.bottom}
        zIndex={999}
      />
    </div>
  );
}
