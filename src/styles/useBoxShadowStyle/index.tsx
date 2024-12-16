import { CSSProperties, useMemo } from "react";

import { ResponsiveType, useResponsiveType } from "@/hooks";

import colors from "../colors";

type BoxShadowStyleType = "drop-shadow" | "inner-shadow" | "layer-blur";

type UseBoxShadowStyle = {
  effects?: {
    x?: number;
    y?: number;
    style?: BoxShadowStyleType;
    blur?: number;
    spread?: number;
    color?: string;
  }[];
};

export interface UseBoxShadowStyleProps
  extends UseBoxShadowStyle,
    Partial<Record<ResponsiveType, UseBoxShadowStyle>> {}

export default function useBoxShadowStyle(
  props: UseBoxShadowStyleProps,
  { boxShadow }: { boxShadow?: CSSProperties["boxShadow"] }
) {
  const { responsiveType } = useResponsiveType();

  const getBoxShdowStyle: CSSProperties = useMemo(() => {
    const css: CSSProperties = {};

    const getBoxShdow = (key: keyof UseBoxShadowStyle) => {
      const value = props[responsiveType]?.[key];
      return value !== undefined ? value : props[key];
    };

    if (getBoxShdow("effects")) {
      const boxShadow = getBoxShdow("effects")!;
      if (boxShadow.length > 1) {
        css.boxShadow = "";
        const findIndex = boxShadow.findIndex((v) => v.style === "layer-blur");
        if (findIndex > -1) {
          // css.filter = `blur(${boxShadow[findIndex].blur || 0}px)`;
          css.backdropFilter = `blur(${boxShadow[findIndex].blur || 0}px)`;
          // css.WebkitFilter = `blur(${boxShadow[findIndex].blur || 0}px)`;
        }
        for (let i = 0; i < boxShadow.length; i++) {
          if (boxShadow[i].style !== "layer-blur") {
            if (css.boxShadow !== "") {
              css.boxShadow += ", ";
            }
            css.boxShadow += `${boxShadow[i].color || colors.black} ${
              boxShadow[i].x || 0
            }px ${boxShadow[i].y || 0}px ${boxShadow[i].blur || 0}px ${
              boxShadow[i].spread || 0
            }px${boxShadow[i].style === "inner-shadow" ? " inset" : ""}`;
          }
        }
      } else {
        if (boxShadow[0]) {
          if (boxShadow[0].style === "layer-blur") {
            // css.filter = `blur(${boxShadow[0].blur || 0}px)`;
            css.backdropFilter = `blur(${boxShadow[0].blur || 0}px)`;
            // css.WebkitFilter = `blur(${boxShadow[0].blur || 0}px)`;
          } else {
            css.boxShadow = `${boxShadow[0].color || colors.black} ${
              boxShadow[0].x || 0
            }px ${boxShadow[0].y || 0}px ${boxShadow[0].blur || 0}px ${
              boxShadow[0].spread || 0
            }px ${boxShadow[0].style === "inner-shadow" ? "inset" : ""}`;
          }
        }
      }
    }

    if (boxShadow && css.boxShadow) {
      css.boxShadow = `${boxShadow}, ${css.boxShadow}`;
    } else if (boxShadow) {
      css.boxShadow = boxShadow;
    }

    return css;
  }, [responsiveType, props, boxShadow]);
  return { getBoxShdowStyle };
}
