"use client";

import { Body4, Frame, Image } from "@/atoms";
import { Icon, InfoSection } from "@/components";
import { IconText } from "@/components/IconText";
import React from "react";

const LibraryContainer = () => {
  return (
    <Frame col w="100%">
      <Frame col w="100%" gap={8}>
        <Frame w="100%" h={200}>
          <Image
            src="/images/menu/library/main_bookcafe1.jpg"
            alt="library1"
            className="object-cover w-full h-full"
            radius="none"
          />
        </Frame>
        <Frame w="100%" h={200}>
          <Image
            src="/images/menu/library/main_bookcafe2.jpg"
            alt="library2"
            className="object-cover w-full h-full"
            radius="none"
          />
        </Frame>
        <Frame w="100%" h={200}>
          <Image
            src="/images/menu/library/main_bookcafe3.jpg"
            alt="library3"
            className="object-cover w-full h-full"
            radius="none"
          />
        </Frame>
        <Frame w="100%" h={200}>
          <Image
            src="/images/menu/library/main_bookcafe4.jpg"
            alt="library4"
            className="object-cover w-full h-full"
            radius="none"
          />
        </Frame>
        <Frame col w="100%" p={20}>
          <Body4 pb={20}>
            박정희도서관은 음료를 마시며 자유롭게 책을 보실 수 있도록 북카페로
            운영하고 있습니다.
            <br />
            (어린이 도서 이용가능)
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
          title="휴관일"
          contents={[
            "매주 월요일\n*월요일이 공휴일과 겹치는 경우 기념관 정상 운영, 그다음 날 휴관\n단, 월요일이 대체 공휴일인 경우 휴관",
            "설날, 추석 당일",
          ]}
          icons={[
            <Icon type="main" name="clock" size={20} />,
            <Icon type="main" name="clock" size={20} />,
          ]}
        />
      </Frame>
    </Frame>
  );
};

export default LibraryContainer;
