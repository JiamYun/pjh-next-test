"use client";

import { Frame, Heading6 } from "@/atoms";
import { RootState, useAppSelector } from "@/store";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "@/components/common/Spinner";
import UserBoard from "@/components/userboard";
import { HotPost } from "@/components/hotposts";
import { Divider, Icon } from "@/components";
import infiniteScrollSlice from "@/store/slices/infiniteScrollSlice";
import userboardSlice from "@/store/slices/userboardSlice";
import { useRouter } from "next/navigation";
import { FrameScreen } from "@/atoms/Frame";
import { useApi } from "@/hooks/useApi";

const UserBoardContainer = () => {
  const { userboard } = useApi();
  const router = useRouter();
  const dispatch = useDispatch();
  const [hotPosts, setHotPosts] = useState<any[]>([]);
  const { posts, categories, selectedCategory } = useSelector(
    (state: RootState) => state.userboard
  );

  const { page, hasMore, isLoading, pageSize } = useSelector(
    (state: RootState) => state.infiniteScroll
  );

  const loadingRef = useRef<HTMLDivElement>(null);

  const fetchHotPosts = async () => {
    try {
      const data = await userboard.getHotPosts();

      setHotPosts(data.data);
    } catch (error) {
      console.error("인기 게시글 조회 오류:", error);
    }
  };

  const fetchPostList = async (pageNum: number, forceRefresh = false) => {
    try {
      dispatch(infiniteScrollSlice.actions.setLoading(true));

      if (pageNum === 1 || forceRefresh) {
        dispatch(userboardSlice.actions.setPosts([]));
      }

      const response = await userboard.getList(pageNum, pageSize);

      if (!response?.data || response.data.length === 0) {
        dispatch(infiniteScrollSlice.actions.setHasMore(false));
      } else {
        if (pageNum === 1 || forceRefresh) {
          dispatch(userboardSlice.actions.setPosts(response.data));
        } else {
          dispatch(userboardSlice.actions.appendPosts(response.data));
        }
        dispatch(infiniteScrollSlice.actions.setPage(pageNum + 1));
      }
    } catch (error) {
      console.error("게시글 목록 조회 오류:", error);
    } finally {
      dispatch(infiniteScrollSlice.actions.setLoading(false));
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          fetchPostList(page);
        }
      },
      { threshold: 1 }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => observer.disconnect();
  }, [page, hasMore, isLoading]);

  useEffect(() => {
    dispatch(infiniteScrollSlice.actions.resetScroll());
    dispatch(infiniteScrollSlice.actions.setHasMore(true));
    fetchPostList(1, true);
    fetchHotPosts(); // 핫포스트 불러오기
  }, []);

  const handleWriteClick = () => {
    router.replace("/userboard/write");
  };

  return (
    <FrameScreen>
      <Frame w="100%" row alignment="center" gap="auto" px={20} py={12}>
        <Frame w="100%" row flex={1}>
          <Icon type="main" name="hot-post" size={28} />
          <Heading6 pl={10}>지금 뜨는 인기글</Heading6>
        </Frame>
      </Frame>
      {hotPosts.length > 0 && <HotPost postList={hotPosts} hasLine />}
      <Frame col w="100%">
        <Divider thickness={8} />
      </Frame>
      <UserBoard postList={posts} categories={categories} />
      <Frame ref={loadingRef} h={20} w="100%" alignment="center">
        {isLoading && <Spinner />}
      </Frame>

      <div
        onClick={handleWriteClick}
        style={{
          position: "fixed",
          bottom: "80px",
          right: "20px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "16px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          zIndex: 100,
          width: "100px",
          height: "48px",
          backgroundColor: "#0F3D86",
          borderRadius: "24px",
        }}
      >
        <span>+ 글쓰기</span>
      </div>
    </FrameScreen>
  );
};

export default UserBoardContainer;
