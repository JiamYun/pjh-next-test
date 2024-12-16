"use client";

import React from "react";
import { Body3, Body4, Frame } from "@/atoms";
import Image from "next/image";

interface MembershipCardProps {
  imageSrc: string;
  title: string;
  description: string;
}

const MembershipCard = ({
  imageSrc,
  title,
  description,
}: MembershipCardProps) => {
  return (
    <Frame
      w="100%"
      row
      bg="white"
      p={20}
      gap={12}
      stroke={{
        size: 1,
        color: "#F0F0F0",
        perSide: ["bottom"],
      }}
    >
      <Frame col w="25%" alignment="center" gap={4}>
        <Image src={imageSrc} width={32} height={32} alt={title} />
        <Body4>{title}</Body4>
      </Frame>
      <Frame w={1} h="100%" bg="#F0F0F0" />
      <Frame col flex={1} gap={4}>
        <Body4>등급 기준</Body4>
        <Body4>{description}</Body4>
      </Frame>
    </Frame>
  );
};

const MembershipContainer = () => {
  const membershipLevels = [
    {
      imageSrc: "/images/profile/sapphire-refined.png",
      title: "예비회원",
      description: "회원가입 완료 시 부여",
    },
    {
      imageSrc: "/images/profile/emerald-2-refined.png",
      title: "준회원",
      description:
        "후원금 정기/일시금 2000원 이하 소액 납부 (일시금 10만원 미만)",
    },
    {
      imageSrc: "/images/profile/topaz-refined.png",
      title: "자조회원",
      description:
        "후원금 정기 3000원 이상 10만원 미만 납부 (일시금 10만원 이상~200만원 미만 납부)",
    },
    {
      imageSrc: "/images/profile/opal-refined.png",
      title: "중흥회원",
      description:
        "후원금 정기 10만원 이상 100만원 미만 납부 (일시금 200만원 이상~500만원 미만 납부)",
    },
    {
      imageSrc: "/images/profile/diamond-2-refined.png",
      title: "부국회원",
      description: "후원금 정기 100만원 초과 납부 (일시금 500만원 이상 납부)",
    },
  ];

  return (
    <Frame col w="100%" h="100vh" bg="#F0F0F0">
      <Frame col w="100%" px={20} py={15} gap={12}>
        {membershipLevels.map((level, index) => (
          <MembershipCard
            key={index}
            imageSrc={level.imageSrc}
            title={level.title}
            description={level.description}
          />
        ))}
      </Frame>
    </Frame>
  );
};

export default MembershipContainer;
