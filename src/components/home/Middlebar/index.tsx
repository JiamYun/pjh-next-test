"use client";

import React from "react";

import { Body4, Frame } from "@/atoms";
import { Button, Icon } from "@/components";

const Middlebar = () => {
  const middleTabs = [
    {
      id: "museum",
      label: "박정희\n기념관",
      icon: "museum" as const,
      url: "https://presidentparkchunghee.org",
    },
    {
      id: "history",
      label: "박정희\n도서관",
      icon: "library" as const,
      url: "http://library.presidentparkchunghee.org",
    },
    {
      id: "library",
      label: "어깨동무\n스토리움",
      icon: "shoulder-friends" as const,
      url: "https://ekdmstoryum.org/index.php",
    },
    {
      id: "tv",
      label: "박정희\nTV",
      icon: "pjh-tv" as const,
      url: "https://www.youtube.com/@ParkChungHeeTV",
    },
  ];

  const handleClick = (url: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Frame col w="100%" bg="#FFFFFF">
      <Frame w="100%" row gap="auto" alignment="left" py={4}>
        {middleTabs.map((tab) => (
          <Button
            w="100%"
            key={tab.id}
            col
            alignment="center"
            onClick={() => handleClick(tab.url)}
          >
            <Icon type="menu" name={tab.icon} size={32} />
            <Body4>{tab.label}</Body4>
          </Button>
        ))}
      </Frame>
    </Frame>
  );
};

export default Middlebar;
