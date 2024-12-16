"use client";

import React, { useMemo, useState } from "react";

import { Frame, Text } from "@/atoms";
import { ResponsiveType, useResponsiveType } from "@/hooks";
import {
  animations,
  colors,
  UseFlexStyleProps,
  UseFontStyleProps,
} from "@/styles";

interface RadioItem {
  value: string;
  label: string;
}

type RadioSize = "sm" | "md" | "lg";

type RadioSizeProp = {
  size?: RadioSize;
};

export type RadioGroupProps = RadioSizeProp &
  Partial<Record<ResponsiveType, RadioSizeProp>> & {
    list: RadioItem[];
    onValueChange: (value: RadioItem | undefined) => void;
    orientation?: "horizontal" | "vertical";
    disabled?: boolean;
    color?: keyof typeof colors;
    fontColor?: UseFontStyleProps["fontColor"];
    gap?: UseFlexStyleProps["gap"];
  };

export const RadioGroup: React.FC<RadioGroupProps> = ({
  list,
  onValueChange,
  orientation = "vertical",
  disabled = false,
  size = "md",
  color = "main",
  fontColor = colors.black,
  gap = 8,
  ...props
}) => {
  const [value, setValue] = useState<RadioItem>();
  const { responsiveType } = useResponsiveType();

  const circleWrapSizeStyleMap = {
    sm: { w: 16, h: 16 },
    md: { w: 20, h: 20 },
    lg: { w: 24, h: 24 },
  };
  const circleSizeStyleMap = {
    sm: { w: 8.17, h: 8.17 },
    md: { w: 10.9, h: 10.9 },
    lg: { w: 14.3, h: 14.3 },
  };

  const circleWrapStrokeSizeMap = {
    sm: 1,
    md: 2,
    lg: 2,
  };

  const getSize = useMemo(() => {
    const value = props[responsiveType]?.size;
    return value !== undefined ? value : size;
  }, [size, props, responsiveType]);

  const labelSizeStyleMap: Record<RadioSize, UseFontStyleProps> =
    useMemo(() => {
      return {
        sm: {
          fontWeight: 400,
          fontSize: 14,
          lineHeight: "22px",
          fontColor,
        },
        md: {
          fontWeight: 400,
          fontSize: 16,
          lineHeight: "26px",
          fontColor,
        },
        lg: {
          fontWeight: 400,
          fontSize: 18,
          lineHeight: "28px",
          fontColor,
        },
      };
    }, [fontColor]);

  const circleWrapAnimation = (isChecked: boolean) => {
    return {
      stroke: {
        size: circleWrapStrokeSizeMap[getSize],
        color: isChecked ? colors[color]["500"] : colors["neutral"]["400"],
      },
    };
  };

  const circleAnimation = (isChecked: boolean) => {
    return {
      bg: colors[color]["500"],
      w: isChecked ? circleSizeStyleMap[getSize].w : 0,
      h: isChecked ? circleSizeStyleMap[getSize].h : 0,
      opacity: isChecked ? 1 : 0,
    };
  };

  return (
    <Frame
      col={orientation === "horizontal"}
      row={orientation === "vertical"}
      alignment={orientation === "vertical" ? "center" : "top-left"}
      gap={gap}
      minW={0}
    >
      {list.map((v, index) => (
        <Frame
          key={index}
          row
          gap={8}
          alignment="left"
          opacity={disabled ? 0.5 : 1}
          cursor={disabled ? "not-allowed" : "pointer"}
          onClick={() => {
            if (!disabled) {
              if (value === v) {
                setValue(undefined);
                onValueChange(undefined);
              } else {
                setValue(v);
                onValueChange(v);
              }
            }
          }}
        >
          <Frame
            col
            w={circleWrapSizeStyleMap[getSize].w}
            h={circleWrapSizeStyleMap[getSize].h}
            alignment="center"
            radius={100}
            {...animations.radioBox}
            {...circleWrapAnimation(v === value)}
          >
            <Frame
              radius={100}
              {...animations.radioBox}
              {...circleAnimation(v === value)}
            />
          </Frame>
          {v.label && <Text {...labelSizeStyleMap[getSize]}>{v.label}</Text>}
        </Frame>
      ))}
    </Frame>
  );
};

export default RadioGroup;
