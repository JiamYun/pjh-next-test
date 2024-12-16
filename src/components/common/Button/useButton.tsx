import {
  colors,
  typography,
  useBackgroundStyle,
  UseBackgroundStyleProps,
  useBorderStyle,
  UseBorderStyleProps,
  useFlexStyle,
  UseFlexStyleProps,
  useFontStyle,
  UseFontStyleProps,
  usePaddingStyle,
  UsePaddingStyleProps,
  usePositionStyle,
  UsePositionStyleProps,
  useRadiusStyle,
  UseRadiusStyleProps,
  UseDimensionStyleProps,
  useDimensionStyle,
} from "@/styles";
import React, { CSSProperties, ReactElement, ReactNode, useMemo } from "react";
import { Frame } from "@/atoms";
import { IconType } from "@/types";
import Icon, { IconProps, IconSizeProp } from "../Icon";
import { ResponsiveType, useResponsiveType } from "@/hooks";

type ButtonSizeMapKeyType = Partial<typeof typography> &
  Partial<UsePaddingStyleProps> &
  Partial<UseFontStyleProps>;
type ButtonStyleMapKeyType =
  | UseBorderStyleProps
  | UsePaddingStyleProps
  | UseFontStyleProps
  | UseBackgroundStyleProps;

export type ButtonSizeProps = "sm" | "md" | "lg";
export type ButtonStyleProps =
  | "solid"
  | "outline"
  | "ghost"
  | "link"
  | "custom"
  | "none";
export type ResponsiveButtonSizeProps = {
  size?: ButtonSizeProps;
};
export type UseButtonProps = UsePaddingStyleProps &
  Partial<Record<ResponsiveType, ResponsiveButtonSizeProps>> &
  ResponsiveButtonSizeProps &
  UseFontStyleProps &
  UseBorderStyleProps &
  UseFlexStyleProps &
  UseRadiusStyleProps &
  UsePositionStyleProps &
  UseDimensionStyleProps &
  UseBackgroundStyleProps & {
    children:
      | ReactNode
      | ReactElement<typeof Icon>
      | (ReactNode | ReactElement<typeof Icon>)[];
    prefix?: ReactElement<typeof Icon>;
    suffix?: ReactElement<typeof Icon>;
    color?: keyof typeof colors;
    style?: ButtonStyleProps;
    active?: ButtonStyleProps;
    loading?: boolean;
    isIconOnly?: boolean;
    disabled?: boolean;
    loadingStyle?: ButtonStyleMapKeyType;
    activeStyle?: ButtonStyleMapKeyType;
    iconStyle?: Pick<IconProps<IconType>, "fill" | "stroke" | "size">;
    iconActiveStyle?: Pick<IconProps<IconType>, "fill" | "stroke">;
    iconLoadingStyle?: Pick<IconProps<IconType>, "fill" | "stroke">;
  };

const buttonSizeMap: Record<ButtonSizeProps, ButtonSizeMapKeyType> = {
  sm: {
    px: 12,
    py: 7,
    ...typography["Body3"],
    fontWeight: 600,
  },
  md: { px: 15, py: 9, ...typography["Body3"], fontWeight: 600 },
  lg: { px: 20, py: 12, ...typography["Body2"], fontWeight: 600 },
};

const buttonIconSizeMap: Record<ButtonSizeProps, ButtonSizeMapKeyType> = {
  sm: { p: 8 },
  md: { p: 10 },
  lg: { p: 13 },
};
const buttonDisabledMap = {
  true: { opacity: 0.5, cursor: "not-allowed" },
  false: {},
};

const iconSizeMap: Record<ButtonSizeProps, IconSizeProp> = {
  sm: { size: 20 },
  md: { size: 20 },
  lg: { size: 22 },
};

const loadingSizeMap: Record<
  ButtonSizeProps,
  { fontSize: CSSProperties["fontSize"] }
> = {
  sm: { fontSize: "8px" },
  md: { fontSize: "8px" },
  lg: { fontSize: "9px" },
};

