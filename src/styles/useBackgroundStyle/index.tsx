import { CSSProperties, useMemo } from "react";

import { ResponsiveType, useResponsiveType } from "@/hooks";

type UseBackgroundStyle = {
  bg?: string;
  cursor?: CSSProperties["cursor"];
  opacity?: CSSProperties["opacity"];
};

export interface UseBackgroundStyleProps
  extends UseBackgroundStyle,
    Partial<Record<ResponsiveType, UseBackgroundStyle>> {}

export default function useBackgroundStyle(props: UseBackgroundStyleProps) {
  const { responsiveType } = useResponsiveType();
  const getBackgroundStyle: CSSProperties = useMemo(() => {
    const getBackground = (key: keyof UseBackgroundStyle) => {
      const value = props[responsiveType]?.[key];
      return value !== undefined ? value : props[key];
    };
    return {
      backgroundColor: getBackground("bg") as keyof UseBackgroundStyle["bg"],
      opacity: getBackground("opacity") as keyof UseBackgroundStyle["opacity"],
      cursor: getBackground("cursor") as keyof UseBackgroundStyle["cursor"],
    };
  }, [responsiveType, props]);
  return { getBackgroundStyle };
}
