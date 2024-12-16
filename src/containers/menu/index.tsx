"use client";

import { useRouter } from "next/navigation";
import { Frame } from "@/atoms";
import Menu from "@/components/menu";
import { ProfileCard, SocialLinks } from "@/components";
import { FrameScreen } from "@/atoms/Frame";

const MenuContainer = () => {
  const router = useRouter();

  const handleItemClick = (item: any) => {
    if (item.url?.startsWith("http")) {
      window.open(item.url, "_blank", "noopener,noreferrer");
    } else {
      if (item.onClick) {
        item.onClick();
        return;
      }
    }
  };

  const handleSocialClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const menuSections = [
    {
      title: "박정희대통령기념관",
      items: [
        {
          id: "museum",
          label: "박정희대통령기념관",
          icon: "museum",
          onClick: () => router.push("/menu/museum"),
        },
        {
          id: "library",
          label: "박정희도서관(북카페)",
          icon: "library",
          onClick: () => router.push("/menu/library"),
        },
        {
          id: "storyum",
          label: "어깨동무스토리움",
          icon: "shoulder-friends",
          onClick: () => router.push("/menu/storyum"),
        },
        {
          id: "facility",
          label: "시설 대관 안내",
          icon: "facility",
          onClick: () => router.push("/menu/facility"),
        },
        {
          id: "vr",
          label: "VR 전시관",
          icon: "vr",
          url: "https://my.matterport.com/show/?m=iCNNyz3gUku&lang=en",
        },
        {
          id: "directions",
          label: "오시는길",
          icon: "directions",
          onClick: () => router.push("/menu/directions"),
        },
      ],
    },
    {
      title: "박정희 대통령 기념재단",
      items: [
        {
          id: "foundation",
          label: "설립목적 및 연혁",
          icon: "foundation",
          onClick: () => router.push("/menu/foundation"),
        },
        {
          id: "donation",
          label: "후원회 및 후원신청",
          icon: "donation",
          onClick: () => router.push("/donation"),
        },
      ],
    },
    {
      title: "설정",
      items: [
        {
          id: "mypage",
          label: "마이페이지",
          icon: "profile",
          onClick: () => router.push("/profile"),
        },
      ],
    },
  ];

  const socialLinks = [
    {
      id: "instagram",
      icon: "instagram-logo",
      url: "https://www.instagram.com/pch_1917/",
      alt: "Instagram",
    },
    {
      id: "facebook",
      icon: "facebook-logo",
      url: "https://www.facebook.com/presidentparkchunghee",
      alt: "Facebook",
    },
    {
      id: "blog",
      icon: "naverblog-logo",
      url: "https://blog.naver.com/ourpresidentpark",
      alt: "Naver Blog",
    },
  ];

  return (
    <FrameScreen>
      <ProfileCard onClick={() => router.push("/profile")} />
      <Menu sections={menuSections} onItemClick={handleItemClick} />
      <SocialLinks links={socialLinks} onLinkClick={handleSocialClick} />
    </FrameScreen>
  );
};

export default MenuContainer;
