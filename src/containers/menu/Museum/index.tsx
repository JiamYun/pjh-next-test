"use client";

import React from "react";
import { Frame, Image, Body4, Heading4 } from "@/atoms";
import { Tabs, Tab, Icon } from "@/components";
import { IconText } from "@/components/IconText";

const MuseumContainer = () => {
  const openingHours = [
    {
      type: "main",
      name: "clock" as const,
      content: "10:00 ~ 18:00",
    },
    {
      type: "main",
      name: "time" as const,
      content: "입장마감 17:30",
    },
  ];

  const holiday = [
    {
      type: "main",
      name: "calendar" as const,
      content:
        "매주 월요일\n*월요일이 공휴일과 겹치는 경우 기념관 정상 운영, 그 다음날 휴관\n(단, 월요일이 대체 공휴일인 경우 휴관)",
    },
    {
      type: "main",
      name: "calendar" as const,
      content: "설날, 추석 당일",
    },
  ];

  const inquiry = [
    {
      type: "main",
      name: "phone" as const,
      content: "전화 02-716-9345",
    },
    {
      type: "main",
      name: "fax" as const,
      content: "팩스 02-716-9357",
    },
  ];

  const other = [
    {
      type: "main",
      name: "stroller" as const,
      content: "유아차, 휠체어 대여 가능",
    },
    {
      type: "main",
      name: "parking" as const,
      content:
        "주차장 약 37대 이용 가능\n(첫 30분 무료; 이후 10분당 500원)\n일일주차 20,000원",
    },
  ];

  return (
    <Frame col w="100%">
      <Frame w="100%" h={425}>
        <Image
          src="/images/menu/museum/main_exterior.jpg"
          alt="박정희대통령기념관"
          className="w-full h-full object-cover"
          radius="none"
        />
      </Frame>

      {/* 관람 정보 섹션 */}
      <Frame col w="100%" p={20}>
        <Heading4 pb={20}>관람정보</Heading4>

        <Tabs>
          <Tab key="opening-hours" title="관람시간">
            <Frame col w="100%">
              {openingHours.map((item, index) => (
                <Frame key={index} row w="100%" alignment="left">
                  <IconText
                    key={index}
                    type={item.type}
                    name={item.name}
                    content={item.content}
                  />
                </Frame>
              ))}
            </Frame>
          </Tab>
          <Tab key="holiday" title="휴관일안내">
            <Frame col w="100%">
              {holiday.map((item, index) => (
                <IconText
                  key={index}
                  type={item.type}
                  name={item.name}
                  content={item.content}
                />
              ))}
            </Frame>
          </Tab>
          <Tab key="inquiry" title="문의전화">
            <Frame col w="100%">
              {inquiry.map((item, index) => (
                <Frame key={index} row w="100%" alignment="top">
                  <IconText
                    key={index}
                    type={item.type}
                    name={item.name}
                    content={item.content}
                  />
                </Frame>
              ))}
            </Frame>
          </Tab>
          <Tab key="other" title="기타사항">
            <Frame col w="100%">
              {other.map((item, index) => (
                <Frame key={index} row w="100%" alignment="top">
                  <IconText
                    key={index}
                    type={item.type}
                    name={item.name}
                    content={item.content}
                  />
                </Frame>
              ))}
            </Frame>
          </Tab>
        </Tabs>
      </Frame>

      {/* 전시실 섹션 */}
      <Frame col w="100%" p={20}>
        <Heading4 pb={20}>전시실</Heading4>

        <Tabs>
          <Tab key="exhibition1" title="1전시실">
            <Frame col w="100%" gap={8}>
              <Image
                src="/images/menu/museum/ExhibitionRoom1_1.jpg"
                alt="1전시실"
                className="w-full h-full object-cover pb-[8px]"
                radius="none"
              />
              <Image
                src="/images/menu/museum/ExhibitionRoom1_2.jpg"
                alt="1전시실2"
                className="w-full h-full object-cover pb-[8px]"
                radius="none"
              />
              <Image
                src="/images/menu/museum/ExhibitionRoom1_3.jpg"
                alt="1전시실3"
                className="w-full h-full object-cover pb-[8px]"
                radius="none"
              />
              <Body4>
                일제강점기 시절 어려운 가정환경 속에서도 구미보통학교와
                대구사범학교를 거쳐 문경 보통공립학교 교사시절에 이르기까지
                호연지기를 기르며 걸어온 청년 박정희의 흔적과 기억들을 각종
                자료와 모형, 영상, 증언청취 등을 통해 자세히 살펴볼 수 있도록
                연출하였으며 2년 7개월간 국가재건 최고회의 의장으로써의 활동상과
                제 5대 대통령으로 민족중흥의 길에 나섰던 박정희 대통령의 당시
                상황을 자료, 사진, 멀티 영상 등으로 구성하였다.
              </Body4>
            </Frame>
          </Tab>
          <Tab key="exhibition2" title="2전시실">
            <Frame col w="100%" gap={8}>
              <Image
                src="/images/menu/museum/ExhibitionRoom2_1.jpg"
                alt="2전시실1"
                className="w-full h-full object-cover pb-[8px]"
                radius="none"
              />
              <Image
                src="/images/menu/museum/ExhibitionRoom2_2.jpg"
                alt="2전시실2"
                className="w-full h-full object-cover pb-[8px]"
                radius="none"
              />
              <Image
                src="/images/menu/museum/ExhibitionRoom2_3.jpg"
                alt="2전시실3"
                className="w-full h-full object-cover pb-[8px]"
                radius="none"
              />
              <Body4>
                박정희 대통령이 추진한 경제개발 5개년 계획을 시작으로
                해외인력수출 1호인 파독광부, 간호사들에 대한 애환과 가치들이
                입체적으로 전시되어 있으며 종합 영상관을 통해 조국근대화에
                앞장서신 분들의 눈물겨운 증언들을 만나 볼 수 있다. 수출 100억불
                달성을 위해 혼연일체가 되어 이룩한 중화학공업, 경부고속도로
                건설, 신상필벌의 원칙을 고수하며 성공 시킨 새마을운동, 국가의
                부흥과 발전의 원동력인 과학 기술, 북한의 도발과 자주국방, 건군
                이후 최초의 해외파병인 베트남파병과 한미동맹, 대통령 재임기간
                신년사 아카이브 공간 등 민족중흥의 역사를 입체적으로 전시
                연출하였다.
              </Body4>
            </Frame>
          </Tab>
          <Tab key="exhibition3" title="3전시실">
            <Frame col w="100%" gap={8}>
              <Image
                src="/images/menu/museum/ExhibitionRoom3_1.jpg"
                alt="3전시실1"
                className="w-full h-full object-cover pb-[8px]"
                radius="none"
              />
              <Image
                src="/images/menu/museum/ExhibitionRoom3_2.jpg"
                alt="3전시실2"
                className="w-full h-full object-cover pb-[8px]"
                radius="none"
              />
              <Image
                src="/images/menu/museum/ExhibitionRoom3_3.jpg"
                alt="3전시실3"
                className="w-full h-full object-cover pb-[8px]"
                radius="none"
              />
              <Body4>
                박정희 대통령이 재임기간 겪었던 숱한 비판과 시련들을 당시
                신문기사를 통해 자세히 알 수 있도록 연출하였고, 대통령 내외분을
                위한 추모공간과 흔적과 자취를 느낄 수 있는 사진과 유물을 만나 볼
                수 있으며, 대통령의 인간적인 면을 엿 볼 수 있도록 집무실을
                재현하였다. 특히 6737일간의 여정을 사진 영상으로 연출하여 잔잔한
                감동과 그리움을 느낄 수 있는 시네마홀이 마련되어 있다.
              </Body4>
            </Frame>
          </Tab>
        </Tabs>
      </Frame>
    </Frame>
  );
};

export default MuseumContainer;
