import { Body2, Body3, Body4, Frame } from "@/atoms";
import React from "react";

interface DirectionInfo {
  lines: string[];
  exit?: string;
  description?: string;
  actions?: Array<{
    type: string;
    content: string;
  }>;
}

interface SubwayDirectionProps {
  title: string;
  directions: DirectionInfo[];
  border?: boolean;
}

const subwayLineColors = [
  { line: "1", color: "#0052A4", value: "1호선" },
  { line: "2", color: "#00A84D", value: "2호선" },
  { line: "3", color: "#EF7C1C", value: "3호선" },
  { line: "4", color: "#00A5DE", value: "4호선" },
  { line: "5", color: "#996CAC", value: "5호선" },
  { line: "6", color: "#CD7C2F", value: "6호선" },
  { line: "7", color: "#747F00", value: "7호선" },
  { line: "8", color: "#E6186C", value: "8호선" },
  { line: "9", color: "#BDB092", value: "9호선" },
  { line: "경", color: "#77C4A3", value: "경의중앙선" },
  { line: "공", color: "#0090D2", value: "공항철도" },
];

const SubwayDirections = ({
  title,
  directions,
  border = true,
}: SubwayDirectionProps) => {
  return (
    <Frame col w="100%">
      {border && <div className="w-full h-[6px] bg-[#F0F0F0]" />}
      <Frame col p={20} gap={32}>
        <span className="text-[14px] font-bold">{title}</span>
        {directions.map((direction, index) => (
          <Frame col key={index} gap={12}>
            <Frame row gap={8} pb={12}>
              {/* 호선 원형 아이콘 */}
              {direction.lines.map((line, lineIndex) => {
                const subwayLineColor = subwayLineColors.find(
                  (item) => item.line === line
                );

                return (
                  <Frame
                    col
                    w={26}
                    h={26}
                    alignment="center"
                    key={lineIndex}
                    bg={subwayLineColor?.color}
                    radius={26}
                  >
                    <Body3 pt={4} fontColor="white" numberOfLine="1">
                      {line}
                    </Body3>
                  </Frame>
                );
              })}

              {/* 호선 이름 */}
              {direction.lines.map((line, nameIndex) => {
                const subwayLineColor = subwayLineColors.find(
                  (item) => item.line === line
                );

                return (
                  <Body3
                    pl={8}
                    pt={4}
                    fontColor={subwayLineColor?.color}
                    key={nameIndex}
                  >
                    {subwayLineColor?.value}
                  </Body3>
                );
              })}

              {/* 출구 번호 */}
              {direction.exit && (
                <Body3 pl={8} pt={4}>
                  {direction.exit}
                </Body3>
              )}
            </Frame>

            {/* 설명 */}
            {direction.description && (
              <span className="text-[14px] mt-1.5 whitespace-pre-line">
                {direction.description}
              </span>
            )}

            {/* 상세 안내 */}
            {direction.actions && (
              <Frame col gap={8} pl={2.5}>
                {direction.actions.map((action, actionIndex) => (
                  <Frame row key={actionIndex} gap={8}>
                    <span className="text-[14px] font-bold">{action.type}</span>
                    <span className="text-[14px]">{action.content}</span>
                  </Frame>
                ))}
              </Frame>
            )}
          </Frame>
        ))}
      </Frame>
    </Frame>
  );
};

export default SubwayDirections;
