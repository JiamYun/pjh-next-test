"use client";

import { Body2, Body3, Body4, Frame } from "@/atoms";
import { FrameScreen } from "@/atoms/Frame";
import { useApi } from "@/hooks/useApi";
import { formatDate } from "@/utils";
import { useEffect, useState } from "react";

interface NotificationDetailProps {
  id: string;
}

const NotificationDetail = ({ id }: NotificationDetailProps) => {
  const { notification } = useApi();
  const [loading, setLoading] = useState(true);
  const [notificationBody, setNotificationBody] = useState<any>(null);

  useEffect(() => {
    const loadNotification = async () => {
      try {
        const response = await notification.getOne(Number(id));
        setNotificationBody(response.data);
      } catch (error) {
        console.error("Failed to fetch notification:", error);
      } finally {
        setLoading(false);
      }
    };
    loadNotification();
  }, [id, notification]);

  // URL을 찾아서 링크로 변환하는 함수
  const convertUrlsToLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, i) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#0066cc", textDecoration: "underline" }}
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  // 일반 텍스트의 줄바꿈 처리
  const formatText = (text: string) => {
    return text.split(/\r\n|\n/).map((line, i) => (
      <span key={i}>
        {convertUrlsToLinks(line)}
        {i !== text.split(/\r\n|\n/).length - 1 && <br />}
      </span>
    ));
  };

  if (loading) {
    return (
      <Frame w="100%" h="100%" alignment="center">
        <Body4 fontColor="#CED3DB">로딩중...</Body4>
      </Frame>
    );
  }

  if (!notificationBody) {
    return (
      <Frame w="100%" h="100%" alignment="center">
        <Body4 fontColor="#CED3DB">알림을 찾을 수 없습니다</Body4>
      </Frame>
    );
  }

  return (
    <FrameScreen>
      <Frame col w="100%" px={20} py={12} gap={12}>
        <Frame col w="100%">
          <Frame row w="100%" alignment="left" gap="auto">
            <Frame row flex={1}>
              <Body2>{notificationBody.title}</Body2>
            </Frame>
          </Frame>
        </Frame>
        <Frame>
          <Body4>{formatText(notificationBody.content)}</Body4>
        </Frame>
      </Frame>
    </FrameScreen>
  );
};

export default NotificationDetail;
