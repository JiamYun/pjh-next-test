"use client";

import { forwardRef } from "react";

import { Frame } from "@/atoms";
import { Icon } from "@/components";
import { UsePaddingStyleProps } from "@/styles/usePaddingStyle";
import { IconName, IconType } from "@/types";

interface DividerProps extends UsePaddingStyleProps {
  icon?: {
    type: IconType;
    name: IconName[IconType];
  };
  color?: string;
  thickness?: number;
  size?: number;
  px?: number;
  py?: number;
}

const Divider = forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      icon,
      color = "#E5E7EB",
      thickness = 1,
      size = 16,
      px,
      py,
      ...paddingProps
    },
    ref
  ) => {
    if (icon) {
      return (
        <Frame
          ref={ref}
          w="100%"
          row
          flex="center"
          alignment="center"
          {...paddingProps}
        >
          <Frame flex={1} h={thickness} bg={color} />
          <Frame
            flex="center"
            alignment="center"
            desktop={{ px: 45, py: 100 }}
            tablet={{ px: 45, py: 50 }}
            mobile={{ px: 24, py: 60 }}
          >
            <Icon type={icon.type} name={icon.name} size={size} fill={color} />
          </Frame>
          <Frame flex={1} h={thickness} bg={color} />
        </Frame>
      );
    }

    return (
      <Frame
        ref={ref}
        w="100%"
        h={thickness}
        bg={color}
        {...paddingProps}
        px={px}
        py={py}
      />
    );
  }
);

export default Divider;
