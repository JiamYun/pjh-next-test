"use client";

import { useEffect, useState } from "react";
import { UserBoardType } from "@/types";

import Link from "next/link";
import { Body4, Frame } from "@/atoms";

interface Props {
  hasLine?: boolean;
  postList: UserBoardType[];
}

export function HotPost({ hasLine = false, postList }: Props) {
  const [hotPostList, setHotPostList] = useState<UserBoardType[]>(postList);

  useEffect(() => {
    setHotPostList(postList);
  }, [postList]);

  return (
    <Frame col w="100%">
      {hotPostList && hotPostList.length > 0 ? (
        <Frame col w="100%" px={hasLine ? 0 : 28} gap={12}>
          {hotPostList &&
            hotPostList.map((hotpost, index) => (
              <Link
                key={`hotpostsPressable_${hotpost.id}`}
                href={`/userboard/${hotpost.id}`}
                className="block"
              >
                <Frame
                  row
                  w="100%"
                  alignment="left"
                  px={hasLine ? 28 : 0}
                  pt={hasLine ? 12 : 0}
                  pb={index === hotPostList.length - 1 ? 12 : 0}
                  stroke={{
                    size: hasLine ? 1 : 0,
                    color: "#F0F0F0",
                    perSide: ["top"],
                  }}
                  key={`hotpostsView_${hotpost.id}`}
                >
                  <Body4 key={`hotpostsRank_${hotpost.id}`}>{index + 1}</Body4>
                  <Body4 key={`hotposts_${hotpost.id}`} pl={20}>
                    {hotpost.title}
                  </Body4>
                </Frame>
              </Link>
            ))}
        </Frame>
      ) : (
        <Frame col w="100%" alignment="center" pt={40}>
          <Body4 fontColor="#CED3DB">작성된 글이 없습니다</Body4>
        </Frame>
      )}
    </Frame>
  );
}
