import { CSSProperties, useMemo } from "react";

import { ResponsiveType, useResponsiveType } from "@/hooks";

type AlignmentType =
  | "top-left"
  | "top-center"
  | "top-right"
  | "left"
  | "center"
  | "right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"
  | "top"
  | "bottom";
type UseFlexStyle = {
  col?: boolean;
  row?: boolean;
  alignment?: AlignmentType;
  flexWrap?: boolean;
  gap?: "auto" | number;
  flex?: number | string;
  hidden?: boolean;
};
export interface UseFlexStyleProps
  extends UseFlexStyle,
    Partial<Record<ResponsiveType, UseFlexStyle>> {}

export default function useFlexStyle(props: UseFlexStyleProps) {
  const { responsiveType } = useResponsiveType();

  const getFlexStyle: CSSProperties = useMemo(() => {
    const getFlex = (key: keyof UseFlexStyle) => {
      const value = props[responsiveType]?.[key];
      return value !== undefined ? value : props[key];
    };
    const getAlignment = () => {
      const value = props[responsiveType]?.alignment;
      return value !== undefined ? value : props.alignment;
    };

    const css: CSSProperties = {
      display: getFlex("hidden") ? "none" : "flex",
      flex: getFlex("flex") as number | string,
      flexWrap: getFlex("flexWrap") ? "wrap" : undefined,
      gap: getFlex("gap") as "auto" | number,
    };

    if (getFlex("col") && !props[responsiveType]?.row) {
      css.flexDirection = "column";
      switch (getAlignment()) {
        case "top-left":
          css.justifyContent = "flex-start";
          css.alignItems = "flex-start";
          break;
        case "top-center":
          css.justifyContent = "flex-start";
          css.alignItems = "center";
          break;
        case "top-right":
          css.justifyContent = "flex-start";
          css.alignItems = "flex-end";
          break;
        case "left":
          css.justifyContent = "center";
          css.alignItems = "flex-start";
          break;
        case "center":
          css.justifyContent = "center";
          css.alignItems = "center";
          break;
        case "right":
          css.justifyContent = "center";
          css.alignItems = "flex-end";
          break;
        case "bottom-left":
          css.justifyContent = "flex-end";
          css.alignItems = "flex-start";
          break;
        case "bottom-center":
          css.justifyContent = "flex-end";
          css.alignItems = "center";
          break;
        case "bottom-right":
          css.justifyContent = "flex-end";
          css.alignItems = "flex-end";
          break;
      }
    } else if (getFlex("row") && !props[responsiveType]?.col) {
      css.flexDirection = "row";
      switch (getAlignment()) {
        case "top-left":
          css.justifyContent = "flex-start";
          css.alignItems = "flex-start";
          break;
        case "top-center":
          css.justifyContent = "center";
          css.alignItems = "flex-start";
          break;
        case "top-right":
          css.justifyContent = "flex-end";
          css.alignItems = "flex-start";
          break;
        case "left":
          css.justifyContent = "flex-start";
          css.alignItems = "center";
          break;
        case "center":
          css.justifyContent = "center";
          css.alignItems = "center";
          break;
        case "right":
          css.justifyContent = "flex-end";
          css.alignItems = "center";
          break;
        case "bottom-left":
          css.justifyContent = "flex-start";
          css.alignItems = "flex-end";
          break;
        case "bottom-center":
          css.justifyContent = "center";
          css.alignItems = "flex-end";
          break;
        case "bottom-right":
          css.justifyContent = "flex-end";
          css.alignItems = "flex-end";
          break;
      }
    }
    if (getFlex("gap") === "auto") {
      css.gap = undefined;
      if (getFlex("col")) {
        switch (getAlignment()) {
          case "left":
            css.justifyContent = "space-between";
            css.alignItems = "flex-start";
            break;
          case "center":
            css.justifyContent = "space-between";
            css.alignItems = "center";
            break;
          case "right":
            css.justifyContent = "space-between";
            css.alignItems = "flex-end";
            break;
        }
      } else {
        switch (getAlignment()) {
          case "top":
            css.justifyContent = "space-between";
            css.alignItems = "flex-start";
            break;
          case "center":
            css.justifyContent = "space-between";
            css.alignItems = "center";
            break;
          case "bottom":
            css.justifyContent = "space-between";
            css.alignItems = "flex-end";
            break;
        }
      }
    }
    return css;
  }, [responsiveType, props]);

  return { getFlexStyle };
}
