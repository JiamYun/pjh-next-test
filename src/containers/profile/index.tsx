"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Body3, Body4, Frame, Heading6 } from "@/atoms";
import { Banner, ButtonSolid, Icon, ProfileCard } from "@/components";
import { QRContainer } from "@/containers/qr";
import { FrameScreen } from "@/atoms/Frame";
import { useAppDispatch, useAppSelector } from "@/store";
import appSlice, { AuthProvider } from "@/store/slices/appSlice";
import { signOut } from "next-auth/react";
const ProfileContainer = () => {
  const router = useRouter();
  const [showQRModal, setShowQRModal] = useState(false);
  const loginAppData = useAppSelector((state) => state.app.response.login);
  const dispatch = useAppDispatch();
  const appState = useAppSelector((state) => state.app);
  const tokenValue = useAppSelector((state) => state.app.authTokens);

  const menuItems = [
    { title: "내 게시물", path: "/profile/myposts" },
    {
      title: "내 정보 설정 및 관리",
      path: "/profile/settings",
    },
    { title: "QR코드", action: () => setShowQRModal(true) },
    { type: "divider" },
    {
      title: "후원회 멤버십 안내",
      path: "/profile/membership",
    },
    { title: "이용 약관", path: "/policies/terms" },
    { title: "개인정보 처리지침", path: "/policies/privacy" },
  ];

  const [bannerList, setBannerList] = useState<any[]>([]);

  const getBannerList = async () => {
    const page = 1;
    const pageSize = 3;
    const response = await fetch(
      `/api/banner?page=${page}&pageSize=${pageSize}`
    );
    const data = await response.json();
    setBannerList(data);
  };

  useEffect(() => {
    getBannerList();
  }, []);

  const handleProfileClick = () => {
    router.push("/profile");
  };

  const handleMenuItemClick = (item: any) => {
    if (item.action) {
      item.action();
    } else if (item.path) {
      router.push(item.path);
    }
  };

  return (
    <FrameScreen>
      <ProfileCard onClick={handleProfileClick} />
      <Frame
        w={"100%"}
        bg="red"
        onClick={() => {
          router.push("/login");
        }}
      >
        <Body3>로그인</Body3>
      </Frame>
      <Frame
        w={"100%"}
        bg="red"
        onClick={() => {
          console.log("로그아웃");
          signOut({ callbackUrl: "/" });
        }}
      >
        <Body3>로그아웃</Body3>
      </Frame>
      {/* <Frame w={"100%"}>
        {<Body3>{`${JSON.stringify(tokenValue)}`}</Body3>}
      </Frame> */}
      {/* <Frame gap={12} w={"100%"} pb={20}>
        <ButtonSolid
          onClick={() => {
            dispatch(
              appSlice.actions.onLoginRequest({ type: AuthProvider.APPLE })
            );
          }}
          fullWidth
        >
          Apple
        </ButtonSolid>
        <ButtonSolid
          onClick={() => {
            dispatch(
              appSlice.actions.onLoginRequest({ type: AuthProvider.GOOGLE })
            );
          }}
          fullWidth
        >
          Google
        </ButtonSolid>
        <ButtonSolid
          onClick={() => {
            dispatch(
              appSlice.actions.onLoginRequest({ type: AuthProvider.KAKAO })
            );
          }}
          fullWidth
        >
          KaKao
        </ButtonSolid>
        <ButtonSolid
          onClick={() => {
            dispatch(
              appSlice.actions.onLoginRequest({ type: AuthProvider.NAVER })
            );
          }}
          fullWidth
        >
          Naver
        </ButtonSolid>
      </Frame> */}

      <Banner bannerList={bannerList} />
      <Frame w="100%" h={1} bg="#F0F0F0" />

      <Frame col w="100%" px={20}>
        <Heading6 py={12}>계정 설정</Heading6>
        {menuItems.map((item, index) =>
          item.type === "divider" ? (
            <Frame key={`divider-${index}`} w="100%" h={1} bg="#F0F0F0" />
          ) : (
            <Frame
              key={index}
              row
              w="100%"
              py={12}
              onClick={() => handleMenuItemClick(item)}
            >
              <Frame row flex={1} alignment="left">
                <Body4 pl={12}>{item.title}</Body4>
              </Frame>
              <Icon type="menu" name="arrow-right" size={24} />
            </Frame>
          )
        )}
      </Frame>

      <Frame w="100%" h={2} bg="#F0F0F0" />
      <Frame col w="100%" py={20} px={20} alignment="center">
        <Body4 fontColor="#959CAA">문의 전화 02-716-9345 (내선 2009)</Body4>
      </Frame>

      {showQRModal && <QRContainer onClose={() => setShowQRModal(false)} />}
    </FrameScreen>
  );
};

export default ProfileContainer;
