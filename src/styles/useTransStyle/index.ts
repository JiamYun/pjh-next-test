import { CSSProperties, useMemo } from "react";

import { ResponsiveType, useResponsiveType } from "@/hooks";

type UseTransStyle = {
  transform?: CSSProperties["transform"];
  transitionProperty?: CSSProperties["transitionProperty"];
  transitionTimingFunction?: CSSProperties["transitionTimingFunction"];
  transitionDuration?: CSSProperties["transitionDuration"];
};

export interface UseTransStyleProps
  extends UseTransStyle,
    Partial<Record<ResponsiveType, UseTransStyle>> {}

export default function useTransStyle(props: UseTransStyleProps) {
  const { responsiveType } = useResponsiveType();

  const getTransStyle: CSSProperties = useMemo(() => {
    const getTrans = (key: keyof UseTransStyle) => {
      const value = props[responsiveType]?.[key];
      return value !== undefined ? value : props[key];
    };
    return {
      transform: getTrans("transform"),
      transitionProperty: getTrans("transitionProperty"),
      transitionTimingFunction: getTrans("transitionTimingFunction"),
      transitionDuration: getTrans("transitionDuration"),
    };
  }, [responsiveType, props]);

  return {
    getTransStyle,
  };
}
