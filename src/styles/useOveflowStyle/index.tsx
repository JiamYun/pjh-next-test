import { CSSProperties, useMemo } from "react";

import { ResponsiveType, useResponsiveType } from "@/hooks";

type OverflowType = "hidden" | "scroll" | "x-scroll" | "y-scroll";

type UseOverflowStyle = {
  overflow?: OverflowType;
};

export interface UseOverflowStyleProps
  extends UseOverflowStyle,
    Partial<Record<ResponsiveType, UseOverflowStyle>> {}

export default function useOverflowStyle(props: UseOverflowStyleProps) {
  const { responsiveType } = useResponsiveType();

  const getOverflowStyle: CSSProperties = useMemo(() => {
    const getOverflow = (key: keyof UseOverflowStyle) => {
      const value = props[responsiveType]?.[key];
      return value !== undefined ? value : props[key];
    };

    const overflow = getOverflow("overflow");

    return {
      overflowX:
        overflow === "hidden"
          ? "hidden"
          : overflow === "scroll"
            ? "scroll"
            : overflow === "x-scroll"
              ? "scroll"
              : overflow === "y-scroll"
                ? "hidden"
                : undefined,
      overflowY:
        overflow === "hidden"
          ? "hidden"
          : overflow === "scroll"
            ? "scroll"
            : overflow === "y-scroll"
              ? "scroll"
              : overflow === "x-scroll"
                ? "hidden"
                : undefined,
    };
  }, [responsiveType, props]);

  return { getOverflowStyle };
}
