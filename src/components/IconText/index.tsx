import React from "react";
import { Frame, Body4 } from "@/atoms";
import { Icon } from "@/components";

interface IconTextProps {
  type: string;
  name: string;
  content: string;
  size?: number;
  alignment?: "top" | "center" | "bottom";
  pl?: number;
  pt?: number;
}

export const IconText = ({
  type,
  name,
  content,
  size = 20,
  alignment = "top",
  pl = 12,
  pt = 0,
}: IconTextProps) => {
  return (
    <Frame row w="100%" alignment={alignment} py={8}>
      {/* @ts-ignore */}
      <Icon type={type} name={name} size={size} />
      <Body4 pl={pl} pt={pt}>
        {content}
      </Body4>
    </Frame>
  );
};
