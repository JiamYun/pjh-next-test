"use client";

import { tv, type VariantProps } from "tailwind-variants";

import { Frame } from "@/atoms";
import { useResponsiveType } from "@/hooks";

export const input = tv({
  base: "p-[5px] max-w-[320px] w-full placeholder:text-neutral-400 caret-main-500 flex",
  variants: {
    size: {
      lg: "h-12",
      md: "h-10 text-sm",
      sm: "h-9 text-sm",
    },
    styles: {
      outline:
        "border border-neutral-300 rounded-md focus-within:border-main-500",
      solid:
        "border border-neutral-100 rounded-md focus-within:border-main-500 bg-neutral-100",
      bottomLine: "border-b border-neutral-700 focus-within:bg-neutral-50",
    },
    isError: {
      true: "border-red-500",
    },
    disabled: {
      true: "opacity-50",
    },
  },
  defaultVariants: {
    size: "md",
    styles: "outline",
  },
  compoundVariants: [
    {
      isError: true,
      styles: "solid",
      className: "bg-red-100",
    },
    { disabled: true, styles: "solid", className: "bg-neutral-100" },
  ],
});

export const captionStyle = tv({
  base: "text-xs gap-1 text-wrap max-w-[320px]",
  variants: {
    isError: {
      true: "text-red-500",
      false: "text-neutral-500",
    },
  },
});

type InputVariants = VariantProps<typeof input>;

interface ResponsiveConfig {
  desktop?: InputVariants;
  tablet?: InputVariants;
  mobile?: InputVariants;
}

interface InputProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "size" | "prefix" | "className"
    >,
    InputVariants {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  label?: string;
  caption?: React.ReactNode;
  errorMessage?: string;
  responsive?: ResponsiveConfig;
}

// Base Input component
const Input = ({
  prefix,
  suffix,
  label,
  id,
  caption,
  errorMessage,
  isError,
  maxLength,
  responsive,
  size,
  styles,
  ...rest
}: InputProps) => {
  const { responsiveType } = useResponsiveType();

  // Choose styles based on device and responsive config
  const variantProps: InputVariants = responsive
    ? responsive[responsiveType] || {}
    : { size, styles };

  return (
    <Frame col maxW={320} w={"100%"} gap={6}>
      {label && (
        <label
          className="text-sm text-neutral-700 font-medium max-w-[320px] text-wrap"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <div
        className={input({ ...variantProps, isError, disabled: rest.disabled })}
      >
        {prefix ? <span>{prefix}</span> : <span className="w-2 h-full" />}
        <input
          className="h-full border-none outline-none w-full bg-transparent focus-visible:placeholder:text-neutral-300"
          id={id}
          maxLength={maxLength}
          {...rest}
        />
        {suffix ? <span>{suffix}</span> : <span className="w-2 h-full" />}
      </div>
      <div className={captionStyle({ isError })}>
        {isError ? errorMessage : caption}
      </div>
    </Frame>
  );
};

export default Input;
