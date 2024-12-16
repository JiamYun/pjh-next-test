import { CSSProperties, useMemo } from "react";

import {
  useBackgroundStyle,
  UseBackgroundStyleProps,
  useBorderStyle,
  UseBorderStyleProps,
  useBoxShadowStyle,
  UseBoxShadowStyleProps,
  useDimensionStyle,
  UseDimensionStyleProps,
  useFlexStyle,
  UseFlexStyleProps,
  useOverflowStyle,
  UseOverflowStyleProps,
  usePaddingStyle,
  UsePaddingStyleProps,
  usePositionStyle,
  UsePositionStyleProps,
  useRadiusStyle,
  UseRadiusStyleProps,
  useTransStyle,
  UseTransStyleProps,
} from "@/styles";

export type UseFrameProps = UsePaddingStyleProps &
  UseBorderStyleProps &
  UseFlexStyleProps &
  UsePositionStyleProps &
  UseBoxShadowStyleProps &
  UseRadiusStyleProps &
  UseOverflowStyleProps &
  UseTransStyleProps &
  UseDimensionStyleProps &
  UseBackgroundStyleProps & {
    m?: "auto";
  };

export default function useFrame(props: UseFrameProps) {
  const { getBorderStyle } = useBorderStyle(props);
  const { getBoxShdowStyle } = useBoxShadowStyle(props, {
    boxShadow: getBorderStyle.boxShadow,
  });
  const { getPaddingStyle } = usePaddingStyle(props);
  const { getFlexStyle } = useFlexStyle(props);
  const { getPositionStyle } = usePositionStyle(props);
  const { getRadiusStyle } = useRadiusStyle(props);
  const { getOverflowStyle } = useOverflowStyle(props);
  const { getTransStyle } = useTransStyle(props);
  const { getBackgroundStyle } = useBackgroundStyle(props);
  const { getDimensionStyle } = useDimensionStyle(props);

  const getStyle: CSSProperties = useMemo(() => {
    return {
      ...getFlexStyle,
      ...getPaddingStyle,
      ...getPositionStyle,
      ...getBoxShdowStyle,
      ...getRadiusStyle,
      ...getOverflowStyle,
      ...getTransStyle,
      ...getDimensionStyle,
      ...getBackgroundStyle,
      margin: props.m,
    };
  }, [
    getFlexStyle,
    getPaddingStyle,
    getPositionStyle,
    getBoxShdowStyle,
    getRadiusStyle,
    getOverflowStyle,
    getTransStyle,
    getDimensionStyle,
    getBackgroundStyle,
  ]);

  return { getStyle };
}
