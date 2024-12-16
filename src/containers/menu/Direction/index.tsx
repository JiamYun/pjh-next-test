"use client";

import { useState } from "react";
import { Frame, Body4, Link2, Body2, Body3 } from "@/atoms";
import { Button, Divider, Icon, SubwayDirections } from "@/components";
import Image from "next/image";
import { isMobile } from "@/utils/userAgent";
import { Toast } from "@/components/common/Toast";
import BottomModal from "@/components/common/BottomModal";

const DirectionContainer = () => {
  const [showMapModal, setShowMapModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const openKakaoMap = () => {
    const placeUrl =
      "https://map.kakao.com/link/map/박정희대통령기념관,37.5665,126.9780";

    if (isMobile()) {
      // 모바일에서는 카카오맵 앱이나 스토어로 이동
      const appScheme = "kakaomap://place?id=17984700";
      const storeUrl = /android/i.test(navigator.userAgent)
        ? "https://play.google.com/store/apps/details?id=net.daum.android.map"
        : "https://apps.apple.com/app/id304608425";

      // 앱 실행 시도
      const tryOpenApp = document.createElement("a");
      tryOpenApp.href = appScheme;
      tryOpenApp.click();

      // 앱이 없으면 스토어로 이동
      setTimeout(() => {
        window.location.href = storeUrl;
      }, 500);
    } else {
      // PC에서는 카카오맵 웹으로 이동
      window.open(placeUrl);
    }
  };

  const openNaverMap = () => {
    const locationName = encodeURIComponent("박정희대통령기념관");
    const webUrl = `https://map.naver.com/v5/search/${locationName}`;

    if (isMobile()) {
      // 모바일에서는 네이버맵 앱이나 스토어로 이동
      const appScheme = `nmap://search?query=${locationName}`;
      const storeUrl = /android/i.test(navigator.userAgent)
        ? "https://play.google.com/store/apps/details?id=com.nhn.android.nmap"
        : "https://apps.apple.com/app/id311867728";

      // 앱 실행 시도
      const tryOpenApp = document.createElement("a");
      tryOpenApp.href = appScheme;
      tryOpenApp.click();

      // 앱이 없으면 스토어로 이동
      setTimeout(() => {
        window.location.href = storeUrl;
      }, 500);
    } else {
      // PC에서는 네이버맵 웹으로 이동
      window.open(webUrl);
    }
  };

  return (
    <>
      <Frame col w="100%">
        <Frame col w="100%">
          <Image
            src="/images/menu/directions/place.png"
            width={800}
            height={400}
            alt="기념관 위치"
            onClick={() => setShowMapModal(true)}
          />

          <Frame
            col
            w="100%"
            gap={16}
            px={20}
            py={8}
            onClick={() => {
              navigator.clipboard.writeText(
                "서울특별시 마포구 월드컵로 386 (상암동)"
              );
              setShowToast(true);
            }}
          >
            <Body4>기념관 위치</Body4>
            <Frame row w="100%" gap="auto" flex={1} alignment="left">
              <Frame w="100%" row flex={1}>
                <Link2>서울특별시 마포구 월드컵로 386 (상암동)</Link2>
              </Frame>
              <Icon type="misc" name="copy" size={20} />
            </Frame>
          </Frame>

          <Frame col w="100%" px={20} pt={12}>
            <Button
              w="100%"
              py={12}
              px={20}
              radius={4}
              stroke={{ size: 1, color: "#11227B", perSide: ["all"] }}
              onClick={() => setShowMapModal(true)}
            >
              <Body3 fontColor="#11227B">기념관 길찾기</Body3>
            </Button>
          </Frame>

          <Frame col w="100%" py={12}>
            <Divider />
            <Body2 px={20} pt={12}>
              오시는 방법
            </Body2>
          </Frame>
          {/* 지하철/버스 안내 섹션 */}
          <SubwayDirections
            border={false}
            title="지하철 이용시"
            directions={[
              {
                lines: ["6"],
                exit: "월드컵경기장역 2번 출구",
                description: "마포08번 버스",
                actions: [
                  {
                    type: "하차",
                    content: "난지천공원, 박정희대통령 기념관",
                  },
                ],
              },
              {
                lines: ["6"],
                exit: "마포구청역 1번 출구",
                description: "271번 버스",
                actions: [
                  { type: "승차", content: "마포구청, 성산자동차검사소" },
                  {
                    type: "하차",
                    content: "월드컵파크3단지 정문 / 도보 350m",
                  },
                ],
              },
              {
                lines: ["6", "경"],
                description: `DMC(디지털미디어시티)역 2번출구\n\n271번 버스`,
                actions: [
                  { type: "승차", content: "마포구청, 성산자동차검사소" },
                  {
                    type: "하차",
                    content: "월드컵파크3단지 정문 / 도보 350m",
                  },
                ],
              },
              {
                lines: ["공"],
                exit: "DMC(디지털미디어시티)역 7번출구",
                description: "마포18번 버스",
                actions: [
                  {
                    type: "하차",
                    content: "월드컵파크 4단지후문, JTBC / 도보 200m",
                  },
                ],
              },
            ]}
          />
        </Frame>
      </Frame>
      <BottomModal
        show={showMapModal}
        onClose={() => setShowMapModal(false)}
        title="기념관 길찾기"
        actions={[
          {
            label: "카카오맵",
            onClick: openKakaoMap,
            icon: <Icon type="misc" name="kakao-map" size={36} />,
          },
          {
            label: "네이버 지도",
            onClick: openNaverMap,
            icon: <Icon type="misc" name="naver-map" size={36} />,
          },
        ]}
      />

      {showToast && (
        <Toast message="복사 완료" onClose={() => setShowToast(false)} />
      )}
    </>
  );
};

export default DirectionContainer;
