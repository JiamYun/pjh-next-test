"use client";

import React from "react";

import { Divider, Icon, InfoSection } from "@/components";
import Donation from "@/components/donation";
import { Body5, Frame } from "@/atoms";
import { FrameScreen } from "@/atoms/Frame";

const DonationContainer = () => {
  const donationUrl = "https://www.ihappynanum.com/Nanum/api/KE2HB80M7G";
  const handleClick = (url: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).open(url, "_blank", "noopener,noreferrer");
  };
  return (
    <FrameScreen zIndex={999}>
      <Donation
        onClick={() => handleClick(donationUrl)}
        content={"100만 후원 캠페인에\n동참해 주십시오"}
      />
      <Frame col w={"100%"}>
        <InfoSection
          title="후원계좌"
          contents={[
            "우리은행 1005-704-041713",
            "예금주 (재) 박정희대통령기념재단",
          ]}
          icons={[null, null]}
        />
        <InfoSection
          title="후원문의"
          contents={["02-716-9345(내선1009)", "010-9716-9345"]}
          icons={[
            <Icon type="main" name="phone" size={20} />,
            <Icon type="main" name="phone" size={20} />,
          ]}
        />
        <Frame w={"100%"} py={12}>
          <Divider thickness={1} />
        </Frame>
        <Frame w={"100%"} px={20} pb={20}>
          <Body5 fontColor="#959CAA">
            (재) 박정희대통령기념재단은 기획재정부 장관이 지정한 (고시
            제2019-9호, {"\n"}2019.3.29.) 지정기부금단체로 연말정산시 세액공제
            혜택을 받으실 수 있습니다
          </Body5>
        </Frame>
      </Frame>
    </FrameScreen>
  );
};

export default DonationContainer;
