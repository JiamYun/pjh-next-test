"use client";

import { Body4, Frame, Image } from "@/atoms";
import { Icon, InfoSection } from "@/components";
import { IconText } from "@/components/IconText";
import React from "react";

const StoryumContainer = () => {
  return (
    <Frame col w="100%">
      <Frame col w="100%" gap={8}>
        <Frame w="100%" flex={1}>
          <Image
            src="/images/menu/storyum/main_storyum1.jpg"
            alt="storyum1"
            className="object-cover w-[150px] h-full"
            radius="none"
          />
        </Frame>
        <Frame w="100%" flex={1} h={200}>
          <Image
            src="/images/menu/storyum/main_storyum2.jpg"
            alt="storyum2"
            className="object-cover w-full h-full"
            radius="none"
          />
        </Frame>
        <Frame col w="100%" p={20}>
          <Body4 pb={20}>
            어깨동무스토리움은 어린이의 호기심과 상상력을 키워주는 다양한
            체험활동 시설입니다.
          </Body4>
          <IconText
            type="main"
            name="gift"
            pl={8}
            content="후원회원이 되시면 다양한 혜택이 주어집니다."
          />
        </Frame>
        <InfoSection
          title="이용시간"
          contents={["10:00 ~ 18:00", "입장마감 17:30"]}
          icons={[
            <Icon type="main" name="clock" size={20} />,
            <Icon type="main" name="clock" size={20} />,
          ]}
        />
        <InfoSection
          title="관람예약"
          contents={["회원 가입 후 신청"]}
          icons={[<Icon type="main" name="info" size={20} />]}
        />
        <InfoSection
          title="휴관일"
          contents={[
            "매주 월요일\n*월요일이 공휴일과 겹치는 경우 기념관 정상 운영, 그다음 날 휴관\n단, 월요일이 대체 공휴일인 경우 휴관",
            "설날, 추석 당일",
          ]}
          icons={[
            <Icon type="main" name="calendar" size={20} />,
            <Icon type="main" name="calendar" size={20} />,
          ]}
        />
        <InfoSection
          title="문의전화"
          contents={["02-716-9345"]}
          icons={[<Icon type="main" name="phone" size={20} />]}
        />
      </Frame>
    </Frame>
  );
};

export default StoryumContainer;