export default function useButton({
  children,
  prefix,
  suffix,
  activeStyle = {},
  loadingStyle = {},
  iconStyle = {},
  iconActiveStyle = {},
  iconLoadingStyle = {},
  color = "main",
  style = "none",
  active = "none",
  loading = false,
  isIconOnly = false,
  disabled = false,
  ...props
}: UseButtonProps) {
  const { responsiveType } = useResponsiveType();
  const getSize = (key: keyof ResponsiveButtonSizeProps) => {
    const value = props[responsiveType]?.[key];
    return value !== undefined ? value : props[key];
  };
  const getButtonStyleMap: Record<ButtonStyleProps, ButtonStyleMapKeyType> =
    useMemo(() => {
      return {
        solid: {
          stroke: { size: 1, color: colors.transparent },
          fontColor: colors.white,
          bg: colors[color]["500"],
        },
        outline: {
          stroke: { size: 1, color: colors[color]["500"] },
          bg: colors.transparent,
          fontColor: colors[color]["500"],
        },
        ghost: { fontColor: colors[color]["500"], bg: colors.transparent },
        link: {
          padding: 0,
          underline: true,
          underlineOffset: 2,
          fontColor: colors[color]["500"],
        },
        custom: { p: 0, ...props },
        none: {},
      };
    }, [color, props]);

  const getButtonActiveMap: Record<ButtonStyleProps, ButtonStyleMapKeyType> =
    useMemo(() => {
      return {
        solid: {
          bg: colors[color]["600"],
        },
        outline: {
          bg: colors[color]["100"],
        },
        ghost: {
          bg: colors[color]["100"],
        },
        link: {
          fontColor: colors[color]["600"],
        },
        custom: activeStyle,
        none: {},
      };
    }, [color, activeStyle]);

  const getButtonLoadingMap: Record<ButtonStyleProps, ButtonStyleMapKeyType> =
    useMemo(() => {
      return {
        solid: {
          bg: colors[color]["400"],
          fontColor: colors[color]["400"],
        },
        outline: {
          stroke: {
            size: 1,
            color: colors[color]["400"],
          },
          fontColor: colors.transparent,
        },
        ghost: {
          fontColor: colors.transparent,
        },
        link: {
          fontColor: colors.transparent,
        },
        custom: { fontColor: colors.transparent, ...loadingStyle },
        none: {},
      };
    }, [color, loadingStyle]);

  const getIconStyleMap: Record<
    ButtonStyleProps,
    Pick<IconProps<IconType>, "fill" | "stroke" | "size">
  > = useMemo(() => {
    return {
      solid: {
        //@ts-ignore
        fill: getButtonStyleMap[style].fontColor,
      },
      outline: {
        //@ts-ignore
        fill: getButtonStyleMap[style].fontColor,
      },
      ghost: {
        //@ts-ignore
        fill: getButtonStyleMap[style].fontColor,
      },
      link: {
        //@ts-ignore
        fill: getButtonStyleMap[style].fontColor,
      },
      custom: iconStyle,
      none: {},
    };
  }, [getButtonStyleMap, style, iconStyle]);

  const getIconActiveMap: Record<
    ButtonStyleProps,
    Pick<IconProps<IconType>, "fill" | "stroke">
  > = useMemo(() => {
    return {
      solid: {
        //@ts-ignore
        fill: getButtonStyleMap[style].fontColor,
      },
      outline: {
        //@ts-ignore
        fill: getButtonStyleMap[style].fontColor,
      },
      ghost: {
        //@ts-ignore
        fill: getButtonStyleMap[style].fontColor,
      },
      link: {
        //@ts-ignore
        fill: getButtonActiveMap[active].fontColor,
      },
      custom: iconActiveStyle as Pick<IconProps<IconType>, "fill" | "stroke">,
      none: {},
    };
  }, [getButtonActiveMap, active, getButtonStyleMap, style, iconActiveStyle]);

  const getIconLoadingMap: Record<
    ButtonStyleProps,
    Pick<IconProps<IconType>, "fill">
  > = useMemo(() => {
    return {
      solid: {
        //@ts-ignore
        fill: getButtonLoadingMap[loading ? style : "none"].fontColor,
      },
      outline: {
        //@ts-ignore
        fill: getButtonLoadingMap[loading ? style : "none"].fontColor,
      },
      ghost: {
        //@ts-ignore
        fill: getButtonLoadingMap[loading ? style : "none"].fontColor,
      },
      link: {
        //@ts-ignore
        fill: getButtonLoadingMap[loading ? style : "none"].fontColor,
      },
      custom: {
        //@ts-ignore
        fill: getButtonLoadingMap[loading ? style : "none"].fontColor,
      },
      none: {},
    };
  }, [getButtonLoadingMap, loading, style]);

  const { getFlexStyle } = useFlexStyle(props);
  const { getRadiusStyle } = useRadiusStyle(props);
  const { getPositionStyle } = usePositionStyle(props);
  const { getDimensionStyle } = useDimensionStyle(props);
  const { getFontStyle } = useFontStyle({
    ...props,
    ...buttonSizeMap[getSize("size")!],
    ...getButtonStyleMap[style],
    ...getButtonActiveMap[active],
    ...getButtonLoadingMap[loading ? style : "none"],
    ...buttonDisabledMap[String(disabled) as "false" | "true"],
  } as UseFontStyleProps);
  const { getBackgroundStyle } = useBackgroundStyle({
    ...props,
    ...getButtonStyleMap[style],
    ...getButtonActiveMap[active],
    ...getButtonLoadingMap[loading ? style : "none"],
    ...buttonDisabledMap[String(disabled) as "false" | "true"],
  } as UseBackgroundStyleProps);
  const { getBorderStyle } = useBorderStyle({
    ...props,
    ...getButtonStyleMap[style],
    ...getButtonLoadingMap[loading ? style : "none"],
  } as UseBorderStyleProps);
  const { getPaddingStyle } = usePaddingStyle(
    isIconOnly
      ? ({
          ...props,
          ...buttonIconSizeMap[getSize("size")!],
          ...getButtonStyleMap[style],
        } as UsePaddingStyleProps)
      : ({
          ...props,
          ...buttonSizeMap[getSize("size")!],
          ...getButtonStyleMap[style],
        } as UsePaddingStyleProps)
  );

  const body: ReactElement<typeof Icon>[] | ReactNode = !isIconOnly
    ? children
    : React.Children.toArray(children)
        .filter((child) => React.isValidElement(child) && child.type === Icon)
        .map((child) =>
          React.cloneElement(
            // @ts-ignore
            child,
            loading
              ? {
                  ...iconSizeMap[getSize("size")!],
                  ...getIconStyleMap[style],
                  ...getIconLoadingMap[loading ? style : "none"],
                }
              : active !== "none"
                ? {
                    ...iconSizeMap[getSize("size")!],
                    ...getIconStyleMap[style],
                    ...getIconActiveMap[active],
                  }
                : {
                    ...iconSizeMap[getSize("size")!],
                    ...getIconStyleMap[style],
                  }
          )
        )[0];

  const prefixIcon = isIconOnly
    ? null
    : prefix
      ? React.cloneElement(
          prefix,

          loading
            ? {
                ...iconSizeMap[getSize("size")!],
                ...getIconStyleMap[style],
                ...getIconLoadingMap[loading ? style : "none"],
              }
            : active !== "none"
              ? {
                  ...iconSizeMap[getSize("size")!],
                  ...getIconStyleMap[style],
                  ...getIconActiveMap[active],
                }
              : {
                  ...iconSizeMap[getSize("size")!],
                  ...getIconStyleMap[style],
                }
        )
      : null;

  const suffixIcon = isIconOnly
    ? null
    : suffix
      ? React.cloneElement(
          suffix,
          loading
            ? {
                ...iconSizeMap[getSize("size")!],
                ...getIconStyleMap[style],
                ...getIconLoadingMap[loading ? style : "none"],
              }
            : active !== "none"
              ? {
                  ...iconSizeMap[getSize("size")!],
                  ...getIconStyleMap[style],
                  ...getIconActiveMap[active],
                }
              : {
                  ...iconSizeMap[getSize("size")!],
                  ...getIconStyleMap[style],
                }
        )
      : null;

  const loadingIcon = loading ? (
    <Frame
      col
      zIndex={99}
      inset={0}
      position="absolute"
      alignment="center"
      w={"100%"}
      h={"100%"}
    >
      <div
        className="loading-spinner"
        style={{
          ...loadingSizeMap[getSize("size")!], // '8px' - 20 '9px' - 22
          // @ts-ignore
          border: `3px solid ${getButtonStyleMap[style].fontColor}`,
          // @ts-ignore
          borderTopColor: `${getButtonStyleMap[style].fontColor}50`,
        }}
      ></div>
    </Frame>
  ) : null;

  const getStyle: CSSProperties = useMemo(() => {
    return {
      ...getDimensionStyle,
      ...getFlexStyle,
      ...getPaddingStyle,
      ...getBorderStyle,
      ...getRadiusStyle,
      ...getFontStyle,
      ...getBackgroundStyle,
      ...getPositionStyle,
    };
  }, [
    getDimensionStyle,
    getFlexStyle,
    getBorderStyle,
    getPaddingStyle,
    getRadiusStyle,
    getFontStyle,
    getBackgroundStyle,
    getPositionStyle,
  ]);

  return { getStyle, body, prefixIcon, suffixIcon, loadingIcon };
}
