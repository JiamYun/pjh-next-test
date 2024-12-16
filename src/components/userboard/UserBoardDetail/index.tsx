import { useEffect, useState, memo } from "react";
import { Body1, Body3, Body4, Frame } from "@/atoms";
import { FrameScreen } from "@/atoms/Frame";
import Badge from "@/components/common/Badge";
import { UserBoardType } from "@/types";
import { formatDate } from "@/utils";

interface UserBoardDetailProps {
  post: UserBoardType;
}

const UserBoardDetail = memo(({ post }: UserBoardDetailProps) => {
  const [content, setContent] = useState(post.content);

  useEffect(() => {
    setContent(post.content);
  }, [post.content]);

  const hasHtmlTags = /<[^>]*>/g.test(content);

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

  const formatText = (text: string) => {
    return text.split(/\r\n|\n/).map((line, i) => (
      <span key={i}>
        {convertUrlsToLinks(line)}
        {i !== text.split(/\r\n|\n/).length - 1 && <br />}
      </span>
    ));
  };

  return (
    <FrameScreen px={20} py={12} gap={12}>
      <Frame col w="100%">
        <Frame w="100%" col>
          <Frame row w="100%" alignment="left" gap="auto">
            <Frame row flex={1}>
              <Body4>{post.author?.profile?.username}</Body4>
            </Frame>
            <Body4 fontColor="#959CAA">{formatDate(post.createdAt)}</Body4>
          </Frame>
        </Frame>
        <Frame row w="100%" py={12}>
          <Body1>{post.title}</Body1>
        </Frame>
      </Frame>
      <Frame>
        {hasHtmlTags ? (
          // HTML 태그가 있는 경우
          <div
            className="notice-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          // 일반 텍스트인 경우
          <Body3>{formatText(content)}</Body3>
        )}
      </Frame>
    </FrameScreen>
  );
});

UserBoardDetail.displayName = "UserBoardDetail";

export default UserBoardDetail;
