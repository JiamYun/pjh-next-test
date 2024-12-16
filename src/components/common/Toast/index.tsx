"use client";

import { Body4, Frame } from "@/atoms";
import { useEffect, useState } from "react";
import Icon from "../Icon";

interface ToastProps {
  message: string;
  duration?: number;
  onClose?: () => void;
}

export const Toast = ({ message, duration = 1500, onClose }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <Frame
      col
      w="100%"
      h="100vh"
      position="fixed"
      top={0}
      left={0}
      zIndex={1000}
      alignment="center"
      bg="transparent"
    >
      <Frame
        col
        w={120}
        h={120}
        bg="#424242"
        alignment="center"
        radius={8}
        gap={12}
      >
        <Frame w={46} h={46}>
          <Icon type="line" name="check" size={46} fill="white" />
        </Frame>
        <Body4 fontColor="white">{message}</Body4>
      </Frame>
    </Frame>
  );
};
