"use client";

import { Frame } from "@/atoms";

import { Body4 } from "@/atoms";
import { CategoryType, UserBoardType } from "@/types";
import { formatDate } from "@/utils";
import { useCustomRouter } from "@/hooks";

interface UserboardProps {
  postList: UserBoardType[];
  categories?: CategoryType[];
}

const UserBoard = ({ postList, categories }: UserboardProps) => {
  const router = useCustomRouter();

  return (
    <Frame col w="100%">
      <Frame col w="100%">
        {postList.length > 0 ? (
          postList.map((post) => (
            <Frame
              col
              w="100%"
              alignment="center"
              key={`noticeView_${post.id}`}
              px={20}
              py={8}
              onClick={() => {
                router.push("userboard_detail", { id: post.id });
              }}
              stroke={{
                size: 1,
                color: "#F0F0F0",
                perSide: ["bottom"],
              }}
            >
              <Frame row w="100%" flex={1} py={4}>
                <Body4 fontColor={"#3A3D43"} numberOfLine="1">
                  {post.title}
                </Body4>
              </Frame>
              <Frame col w="100%">
                <Body4 numberOfLine="1">{post.content}</Body4>
                <Body4 fontColor="#CED3DB" numberOfLine="1" pt={4}>
                  {formatDate(post.createdAt)} · {post.author.profile.username}
                </Body4>
              </Frame>
            </Frame>
          ))
        ) : (
          <Frame row w="100%" alignment="center" pt={20}>
            <Body4 fontColor="#CED3DB">작성된 게시글이 없습니다</Body4>
          </Frame>
        )}
      </Frame>
    </Frame>
  );
};

export default UserBoard;
