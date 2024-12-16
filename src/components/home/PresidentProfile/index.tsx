"use client";

import React from "react";

import { Frame, Image } from "@/atoms";

interface PresidentProfileProps {
  onClick?: () => void;
}

const PresidentProfile: React.FC<PresidentProfileProps> = ({ onClick }) => {
  return (
    <Frame w="100%" bg="#11227B" onClick={onClick}>
      <Image
        src="/images/president-profile.png"
        alt="박정희 대통령"
        radius="none"
      />
    </Frame>
  );
};

export default PresidentProfile;
