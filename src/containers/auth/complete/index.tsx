"use client";

import { useRouter } from "next/navigation";
import { Body2, Frame } from "@/atoms";
import { ButtonSolid } from "@/components";
import Image from "next/image";

export const CompleteContainer = () => {
  const router = useRouter();

  return (
    <Frame col w="100%" h="100vh" bg="white" alignment="center">
      <Frame col alignment="center" gap={8}>
        <Body2 fontSize={24}>환영합니다</Body2>
        <Image
          src="/images/logo.png"
          alt="logo"
          width={120}
          height={120}
          priority
        />
        <Body2 fontSize={16}>예비회원 입니다.</Body2>
        <Body2 fontSize={16}>감사합니다</Body2>
      </Frame>

      <Frame w="100%" px={20}>
        <ButtonSolid
          children="완료"
          onClick={() => router.push("/")}
          fullWidth
        />
      </Frame>
    </Frame>
  );
};
