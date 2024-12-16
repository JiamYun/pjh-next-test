import { Frame } from "@/atoms"
import { ButtonSizeProps, ResponsiveButtonSizeProps } from "../Button/useButton";
import { CSSProperties } from "react";

interface SpinnerProps {
    size?: ButtonSizeProps
    color?: string
}

const Spinner = ({size = "md", color = "#F0F0F0"}: SpinnerProps) => {
    const loadingSizeMap: Record<
  ButtonSizeProps,
  { fontSize: CSSProperties["fontSize"] }
> = {
  sm: { fontSize: "8px" },
  md: { fontSize: "8px" },
  lg: { fontSize: "9px" },
};

    return (
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
            ...loadingSizeMap[size], // '8px' - 20 '9px' - 22
            // @ts-ignore
            border: `3px solid ${color}`,
            // @ts-ignore
            borderTopColor: `${color}50`,
          }}
        ></div>
      </Frame>
    )
}

export default Spinner