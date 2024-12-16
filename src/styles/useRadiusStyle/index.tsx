import { CSSProperties, useMemo } from "react";

import { ResponsiveType, useResponsiveType } from "@/hooks";

type UseRadiusStyle = {
  radius?: number;
  radiusTL?: number;
  radiusTR?: number;
  radiusBL?: number;
  radiusBR?: number;
};

export interface UseRadiusStyleProps
  extends UseRadiusStyle,
    Partial<Record<ResponsiveType, UseRadiusStyle>> {}

export default function useRadiusStyle(props: UseRadiusStyleProps) {
  const { responsiveType } = useResponsiveType();
  const getRadiusStyle: CSSProperties = useMemo(() => {
    const getRadius = (key: keyof UseRadiusStyle) => {
      const value = props[responsiveType]?.[key];
      return value !== undefined ? value : props[key];
    };
    return {
      borderTopLeftRadius: getRadius("radiusTL") ?? getRadius("radius"),
      borderTopRightRadius: getRadius("radiusTR") ?? getRadius("radius"),
      borderBottomLeftRadius: getRadius("radiusBL") ?? getRadius("radius"),
      borderBottomRightRadius: getRadius("radiusBR") ?? getRadius("radius"),
    };
  }, [responsiveType, props]);
  return { getRadiusStyle };
}
