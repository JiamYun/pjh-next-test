"use client";

import { Body4, Body2, Heading3, Frame } from "@/atoms";
import { Divider, Icon } from "@/components";
import Image from "@/atoms/Image";
import { IconText } from "@/components/IconText";

const DottedLine = () => {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        top: "14px",
        height: "calc(100% + 20px)",
        borderLeft: "1px dashed #E5E5E5",
        zIndex: 0,
      }}
    />
  );
};

const FoundationContainer = () => {
  const iconTextItemsData = [
    "박정희대통령기념관은 박정희대통령기념·도서관 어깨동무스토리움 등 그 부속시설을 운영함으로써 박정희 대통령의 생애와 업적을 기념하고 박정희 대통령의 국가경영철학을 국내외에 널리 알리기 위한 각종 사업의 수행을 목적으로 합니다.",
    "박정희대통령기념·도서관, 어깨동무스토리움 등 그 부속시설물의 보존, 운영 및 관리",
    "박정희 대통령 생가 보존 및 이와 연계한 기념사업",
    "박정희 대통령의 생애, 업적 및 국가경영철학과 관련한 기록물 등 자료 및 유품 전시 수집·보존·전시",
    "박정희 대통령의 생애, 업적 및 국가경영철학의 선양 및 홍보를 목적으로 한 학술세미나개최, 출판물의 제작, 판매 및 배포",
    "차세대를 위한 박정희 정신 교육",
    "법인의 목적 달성에 필요한 기타 사업",
  ];

  const historyItemData = [
    {
      date: "1999.07.26",
      content:
        "(사) 박정희대통령기념사업회 발기 및 창립총회 초대회장 신현확 취임",
    },
    {
      date: "2012.02.21",
      content: "박정희대통령기념관 & 도서관 개관",
    },
    {
      date: "2013.05.09",
      content:
        "(사) 박정희대통령기념사업회 해산총회 및 (재) 박정희대통령기념재단 창립총회, 초대 이사장 김기춘 취임",
    },
    {
      date: "2016.11.02",
      content: "박정희탄생 100주년 기념사업추진위원회 출범",
    },
    {
      date: "2019.03.01",
      content: "박정희대통령기념관 & 도서관 리모델링 재개관",
    },
    {
      date: "2022.04.01",
      content: "유영구 이사장 취임",
    },
  ];

  return (
    <Frame col w="100%">
      {/* 상단 이미지 섹션 */}
      <div style={{ position: "relative" }}>
        <Image
          src="/images/menu/foundation/exterior2.png"
          radius="none"
          alt="기념관 외부"
          style={{
            width: "450px",
            objectFit: "cover",
            border: "none",
            borderBottom: "none",
            outline: "none",
            backgroundColor: "transparent",
          }}
        />
        {/* 그라데이션 오버레이 */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "150px",
            border: "none",
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))",
            display: "flex",
            alignItems: "flex-end",
            padding: "20px",
            zIndex: 10,
          }}
        >
          <Heading3>설립목적</Heading3>
        </div>
      </div>

      <Frame col w="100%" px={20} py={30}>
        <Body4 pb={20}>{iconTextItemsData[0]}</Body4>
        {iconTextItemsData.slice(1).map((item, index) => (
          <Frame key={index} row w="100%" alignment="left">
            <IconText
              key={index}
              pt={2}
              type="main"
              name="check"
              content={item}
            />
          </Frame>
        ))}
      </Frame>

      <Divider thickness={8} color="#F0F0F0" />

      {/* 연혁 섹션 */}
      <Frame col w="100%" px={20} py={30}>
        <Heading3 pb={24}>연혁</Heading3>
        {historyItemData.map((item, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              paddingLeft: "40px",
              marginBottom: index !== historyItemData.length - 1 ? "20px" : "0",
              minHeight: "80px",
            }}
          >
            {/* 타임라인 점과 선 컨테이너 */}
            <div
              style={{
                position: "absolute",
                left: "0",
                top: "0",
                bottom: "0",
                width: "20px",
              }}
            >
              {/* 점 */}
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "3px",
                  backgroundColor: "#666666",
                  position: "absolute",
                  top: "8px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 1,
                }}
              />
              {/* 점선 */}
              {index !== historyItemData.length - 1 && <DottedLine />}
            </div>

            {/* 내용 */}
            <Body2 pb={8}>{item.date}</Body2>
            <Body4>{item.content}</Body4>
          </div>
        ))}
      </Frame>
    </Frame>
  );
};

export default FoundationContainer;
