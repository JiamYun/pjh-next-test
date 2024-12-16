"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Body3, Frame, Heading6, Text } from "@/atoms";
import { Button, Divider } from "@/components";
import historyData from "@/constants/historyData.json";
import { colors } from "@/styles";

const PresidentInfoContainer = () => {
  const router = useRouter();

  return (
    <Frame col w="100%">
      <Frame col w="100%">
        {/* 메인 이미지 */}
        <div className="w-full ">
          <Image
            src="/images/presidentprofile/introducePage.png"
            alt="박정희 대통령 산책"
            width={700}
            height={400}
            className="w-full"
          />
        </div>

        {/* 기본 정보 */}
        <Frame col w="100%" px={20}>
          <Frame row alignment="center">
            <h2 className="text-[20px] leading-[31px] font-bold mb-2 font-pjh">
              박정희
            </h2>
            <Body3 pl={8} fontColor={colors.neutral[500]}>
              1917.11.14 ~ 1979.10.26
            </Body3>
          </Frame>
          <Body3>
            대한민국 제5~9대 대통령 (1963 ~ 1979)이다.
            <br />
            <br />
            일제 식민지 강점과 6·25 전쟁으로 인해 세계에서 가장 낙후하고
            가난했던 대한민국이 오늘날 세계 10위권의 선진국이 될 수 있도록
            초석을 닦은 탁월한 선각자이자 지도자다.
            <br />
            <br />
            농촌 현대화 운동인 새마을운동과 경제개발 5개년계획 추진, 과학기술
            발전과 인력 양성, 경부고속도로 개통, 산림녹화 사업, 자주국방 및 군
            현대화 사업 등 다방면에 걸친 국가 근대화 정책을 추진함으로써 '한강의
            기적'을 넘어 '세기의 기적'을 일궈 냈다.
            <br />
            <br />
            일평생 '하면 된다'는 신념으로 오직 나라와 민족을 위해 헌신해 온 그의
            위대한 정신은 지금도 면면히 이어지고 있으며, 대한민국 역대 대통령
            가운데서 가장 존경하는 인물로 추앙받고 있다.
          </Body3>
        </Frame>

        {/* 후원신청 버튼 */}
        <Frame w="100%" px={20} py={12}>
          <Button
            stroke={{ color: "#12137B", size: 1 }}
            fontColor={"#12137B"}
            w="100%"
            onClick={() => {
              router.push("/donation");
            }}
          >
            후원신청하기
          </Button>
        </Frame>

        <Frame w="100%" py={20}>
          <Divider size={1} />
        </Frame>

        {/* 연보 섹션 */}
        <Frame col w="100%" px={20}>
          <Heading6 py={6}>박정희 대통령 연보</Heading6>
          <Frame col w="100%" py={6}>
            {historyData.map((item, index) => (
              <Frame w="100%" key={index} row pb={10}>
                <Frame w="40%">
                  <Text fontColor={"#565A64"} fontSize={12}>
                    {item.date}
                  </Text>
                </Frame>
                <Frame w="60%">
                  <Text fontColor={"#565A64"} fontSize={12}>
                    {item.content}
                  </Text>
                </Frame>
              </Frame>
            ))}
          </Frame>
        </Frame>
      </Frame>
    </Frame>
  );
};

export default PresidentInfoContainer;
