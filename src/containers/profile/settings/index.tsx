"use client";

import { Body3, Body4, Frame } from "@/atoms";
import { FrameScreen } from "@/atoms/Frame";
import { Icon } from "@/components";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const ProfileSettingsContainer = () => {
  const router = useRouter();

  const menuItems = [
    {
      title: "계정 설정",
      items: [
        {
          label: "회원정보 변경",
          onClick: () => router.push("/profile/settings/info"),
        },
        {
          label: "전화번호 변경",
          onClick: () => router.push("/signup/phone"),
        },
        {
          label: "로그아웃",
          onClick: () => {
            signOut({ callbackUrl: "/" });
          },
        },
        {
          label: "계정삭제",
          onClick: () => {
            console.log("계정삭제");
          },
        },
      ],
    },
  ];

  return (
    <FrameScreen>
      <Frame col w="100%" gap={32}>
        {menuItems.map((section, idx) => (
          <Frame key={idx} col w="100%">
            <Frame col w="100%" px={20} py={12}>
              <Body3>{section.title}</Body3>
            </Frame>
            {section.items.map((item, itemIdx) => (
              <Frame
                key={itemIdx}
                row
                w="100%"
                px={20}
                py={8}
                onClick={item.onClick}
              >
                <Frame row flex={1} alignment="left">
                  <Body4>{item.label}</Body4>
                </Frame>
                <Icon type="menu" name="arrow-right" size={24} />
              </Frame>
            ))}
          </Frame>
        ))}
      </Frame>
    </FrameScreen>
  );
};

export default ProfileSettingsContainer;
