"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NoticeDetail from "@/components/notice/NoticeDetail";
import Spinner from "@/components/common/Spinner";
import { Frame } from "@/atoms";
import { NoticeType } from "@/types";
import { useApi } from "@/hooks/useApi";
interface NoticeDetailContainerProps {
  id: number;
}

const NoticeDetailContainer = ({ id }: NoticeDetailContainerProps) => {
  const router = useRouter();
  const { notice } = useApi();
  const [loading, setLoading] = useState(true);
  const [noticeDetail, setNoticeDetail] = useState<NoticeType | null>(null);

  useEffect(() => {
    const loadNotice = async () => {
      try {
        const response = await notice.getNotice(Number(id));
        setNoticeDetail(response.data);
      } catch (error) {
        console.error("Failed to fetch notice:", error);
        router.push("/notice");
      } finally {
        setLoading(false);
      }
    };
    loadNotice();
  }, [id, router]);

  if (loading) {
    return (
      <Frame w="100%" h="100%" alignment="center">
        <Spinner size="lg" />
      </Frame>
    );
  }

  if (!noticeDetail) {
    return <div>공지사항을 찾을 수 없습니다.</div>;
  }

  return <NoticeDetail notice={noticeDetail} />;
};

export default NoticeDetailContainer;
