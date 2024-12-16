import { CSSProperties, useMemo } from "react";

import { ResponsiveType, useResponsiveType } from "@/hooks";

type UseFontStyle = {
  fontSize?: CSSProperties["fontSize"];
  fontWeight?: CSSProperties["fontWeight"];
  lineHeight?: CSSProperties["lineHeight"];
  fontColor?: string;
  underline?: boolean;
  underlineOffset?: number;
};

export interface UseFontStyleProps
  extends UseFontStyle,
    Partial<Record<ResponsiveType, UseFontStyle>> {}

export default function useFontStyle(props: UseFontStyleProps) {
  const { responsiveType } = useResponsiveType();

  const getFontStyle: CSSProperties = useMemo(() => {
    const getFont = (key: keyof UseFontStyle) => {
      const value = props[responsiveType]?.[key];
      return value !== undefined ? value : props[key];
    };

    return {
      fontSize: getFont("fontSize") as keyof UseFontStyle["fontSize"],
      fontWeight: getFont("fontWeight") as keyof UseFontStyle["fontWeight"],
      lineHeight: getFont("lineHeight") as keyof UseFontStyle["lineHeight"],
      color: getFont("fontColor") as keyof UseFontStyle["fontColor"],
      textDecorationLine: getFont("underline") ? "underline" : undefined,
      textUnderlineOffset: getFont(
        "underlineOffset"
      ) as keyof UseFontStyle["underlineOffset"],
    };
  }, [responsiveType, props]);
  return { getFontStyle };
}
