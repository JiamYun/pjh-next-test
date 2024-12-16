"use client";

import React from "react";
import { Body3, Body4, Frame, Heading4 } from "@/atoms";

interface ContentDocumentProps {
  json: {
    title: string;
    content?: string;
    sections: Array<{
      subTitle?: string;
      subContent: Array<
        | string
        | {
            [key: string]: string | undefined;
          }
      >;
    }>;
  };
}

export const ContentDocument = ({ json }: ContentDocumentProps) => {
  return (
    <Frame col w="100%" minH="100vh" bg="white">
      <Frame col w="100%" h="100%" p={20}>
        {json.content && <Body3 pb={20}>{json.content}</Body3>}
        {json.sections.map((section, index) => (
          <Frame key={index} col pb={20}>
            {section.subTitle && (
              <Heading4 pb={12}>{section.subTitle}</Heading4>
            )}
            {section.subContent.map((content, contentIndex) => (
              <Frame
                key={contentIndex}
                col
                pb={typeof content === "object" ? 12 : 8}
              >
                {typeof content === "object" ? (
                  Object.entries(content).map(([key, value], i) => (
                    <Body4 key={i}>
                      {key}: {value}
                    </Body4>
                  ))
                ) : (
                  <Body4>{content}</Body4>
                )}
              </Frame>
            ))}
          </Frame>
        ))}
      </Frame>
    </Frame>
  );
};
