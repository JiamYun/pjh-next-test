"use client";

import { Body3, Body4, Frame, Heading3 } from "@/atoms";
import { QRCodeSVG } from "qrcode.react";
import Image from "next/image";

interface QRViewProps {
  user: {
    name: string;
    username: string;
    rank: string;
  };
  qrCode: string;
  qrValue: string;
  onClose: () => void;
}

export const QRView = ({ user, qrCode, qrValue, onClose }: QRViewProps) => {
  return (
    <>
      <Frame
        position="fixed"
        w="100%"
        h="100%"
        top={0}
        left={0}
        bg="rgba(0,0,0,0.5)"
        zIndex={998}
        onClick={onClose}
      />

      <Frame
        position="fixed"
        col
        w="100%"
        h="85%"
        bottom={0}
        left={0}
        zIndex={999}
      >
        {/* qr코드 상단 border적용 위해 div로 변경 */}
        <div className="w-full h-[40%] bg-[#11227B] rounded-tl-2xl rounded-tr-2xl p-10 flex flex-col items-center justify-center gap-4 mb-[-20px]">
          <Frame row gap={8} alignment="center">
            <Image
              src="/images/profile/opal-refined.png"
              width={20}
              height={20}
              alt="verified"
            />
            <Body4 fontColor="white">예비회원</Body4>
          </Frame>
          <Heading3 fontColor="white">{user.username}님</Heading3>
        </div>

        <Frame
          col
          w="100%"
          h="60%"
          bg="white"
          radiusTL={20}
          radiusTR={20}
          p={40}
          gap={16}
          alignment="center"
        >
          <Frame col w="100%" maxW={300} p={20} bg="white" radius={12}>
            {qrCode && <QRCodeSVG value={qrValue} size={260} />}
          </Frame>
        </Frame>
      </Frame>
    </>
  );
};
