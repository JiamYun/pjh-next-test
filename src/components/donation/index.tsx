"use client";

import React from "react";
import { Body3, Text } from "@/atoms";
import { Frame, Image } from "@/atoms";
import Button from "@/components/common/Button";

interface DonationProps {
  onClick: () => void;
  content: string;
}

const Donation: React.FC<DonationProps> = ({ onClick, content }) => {
  return (
    <Frame col w="100%">
      <Image
        src="/images/donation/donationPage.png"
        alt="기부 페이지"
        radius="none"
        className="brightness-[0.8] w-full h-full object-cover"
      />

      <Frame
        col
        w="100%"
        position="absolute"
        inset={0}
        flex={1}
        pb={40}
        px={20}
        h="100%"
        alignment="bottom-left"
        zIndex={50}
      >
        <Text pb={20} fontSize="24px" fontColor="white">
          {content}
        </Text>
        <Button onClick={onClick} color="main" w="100%" size="lg" bg="#11227B">
          <Body3 fontColor="white">후원신청하기</Body3>
        </Button>
      </Frame>
    </Frame>
  );
};

export default Donation;
