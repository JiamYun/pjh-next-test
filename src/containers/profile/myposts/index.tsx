"use client";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { Frame } from "@/atoms";
import { FrameScreen } from "@/atoms/Frame";
import { useApi } from "@/hooks/useApi";
import UserBoard from "@/components/userboard";
import Spinner from "@/components/common/Spinner";
import infiniteScrollSlice from "@/store/slices/infiniteScrollSlice";
import userboardSlice from "@/store/slices/userboardSlice";

const MyPostsContainer = () => {
  const dispatch = useDispatch();
  const { userboard } = useApi();
  const loadingRef = useRef<HTMLDivElement>(null);

  const { posts } = useSelector((state: RootState) => state.userboard);
  const { page, hasMore, isLoading, pageSize } = useSelector(
    (state: RootState) => state.infiniteScroll
  );

  const fetchMyPosts = async (pageNum: number, forceRefresh = false) => {
    try {
      dispatch(infiniteScrollSlice.actions.setLoading(true));

      if (pageNum === 1 || forceRefresh) {
        dispatch(userboardSlice.actions.setPosts([]));
      }

      const response = await userboard.getMyPosts(pageNum, pageSize);

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
    } catch (error: any) {
      console.error("내 게시글 목록 조회 오류:", error);
      if (error.response?.status === 401) {
        // 401 에러 발생 시 hasMore를 false로 설정하여 추가 요청 방지
        dispatch(infiniteScrollSlice.actions.setHasMore(false));
      }
    } finally {
      dispatch(infiniteScrollSlice.actions.setLoading(false));
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          fetchMyPosts(page);
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
    fetchMyPosts(1, true);
  }, []);

  return (
    <FrameScreen>
      <Frame col w="100%">
        <UserBoard postList={posts} />
        <Frame ref={loadingRef} h={20} w="100%" alignment="center">
          {isLoading && <Spinner />}
        </Frame>
      </Frame>
    </FrameScreen>
  );
};

export default MyPostsContainer;
