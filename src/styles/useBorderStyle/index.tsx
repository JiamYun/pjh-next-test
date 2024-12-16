import { CSSProperties, useMemo } from "react";

import { ResponsiveType, useResponsiveType } from "@/hooks";

import colors from "../colors";

type StrokePerSideType = ("all" | "top" | "bottom" | "left" | "right")[];
type StrokeProps = {
  size: number;
  color?: string;
  perSide?: StrokePerSideType;
};
type UseBorderStyle = {
  stroke?: StrokeProps;
};
export interface UseBorderStyleProps
  extends UseBorderStyle,
    Partial<Record<NonNullable<ResponsiveType>, UseBorderStyle>> {}

export default function useBorderStyle(props: UseBorderStyleProps) {
  const { responsiveType } = useResponsiveType();

  const getBorderStyle: CSSProperties = useMemo(() => {
    const css: CSSProperties = {};

    const getBorder = (key: keyof UseBorderStyle) => {
      const value = props[responsiveType]?.[key];
      return value !== undefined ? value : props[key];
    };
    if (getBorder("stroke")) {
      const border = getBorder("stroke")!;
      const color = border.color || colors.black;
      const size = border.size;
      const perSide = border.perSide;
    
      css.boxShadow = `${color} 0px 0px 0px ${size}px inset`;
      if (perSide?.some((v) => v === "all")) {
        return css;
      } else if (
        perSide?.some((v) => v === "top") ||
        perSide?.some((v) => v === "bottom") ||
        perSide?.some((v) => v === "left") ||
        perSide?.some((v) => v === "right")
      ) {
        css.boxShadow = "";
      }

      if (perSide?.some((v) => v === "top")) {
        css.boxShadow = `${color} 0px ${size}px 0px 0px inset`;
      }
      if (perSide?.some((v) => v === "bottom")) {
        if (css.boxShadow !== "") {
          css.boxShadow += ", ";
        }
        css.boxShadow += `${color} 0px -${size}px 0px 0px inset`;
      }
      if (perSide?.some((v) => v === "left")) {
        if (css.boxShadow !== "") {
          css.boxShadow += ", ";
        }
        css.boxShadow += `${color} ${size}px 0px 0px 0px inset`;
      }
      if (perSide?.some((v) => v === "right")) {
        if (css.boxShadow !== "") {
          css.boxShadow += ", ";
        }
        css.boxShadow += `${color} -${size}px 0px 0px 0px inset`;
      }
    }
    return css;
  }, [responsiveType, props]);

  return { getBorderStyle };
}
