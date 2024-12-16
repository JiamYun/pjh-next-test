// src/containers/notification/index.tsx
"use client";

import { Frame, Body4 } from "@/atoms";
import { RootState } from "@/store";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "@/components/common/Spinner";
import infiniteScrollSlice from "@/store/slices/infiniteScrollSlice";
import notificationSlice from "@/store/slices/notificationSlice";
import { formatDate } from "@/utils";
import { FrameScreen } from "@/atoms/Frame";
import { useApi } from "@/hooks/useApi";
import { useRouter } from "next/navigation";

const NotificationContainer = () => {
  const dispatch = useDispatch();
  const { notification } = useApi();

  const { notifications } = useSelector(
    (state: RootState) => state.notification
  );
  const { page, hasMore, isLoading, pageSize } = useSelector(
    (state: RootState) => state.infiniteScroll
  );

  const router = useRouter();

  const loadingRef = useRef<HTMLDivElement>(null);

  const fetchNotifications = async (pageNum: number, forceRefresh = false) => {
    try {
      dispatch(infiniteScrollSlice.actions.setLoading(true));

      // 첫 페이지 로드 또는 강제 새로고침 시 기존 데이터 초기화
      if (pageNum === 1 || forceRefresh) {
        dispatch(notificationSlice.actions.setNotifications([]));
      }

      const response = await notification.getList(pageNum, pageSize);

      const data = response.data;

      if (!data || data.length === 0) {
        dispatch(infiniteScrollSlice.actions.setHasMore(false));
      } else {
        if (pageNum === 1 || forceRefresh) {
          dispatch(notificationSlice.actions.setNotifications(data));
        } else {
          dispatch(notificationSlice.actions.appendNotifications(data));
        }
        dispatch(infiniteScrollSlice.actions.setPage(pageNum + 1));
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      dispatch(infiniteScrollSlice.actions.setHasMore(false));
    } finally {
      dispatch(infiniteScrollSlice.actions.setLoading(false));
    }
  };

  const handleReadAll = async () => {
    try {
      await fetch(`/api/notification?type=readAll`, {
        method: "PATCH",
      });
      dispatch(notificationSlice.actions.updateAllNotificationsRead());
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  const handleReadNotification = async (id: number) => {
    try {
      router.push(`/notification/${id}`);
      await notification.readOne(id);
      dispatch(notificationSlice.actions.updateNotificationRead(id));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          fetchNotifications(page);
        }
      },
      { threshold: 1.0 }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => observer.disconnect();
  }, [page, hasMore, isLoading]);

  useEffect(() => {
    dispatch(infiniteScrollSlice.actions.resetScroll());
    fetchNotifications(1, true);
  }, []);

  return (
    <>
      <FrameScreen>
        <Frame col w="100%">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <Frame
                key={notification.id}
                col
                w="100%"
                alignment="center"
                px={20}
                py={8}
                onClick={() => handleReadNotification(notification.id)}
                stroke={{
                  size: 1,
                  color: "#F0F0F0",
                  perSide: ["bottom"],
                }}
              >
                <Frame row w="100%" flex={1} py={4}>
                  <Body4
                    fontColor={
                      notification.readType === "READ" ? "#CED3DB" : "#3A3D43"
                    }
                    numberOfLine="1"
                  >
                    {notification.title}
                  </Body4>
                </Frame>
                <Frame col w="100%">
                  <Body4
                    fontColor={
                      notification.readType === "READ" ? "#CED3DB" : "#3A3D43"
                    }
                    numberOfLine="1"
                  >
                    {notification.content}
                  </Body4>
                  <Body4 fontColor="#CED3DB" numberOfLine="1" pt={4}>
                    {formatDate(notification.createdAt)}
                  </Body4>
                </Frame>
              </Frame>
            ))
          ) : (
            <Frame row w="100%" alignment="center" pt={20}>
              <Body4 fontColor="#CED3DB">알림이 없습니다</Body4>
            </Frame>
          )}
          <div ref={loadingRef}>{isLoading && <Spinner />}</div>
        </Frame>
      </FrameScreen>
    </>
  );
};

export default NotificationContainer;
