import { CSSProperties, useMemo } from "react";

import { ResponsiveType, useResponsiveType } from "@/hooks";

type UseDimensionStyle = {
  w?: CSSProperties["width"];
  h?: CSSProperties["height"];
  minW?: CSSProperties["minWidth"];
  minH?: CSSProperties["minHeight"];
  maxW?: CSSProperties["maxWidth"];
  maxH?: CSSProperties["maxHeight"];
};

export interface UseDimensionStyleProps
  extends UseDimensionStyle,
    Partial<Record<ResponsiveType, UseDimensionStyle>> {}

export default function useDimensionStyle(props: UseDimensionStyleProps) {
  const { responsiveType } = useResponsiveType();

  const getDimensionStyle: CSSProperties = useMemo(() => {
    const getDimension = (key: keyof UseDimensionStyle) => {
      const value = props[responsiveType]?.[key];
      return value !== undefined ? value : props[key];
    };
    return {
      width: getDimension("w"),
      height: getDimension("h"),
      minWidth: getDimension("minW"),
      minHeight: getDimension("minH"),
      maxWidth: getDimension("maxW"),
      maxHeight: getDimension("maxH"),
    };
  }, [responsiveType, props]);
  return { getDimensionStyle };
}
