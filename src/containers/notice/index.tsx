"use client";

import { Frame } from "@/atoms";
import Notice from "@/components/notice";
import { RootState } from "@/store";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "@/components/common/Spinner";
import infiniteScrollSlice from "@/store/slices/infiniteScrollSlice";
import noticeSlice from "@/store/slices/noticeSlice";
import { FrameScreen } from "@/atoms/Frame";
import { useApi } from "@/hooks/useApi";
import { NoticeType } from "@/types";

const NoticeContainer = () => {
  const dispatch = useDispatch();
  const { notice } = useApi();
  const [fixedNotices, setFixedNotices] = useState<NoticeType[]>([]);
  const loadingRef = useRef<HTMLDivElement>(null);

  const { notices, categories, selectedCategory } = useSelector(
    (state: RootState) => state.notice
  );

  const { page, hasMore, isLoading, pageSize } = useSelector(
    (state: RootState) => state.infiniteScroll
  );

  const handleCategorySelect = (categoryId: number | null) => {
    dispatch(noticeSlice.actions.setSelectedCategory(categoryId));
  };

  // 첫 페이지 로드시에만 실행되도록 수정
  useEffect(() => {
    fetchNoticeList(1, true);
  }, []); // 의존성 배열을 비워서 최초 1회만 실행

  // 카테고리 변경시에만 실행
  useEffect(() => {
    if (selectedCategory !== null) {
      fetchNoticeList(1, true);
    }
  }, [selectedCategory]);

  const fetchNoticeList = async (pageNum: number, forceRefresh = false) => {
    try {
      dispatch(infiniteScrollSlice.actions.setLoading(true));

      if (pageNum === 1 || forceRefresh) {
        dispatch(noticeSlice.actions.setNotices([]));
      }

      const response = await notice.getList(
        pageNum,
        pageSize,
        selectedCategory
      );

      const data = response.data;

      if (!data || data.length === 0) {
        dispatch(infiniteScrollSlice.actions.setHasMore(false));
      } else {
        if (pageNum === 1 || forceRefresh) {
          const fixed = data.filter((notice) => notice.fixed);
          const normal = data.filter((notice) => !notice.fixed);
          setFixedNotices(fixed);
          dispatch(noticeSlice.actions.setNotices(normal));
        } else {
          dispatch(noticeSlice.actions.appendNotices(data));
        }

        dispatch(
          infiniteScrollSlice.actions.setHasMore(data.length >= pageSize)
        );
        if (data.length >= pageSize) {
          dispatch(infiniteScrollSlice.actions.setPage(pageNum + 1));
        }
      }
    } catch (error) {
      console.error("공지사항 목록 조회 오류:", error);
    } finally {
      dispatch(infiniteScrollSlice.actions.setLoading(false));
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await notice.getCategories();
      dispatch(noticeSlice.actions.setCategories(response.data));
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          fetchNoticeList(page);
        }
      },
      { threshold: 1.0 }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => observer.disconnect();
  }, [page, hasMore, isLoading, selectedCategory]);

  useEffect(() => {
    dispatch(infiniteScrollSlice.actions.resetScroll());
    fetchNoticeList(1, true);
  }, [selectedCategory]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <FrameScreen>
      <Notice
        noticeList={[...fixedNotices, ...notices]}
        categories={categories}
        onCategorySelect={handleCategorySelect}
        selectedCategoryId={selectedCategory}
      />
      <Frame ref={loadingRef} h={20} w="100%" alignment="center">
        {isLoading && <Spinner />}
      </Frame>
    </FrameScreen>
  );
};

export default NoticeContainer;
