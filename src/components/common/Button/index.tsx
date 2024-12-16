"use client";

import React, { forwardRef, useMemo, useState } from "react";

import { colors } from "@/styles";

import useButton, { UseButtonProps } from "./useButton";

interface ButtonProps
  extends Pick<React.HTMLAttributes<HTMLButtonElement>, "onClick">,
    Omit<UseButtonProps, "active"> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      onClick,
      radius,
      disabled,
      loading,
      w,
      h,
      alignment,
      gap,
      size,
      col,
      style = "custom",
      row = true,
      ...props
    },
    ref
  ) => {
    const [isActive, setIsActive] = useState(false);
    const isCustom = useMemo(() => {
      if (style === "custom") {
        return {
          w: w ?? "fit-content",
          h: h ?? "fit-content",
          row: col ? false : row,
          col,
          alignment: alignment || "center",
          radius,
          gap,
        };
      } else {
        return {
          w: w ?? "fit-content",
          h: h ?? "fit-content",
          row: col ? false : row,
          col,
          alignment: alignment || "center",
          radius: radius ?? 6,
          gap: gap ?? 8,
        };
      }
    }, [w, h, row, col, alignment, radius, gap, style]);
    const { getStyle, body, prefixIcon, suffixIcon, loadingIcon } = useButton({
      style,
      loading,
      disabled,
      position: "relative",
      size: size || "md",
      active: isActive ? style : "none",
      ...isCustom,
      ...props,
    });

    return (
      <button
        ref={ref}
        onClick={onClick}
        style={{
          ...getStyle,
        }}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        onTouchStart={() => setIsActive(true)}
        onTouchEnd={() => setIsActive(false)}
        disabled={loading || disabled}
      >
        {loadingIcon}
        {prefixIcon}
        {body}
        {suffixIcon}
      </button>
    );
  }
);

type PickButtonProps =
  | "radius"
  | "prefix"
  | "suffix"
  | "children"
  | "size"
  | "disabled"
  | "isIconOnly"
  | "mobile"
  | "tablet"
  | "desktop"
  | "loading";
interface ButtonTypeProps
  extends Pick<React.HTMLAttributes<HTMLButtonElement>, "onClick">,
    Pick<ButtonProps, PickButtonProps> {
  color?: keyof typeof colors;
  fullWidth?: boolean;
}

export const ButtonSolid = forwardRef<HTMLButtonElement, ButtonTypeProps>(
  (props, ref) => {
    const {
      onClick,
      children,
      prefix,
      suffix,
      size,
      disabled,
      isIconOnly,
      radius,
      color,
      loading,
      fullWidth,
    } = props;

    return (
      <Button
        ref={ref}
        onClick={onClick}
        prefix={prefix}
        suffix={suffix}
        radius={radius}
        style={"solid"}
        loading={loading}
        w={fullWidth ? "100%" : "fit-content"}
        size={size}
        color={color}
        disabled={disabled}
        isIconOnly={isIconOnly}
      >
        {children}
      </Button>
    );
  }
);

export const ButtonOutline = forwardRef<HTMLButtonElement, ButtonTypeProps>(
  (props, ref) => {
    const {
      onClick,
      children,
      prefix,
      suffix,
      size,
      disabled,
      isIconOnly,
      radius,
      color,
      loading,
      fullWidth,
    } = props;

    return (
      <Button
        ref={ref}
        onClick={onClick}
        prefix={prefix}
        suffix={suffix}
        radius={radius}
        style={"outline"}
        loading={loading}
        w={fullWidth ? "100%" : "fit-content"}
        size={size}
        color={color}
        disabled={disabled}
        isIconOnly={isIconOnly}
      >
        {children}
      </Button>
    );
  }
);

export const ButtonGhost = forwardRef<HTMLButtonElement, ButtonTypeProps>(
  (props, ref) => {
    const {
      onClick,
      children,
      prefix,
      suffix,
      size,
      disabled,
      isIconOnly,
      radius,
      color,
      loading,
      fullWidth,
    } = props;

    return (
      <Button
        ref={ref}
        onClick={onClick}
        prefix={prefix}
        suffix={suffix}
        radius={radius}
        style={"ghost"}
        loading={loading}
        w={fullWidth ? "100%" : "fit-content"}
        size={size}
        color={color}
        disabled={disabled}
        isIconOnly={isIconOnly}
      >
        {children}
      </Button>
    );
  }
);

export const ButtonLink = forwardRef<HTMLButtonElement, ButtonTypeProps>(
  (props, ref) => {
    const {
      onClick,
      children,
      prefix,
      suffix,
      size,
      disabled,
      isIconOnly,
      radius,
      color,
      loading,
      fullWidth,
    } = props;

    return (
      <Button
        ref={ref}
        onClick={onClick}
        prefix={prefix}
        suffix={suffix}
        radius={radius}
        style={"link"}
        loading={loading}
        w={fullWidth ? "100%" : "fit-content"}
        size={size}
        color={color}
        disabled={disabled}
        isIconOnly={isIconOnly}
      >
        {children}
      </Button>
    );
  }
);

Button.displayName = "Hingoray.Button";
ButtonSolid.displayName = "Hingoray.SolidButton";
ButtonOutline.displayName = "Hingoray.OutlineButton";
ButtonGhost.displayName = "Hingoray.GhostButton";
ButtonLink.displayName = "Hingoray.LinkButton";

export default Button;