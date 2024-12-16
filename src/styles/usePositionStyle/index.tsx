import { CSSProperties, useMemo } from "react";

import { ResponsiveType, useResponsiveType } from "@/hooks";

type UsePositionStyle = {
  position?: CSSProperties["position"];
  inset?: number;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  zIndex?: number;
};

export interface UsePositionStyleProps
  extends UsePositionStyle,
    Partial<Record<ResponsiveType, UsePositionStyle>> {}

export default function usePositionStyle(props: UsePositionStyleProps) {
  const { responsiveType } = useResponsiveType();

  const getPositionStyle: CSSProperties = useMemo(() => {
    const getPosition = (key: keyof UsePositionStyle) => {
      const value = props[responsiveType]?.[key];
      return value !== undefined ? value : props[key];
    };

    const responsivePosition = props[responsiveType];
    const position = props;
    const css: CSSProperties = {};
    css.position = getPosition("position") as UsePositionStyle["position"];
    css.zIndex = getPosition("zIndex");

    if (responsivePosition) {
      css.top = responsivePosition.top ?? responsivePosition.inset;
      css.bottom = responsivePosition.bottom ?? responsivePosition.inset;
      css.left = responsivePosition.left ?? responsivePosition.inset;
      css.right = responsivePosition.right ?? responsivePosition.inset;
    } else {
      css.top = position.top ?? position.inset;
      css.bottom = position.bottom ?? position.inset;
      css.left = position.left ?? position.inset;
      css.right = position.right ?? position.inset;
    }

    return css;
  }, [responsiveType, props]);
  return { getPositionStyle };
}
