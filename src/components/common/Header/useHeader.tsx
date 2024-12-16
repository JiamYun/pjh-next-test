import React from "react";
import { useCustomRouter } from "@/hooks";
import { Image, Text } from "@/atoms";
import { useAppDispatch } from "@/store";
import Icon from "../Icon";
import Button from "../Button";
import pjhLogo from "@/images/header_title.png";

export default function useHeader() {
  const router = useCustomRouter();

  const iconButtonProps = {
    h: "100%",
    isIconOnly: true,
    iconStyle: { size: 28 },
    activeStyle: { opacity: 0.3 },
  };
  const textButtonProps = {
    h: "100%",
    activeStyle: { opacity: 0.3 },
  };

  const logoImage = () => (
    <Image
      radius={"none"}
      src={pjhLogo.src}
      alt="박정희대통령기념재단"
      width={100}
    />
  );

  const bellButton = (onClick = () => router.push("notification", {})) => (
    <Button {...iconButtonProps} onClick={onClick}>
      <Icon type="menu" name="bell" />
    </Button>
  );
  const menuButton = (onClick = () => router.push("menu", {})) => (
    <Button {...iconButtonProps} onClick={onClick}>
      <Icon type="menu" name="menu" size={28} />
    </Button>
  );
  const backButton = (onClick = () => router.pop()) => (
    <Button {...iconButtonProps} onClick={onClick}>
      <Icon type="menu" name="back" size={28} />
    </Button>
  );
  const xButton = (onClick = () => router.pop()) => (
    <Button {...iconButtonProps} onClick={onClick}>
      <Icon type="menu" name="XIcon" />
    </Button>
  );
  const dotButton = (onClick = () => {}) => (
    <Button {...iconButtonProps} onClick={onClick}>
      <Icon type="menu" name="dot" size={28} />
    </Button>
  );

  const uploadButton = (pending = false, onClick = () => {}) => (
    <Button
      loading={pending}
      fontSize={"16px"}
      fontColor="#11227B"
      lineHeight={"28px"}
      fontWeight={"600"}
      {...textButtonProps}
      onClick={onClick}
    >
      {`업로드`}
    </Button>
  );

  const readAllButton = (pending = false, onClick = () => {}) => (
    <Button
      loading={pending}
      fontSize={"16px"}
      fontColor="#11227B"
      lineHeight={"28px"}
      fontWeight={"600"}
      {...textButtonProps}
      onClick={onClick}
    >
      {`모두 읽기`}
    </Button>
  );

  const menuTitle = () => (
    <Text
      fontSize={16}
      fontColor="#3A3D43"
      fontWeight={"600"}
      lineHeight={"28px"}
    >
      {`메뉴`}
    </Text>
  );

  const notificationTitle = () => (
    <Text
      fontSize={16}
      fontColor="#3A3D43"
      fontWeight={"600"}
      lineHeight={"28px"}
    >
      {`알림`}
    </Text>
  );

  const myPageTitle = () => (
    <Text
      fontSize={16}
      fontColor="#3A3D43"
      fontWeight={"600"}
      lineHeight={"28px"}
    >
      {`마이페이지`}
    </Text>
  );

  const donationTitle = () => (
    <Text
      fontSize={16}
      fontColor="#3A3D43"
      fontWeight={"600"}
      lineHeight={"28px"}
    >
      {`후원회 및 후원신청`}
    </Text>
  );

  const userboardTitle = (title = "로그인해주세요") => (
    <Text
      fontSize={16}
      fontColor="#3A3D43"
      fontWeight={"600"}
      lineHeight={"28px"}
    >
      {`${title}`}
    </Text>
  );

  const membershipTitle = () => (
    <Text
      fontSize={16}
      fontColor="#3A3D43"
      fontWeight={"600"}
      lineHeight={"28px"}
    >
      {`후원회 멤버십 안내`}
    </Text>
  );

  const profileSettingsTitle = () => (
    <Text
      fontSize={16}
      fontColor="#3A3D43"
      fontWeight={"600"}
      lineHeight={"28px"}
    >
      {`내 정보 설정 및 관리`}
    </Text>
  );

  const presidentInfoTitle = () => (
    <Text
      fontSize={16}
      fontColor="#3A3D43"
      fontWeight={"600"}
      lineHeight={"28px"}
    >
      {`대통령 소개 및 연보`}
    </Text>
  );

  const myPostsTitle = () => (
    <Text
      fontSize={16}
      fontColor="#3A3D43"
      fontWeight={"600"}
      lineHeight={"28px"}
    >
      {`내 게시글`}
    </Text>
  );

  return {
    image: {
      logoImage,
    },
    icon: {
      bellButton,
      xButton,
      menuButton,
      backButton,
      dotButton,
    },
    text: {
      uploadButton,
      readAllButton,
    },
    title: {
      notificationTitle,
      menuTitle,
      myPageTitle,
      donationTitle,
      userboardTitle,
      membershipTitle,
      profileSettingsTitle,
      presidentInfoTitle,
      myPostsTitle,
    },
  };
}
