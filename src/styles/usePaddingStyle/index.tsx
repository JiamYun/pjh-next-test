import { CSSProperties, useMemo } from "react";

import { ResponsiveType, useResponsiveType } from "@/hooks";

type UsePaddingStyle = {
  p?: number;
  px?: number;
  py?: number;
  pt?: number;
  pb?: number;
  pl?: number;
  pr?: number;
};

export interface UsePaddingStyleProps
  extends UsePaddingStyle,
    Partial<Record<ResponsiveType, UsePaddingStyle>> {}

export default function usePaddingStyle(props: UsePaddingStyleProps) {
  const { responsiveType } = useResponsiveType();
  const getPaddingStyle: CSSProperties = useMemo(() => {
    const getPading = (key: keyof UsePaddingStyle) => {
      const value = props[responsiveType]?.[key];
      return value !== undefined ? value : props[key];
    };
    return {
      paddingLeft: getPading("p") ?? getPading("pl") ?? getPading("px"),
      paddingRight: getPading("p") ?? getPading("pr") ?? getPading("px"),
      paddingTop: getPading("p") ?? getPading("pt") ?? getPading("py"),
      paddingBottom: getPading("p") ?? getPading("pb") ?? getPading("py"),
    };
  }, [responsiveType, props]);
  return { getPaddingStyle };
}
