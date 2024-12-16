"use client";

import { Frame, Body3, Body4 } from "@/atoms";
import { Button, Divider } from "@/components";

interface ModalAction {
  label: string;
  onClick: () => void;
  color?: string;
  icon?: React.ReactNode;
}

interface BottomModalProps {
  show: boolean;
  onClose: () => void;
  title?: string;
  actions: ModalAction[];
}

const BottomModal = ({ show, onClose, title, actions }: BottomModalProps) => {
  if (!show) return null;

  return (
    <>
      <Frame
        position="fixed"
        w="100%"
        h="100%"
        top={0}
        left={0}
        bg="rgba(0, 0, 0, 0.5)"
        zIndex={998}
        onClick={onClose}
      />
      <Frame
        position="fixed"
        col
        w="100%"
        bottom={0}
        left={0}
        bg="white"
        radiusTL={12}
        radiusTR={12}
        stroke={{ size: 1, color: "#EAECF0", perSide: ["top"] }}
        zIndex={999}
      >
        <Frame col w="100%">
          {title && (
            <>
              <Body4 px={20} py={18}>
                {title}
              </Body4>
              <Frame w="100%" col>
                <Divider />
              </Frame>
            </>
          )}
          <Frame col w="100%" gap={8} p={20}>
            {actions.map((action, index) => (
              <Button
                key={index}
                w="100%"
                alignment={action.icon ? "left" : "center"}
                onClick={action.onClick}
              >
                {action.icon}
                <Body3 fontColor={action.color || "#000000"}>
                  {action.label}
                </Body3>
              </Button>
            ))}
            <Button
              w="100%"
              py={12}
              radius={4}
              stroke={{ size: 1, color: "#11227B", perSide: ["all"] }}
              onClick={onClose}
            >
              <Body3 fontColor="#11227B">닫기</Body3>
            </Button>
          </Frame>
        </Frame>
      </Frame>
    </>
  );
};

export default BottomModal;
