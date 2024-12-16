"use client";
import { Frame } from "@/atoms";
import { useResponsiveType } from "@/hooks";
import {
  animations,
  colors,
  UseBorderStyleProps,
  UseFlexStyleProps,
  UsePaddingStyleProps,
  UseRadiusStyleProps,
} from "@/styles";
import React, {
  CSSProperties,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type ModalHeaderProps = UsePaddingStyleProps &
  UseFlexStyleProps & {
    children: React.ReactNode;
    onClose?: () => void;
  };
type ModalBodyProps = UsePaddingStyleProps &
  UseFlexStyleProps & {
    children: React.ReactNode;
  };
type ModalFooterProps = UsePaddingStyleProps &
  UseFlexStyleProps & {
    children: React.ReactNode;
  };

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  children,
  onClose,
  ...props
}) => {
  return (
    <Frame
      row
      alignment={onClose ? "center" : undefined}
      w={"100%"}
      gap={onClose ? "auto" : undefined}
      p={20}
      {...props}
    >
      {children}
      {onClose && <button onClick={onClose}>X</button>}
    </Frame>
  );
};
export const ModalBody: React.FC<ModalBodyProps> = ({ children, ...props }) => {
  return (
    <Frame col w={"100%"} {...props}>
      {children}
    </Frame>
  );
};
export const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  ...props
}) => {
  return (
    <Frame row w={"100%"} p={20} {...props}>
      {children}
    </Frame>
  );
};
const BackDrop: React.FC<{
  isClose?: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  opacity?: CSSProperties["opacity"];
  bg?: string;
}> = ({ opacity = "30%", bg = colors.black, isClose = false, setIsOpen }) => {
  return (
    <div
      onClick={() => {
        if (isClose) setIsOpen(false);
      }}
      style={{ opacity, backgroundColor: bg }}
      className="absolute z-40 w-full h-full"
    ></div>
  );
};
type ModalGroupChildrenType =
  | React.ReactElement<typeof ModalHeader>
  | React.ReactElement<typeof ModalBody>
  | React.ReactElement<typeof ModalFooter>
  | (
      | React.ReactElement<typeof ModalHeader>
      | React.ReactElement<typeof ModalBody>
      | React.ReactElement<typeof ModalFooter>
    )[];
type ModalGroupProps = UsePaddingStyleProps &
  UseBorderStyleProps &
  UseRadiusStyleProps & {
    children: ModalGroupChildrenType;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    isBackdrop?: boolean;
    isBackdropClose?: boolean;
    w?: CSSProperties["width"];
    backdropOpacity?: CSSProperties["opacity"];
    backdropFill?: CSSProperties["backgroundColor"];
    placement?: "bottom" | "center";
    isAnimation?: boolean;
  };

const Modal: React.FC<ModalGroupProps> = ({
  children,
  isOpen,
  setIsOpen,
  backdropOpacity,
  backdropFill,
  stroke,
  radius,
  radiusBL,
  radiusBR,
  radiusTL,
  radiusTR,
  w,
  isBackdrop = false,
  isBackdropClose = false,
  placement = "bottom",
  isAnimation = true,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { responsiveType } = useResponsiveType();
  const [modalHeight, setModalHeight] = useState<CSSProperties["height"]>(0);

  useEffect(() => {
    const onCloseHandler = async () => {
      if (isAnimation) {
        await new Promise((resolve) =>
          setTimeout(
            resolve,
            +animations.modal.transitionDuration.toString().replace("ms", "")
          )
        );
        setModalHeight(0);
      } else {
        setModalHeight(0);
      }
    };
    if (isOpen) {
      setModalHeight("100%");
    } else {
      onCloseHandler();
    }
  }, [isOpen]);

  const header = useMemo(
    () =>
      React.Children.toArray(children).filter(
        (child) => React.isValidElement(child) && child.type === ModalHeader
      ),
    [children]
  );
  const body = useMemo(
    () =>
      React.Children.toArray(children).filter(
        (child) => React.isValidElement(child) && child.type === ModalBody
      ),
    [children]
  );
  const footer = useMemo(
    () =>
      React.Children.toArray(children).filter(
        (child) => React.isValidElement(child) && child.type === ModalFooter
      ),
    [children]
  );

  if (header.length > 1) {
    throw new Error("Only one Modal.Header can be used in ModalGroup.");
  }
  if (body.length > 1) {
    throw new Error("Only one Modal.Body can be used in ModalGroup.");
  }
  if (footer.length > 1) {
    throw new Error("Only one ModalFooter can be used in ModalGroup.");
  }

  const contentsAnimation = useMemo(() => {
    if (isAnimation) {
      if (isOpen) {
        return { transform: "translateY(0vh)", opacity: 1 };
      } else {
        return { transform: "translateY(10vh)", opacity: 0 };
      }
    }
  }, [isOpen]);

  const calStroke = useMemo(() => {
    if (stroke) {
      if (responsiveType === "tablet" || responsiveType === "desktop") {
        return stroke;
      } else if (placement === "bottom") {
        return {
          color: stroke.color,
          size: stroke.size,
          perSide: ["top"],
        };
      }
    }
    return stroke;
  }, [stroke, responsiveType, placement]);

  const calRadius = useMemo(() => {
    if (responsiveType === "tablet" || responsiveType === "desktop") {
      return {
        radius,
        radiusTL,
        radiusTR,
        radiusBL,
        radiusBR,
      };
    } else if (placement === "bottom") {
      return {
        radiusTL: radiusTL ?? radius,
        radiusTR: radiusTR ?? radius,
      };
    }

    return {
      radius,
      radiusBL,
      radiusBR,
      radiusTL,
      radiusTR,
    };
  }, [
    placement,
    responsiveType,
    radius,
    radiusBL,
    radiusBR,
    radiusTL,
    radiusTR,
  ]);

  const calWidth = useMemo(() => {
    if (responsiveType !== "mobile") {
      if (w) {
        return w;
      } else {
        return "fit-content";
      }
    } else if (placement === "bottom") {
      return "100%";
    } else {
      return "90%";
    }
  }, [w, placement, responsiveType]);

  const calAlightment = useMemo(() => {
    if (responsiveType !== "mobile") {
      return "center";
    } else if (placement === "bottom") {
      return "bottom-center";
    } else {
      return "center";
    }
  }, [responsiveType, placement]);

  return (
    <Frame
      col
      h={modalHeight}
      w={"100%"}
      overflow="hidden"
      position="fixed"
      inset={0}
      zIndex={99}
    >
      <Frame
        col
        w={"100%"}
        h={"100%"}
        position="absolute"
        inset={0}
        zIndex={99}
        alignment={calAlightment}
        bg={colors.transparent}
      >
        {isBackdrop && (
          <BackDrop
            setIsOpen={setIsOpen}
            isClose={isBackdropClose}
            opacity={backdropOpacity}
            bg={backdropFill}
          />
        )}
        <Frame
          zIndex={100}
          col
          ref={ref}
          bg={colors.white}
          w={calWidth}
          maxH={"70%"}
          overflow="y-scroll"
          stroke={calStroke as UseBorderStyleProps["stroke"]}
          radius={calRadius.radius}
          radiusTL={calRadius.radiusTL}
          radiusTR={calRadius.radiusTR}
          radiusBL={calRadius.radiusBL}
          radiusBR={calRadius.radiusBR}
          {...animations.modal}
          {...contentsAnimation}
          {...props}
        >
          {header}
          {body}
          {footer}
        </Frame>
      </Frame>
    </Frame>
  );
};

export default Modal;
