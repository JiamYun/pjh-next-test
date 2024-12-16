"use client";
import React from "react";

import { ResponsiveType, useResponsiveType } from "@/hooks";
import { typography, useFontStyle, UseFontStyleProps } from "@/styles";
import usePaddingStyle, {
  UsePaddingStyleProps,
} from "@/styles/usePaddingStyle";

const HEADING_TAG_MAP: Record<string, keyof JSX.IntrinsicElements> = {
  Heading1: "h1",
  Heading2: "h2",
  Heading3: "h3",
  Heading4: "h4",
  Heading5: "h5",
  Heading6: "h6",
};

type NumberOfLineType = "1" | "2" | "3" | "4" | "5" | "6";

const numberOfLineMap: Record<NumberOfLineType, string> = {
  1: "number-of-line-1",
  2: "number-of-line-2",
  3: "number-of-line-3",
  4: "number-of-line-4",
  5: "number-of-line-5",
  6: "number-of-line-6",
};

type TextProps = {
  type?: keyof typeof typography;
};

type ResponsiveTextProps = UsePaddingStyleProps &
  Partial<Record<ResponsiveType, TextProps>> &
  TextProps &
  UsePaddingStyleProps &
  UseFontStyleProps & {
    children: React.ReactNode;
    numberOfLine?: NumberOfLineType;
  };

type TextVariantsProps = UsePaddingStyleProps &
  Pick<UseFontStyleProps, "fontColor" | "fontSize"> & {
    children: React.ReactNode;
    numberOfLine?: NumberOfLineType;
  };

const Text = React.forwardRef<HTMLElement, ResponsiveTextProps>(
  ({ children, numberOfLine, ...props }, ref) => {
    const { responsiveType } = useResponsiveType();
    const getTextType = (key: keyof TextProps) => {
      const value = props[responsiveType]?.[key];
      return value !== undefined ? value : props[key];
    };

    const { getPaddingStyle } = usePaddingStyle(props);
    const { getFontStyle } = useFontStyle({
      ...typography[getTextType("type")!],
      ...props,
    } as UseFontStyleProps);

    const numberOfLineStyle = numberOfLine ? numberOfLineMap[numberOfLine] : "";
    const typeStr = getTextType("type")?.toString() || "";

    let Tag: keyof JSX.IntrinsicElements = "p";
    if (typeStr.startsWith("Link")) {
      Tag = "a";
    } else if (typeStr.startsWith("Heading")) {
      Tag = HEADING_TAG_MAP[typeStr] || "p";
    }

    return React.createElement(
      Tag,
      {
        ref,
        className: `${numberOfLineStyle}`,
        style: {
          overflow: "hidden",
          wordWrap: "break-word",
          whiteSpace: "pre-line",
          ...getPaddingStyle,
          ...getFontStyle,
        },
      },
      children
    );
  }
);

export const Heading1 = React.forwardRef<HTMLElement, TextVariantsProps>(
  ({ children, ...props }, ref) => (
    // @ts-ignore
    <Text ref={ref} type={"Heading1"} {...props}>
      {children}
    </Text>
  )
);
export const Heading2 = React.forwardRef<HTMLElement, TextVariantsProps>(
  ({ children, ...props }, ref) => (
    // @ts-ignore
    <Text ref={ref} type={"Heading2"} {...props}>
      {children}
    </Text>
  )
);
export const Heading3 = React.forwardRef<HTMLElement, TextVariantsProps>(
  ({ children, ...props }, ref) => (
    // @ts-ignore
    <Text ref={ref} type={"Heading3"} {...props}>
      {children}
    </Text>
  )
);
export const Heading4 = React.forwardRef<HTMLElement, TextVariantsProps>(
  ({ children, ...props }, ref) => (
    // @ts-ignore
    <Text ref={ref} type={"Heading4"} {...props}>
      {children}
    </Text>
  )
);

Heading4.displayName = "Hingoray.Heading4";
export const Heading5 = React.forwardRef<HTMLElement, TextVariantsProps>(
  ({ children, ...props }, ref) => (
    // @ts-ignore
    <Text ref={ref} type={"Heading5"} {...props}>
      {children}
    </Text>
  )
);
export const Heading6 = React.forwardRef<HTMLElement, TextVariantsProps>(
  ({ children, ...props }, ref) => (
    // @ts-ignore
    <Text ref={ref} type={"Heading6"} {...props}>
      {children}
    </Text>
  )
);
export const Body1 = React.forwardRef<HTMLElement, TextVariantsProps>(
  ({ children, ...props }, ref) => (
    // @ts-ignore
    <Text ref={ref} type={"Body1"} {...props}>
      {children}
    </Text>
  )
);
export const Body2 = React.forwardRef<HTMLElement, TextVariantsProps>(
  ({ children, ...props }, ref) => (
    // @ts-ignore
    <Text ref={ref} type={"Body2"} {...props}>
      {children}
    </Text>
  )
);
export const Body3 = React.forwardRef<HTMLElement, TextVariantsProps>(
  ({ children, ...props }, ref) => (
    // @ts-ignore
    <Text ref={ref} type={"Body3"} {...props}>
      {children}
    </Text>
  )
);
export const Body4 = React.forwardRef<HTMLElement, TextVariantsProps>(
  ({ children, ...props }, ref) => (
    // @ts-ignore
    <Text ref={ref} type={"Body4"} {...props}>
      {children}
    </Text>
  )
);
export const Body5 = React.forwardRef<HTMLElement, TextVariantsProps>(
  ({ children, ...props }, ref) => (
    // @ts-ignore
    <Text ref={ref} type={"Body5"} {...props}>
      {children}
    </Text>
  )
);
export const Body6 = React.forwardRef<HTMLElement, TextVariantsProps>(
  ({ children, ...props }, ref) => (
    // @ts-ignore
    <Text ref={ref} type={"Body6"} {...props}>
      {children}
    </Text>
  )
);
export const Link1 = React.forwardRef<HTMLElement, TextVariantsProps>(
  ({ children, ...props }, ref) => (
    // @ts-ignore
    <Text ref={ref} type={"Link1"} {...props}>
      {children}
    </Text>
  )
);
export const Link2 = React.forwardRef<HTMLElement, TextVariantsProps>(
  ({ children, ...props }, ref) => (
    // @ts-ignore
    <Text ref={ref} type={"Link2"} {...props}>
      {children}
    </Text>
  )
);
export const Link3 = React.forwardRef<HTMLElement, TextVariantsProps>(
  ({ children, ...props }, ref) => (
    // @ts-ignore
    <Text ref={ref} type={"Link3"} {...props}>
      {children}
    </Text>
  )
);
Heading1.displayName = "Hingoray.Heading1";
Heading2.displayName = "Hingoray.Heading2";
Heading3.displayName = "Hingoray.Heading3";
Heading4.displayName = "Hingoray.Heading4";
Heading5.displayName = "Hingoray.Heading5";
Heading6.displayName = "Hingoray.Heading6";
Body1.displayName = "Hingoray.Body1";
Body2.displayName = "Hingoray.Body2";
Body3.displayName = "Hingoray.Body3";
Body4.displayName = "Hingoray.Body4";
Body5.displayName = "Hingoray.Body5";
Body6.displayName = "Hingoray.Body6";
Link1.displayName = "Hingoray.Link1";
Link2.displayName = "Hingoray.Link2";
Link3.displayName = "Hingoray.Link3";

Text.displayName = "Hingoray.Text";
export default Text;
