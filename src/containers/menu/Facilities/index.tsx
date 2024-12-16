"use client";

import { Body4, Frame, Image } from "@/atoms";
import { Icon, InfoSection } from "@/components";
import { IconText } from "@/components/IconText";
import React from "react";

const FacilitiesContainer = () => {
  return (
    <Frame col w="100%">
      <Frame col w="100%" gap={8}>
        <Frame w="100%" flex={1} h={200}>
          <Image
            src="/images/menu/facilities/main_pjhhall.jpg"
            alt="pjhhall"
            className="object-cover w-full h-full"
            radius="none"
          />
        </Frame>
        <Frame col w="100%" p={20}>
          <IconText
            type="main"
            name="check"
            pl={8}
            pt={2}
            content="박정희홀(수용인원 50~130명)"
          />
        </Frame>
        <Frame w="100%" flex={1} h={200}>
          <Image
            src="/images/menu/facilities/main_seminarroom.jpg"
            alt="pjhhall2"
            className="object-cover w-full h-full"
            radius="none"
          />
        </Frame>
        <Frame col w="100%" p={20}>
          <IconText
            type="main"
            name="check"
            pl={8}
            pt={2}
            content="세미나실(수용인원 10~15명)"
          />
        </Frame>
        <Frame w="100%" flex={1} h={200}>
          <Image
            src="/images/menu/facilities/main_educationhall.jpg"
            alt="educationhall"
            className="object-cover w-full h-full"
            radius="none"
          />
        </Frame>
        <Frame col w="100%" p={20}>
          <IconText
            type="main"
            name="check"
            pl={8}
            pt={2}
            content="어깨동물스토리움 교육장(수용인원 20~40명)"
          />
        </Frame>
        <InfoSection
          title="대관안내"
          contents={[
            "대관일 및 시간",
            "- 화~토요일 개관시간(10시~18시)내로 함",
            "- 월요일이 법정 공휴일인 경우에도 대관함(별도협의)",
            "시설사용 신청방법",
            "- 직접방문 또는 전화문의 (유료대관, 행사일 최소 10일전까지)",
          ]}
          icons={[
            <Icon type="main" name="check" size={20} />,
            null,
            null,
            <Icon type="main" name="check" size={20} />,
            null,
          ]}
        />
        <InfoSection
          title="문의전화"
          icons={[<Icon type="main" name="phone" size={20} />]}
          contents={["02-716-9345(내선1010) / 010-9716-9345"]}
        />
      </Frame>
    </Frame>
  );
};

export default FacilitiesContainer;
