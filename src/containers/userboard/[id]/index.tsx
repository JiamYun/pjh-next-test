"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/common/Spinner";
import { Body3, Frame } from "@/atoms";
import { UserBoardType } from "@/types";
import UserBoardDetail from "@/components/userboard/UserBoardDetail";
import { useCustomRouter } from "@/hooks";
import { useApi } from "@/hooks/useApi";
import { colors } from "@/styles";

interface UserBoardDetailContainerProps {
  id: number;
}

const UserBoardDetailContainer = ({ id }: UserBoardDetailContainerProps) => {
  const { userboard } = useApi();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<UserBoardType | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const response = await userboard.getPost(id);
        setPost(response.data);
      } catch (error) {
        console.error("Failed to fetch userboard:", error);
        router.replace("/userboard");
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, []);

  if (loading) {
    return (
      <Frame w="100%" h="100%" alignment="center">
        <Spinner size="lg" />
      </Frame>
    );
  }

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <Frame w="100%" h="100%" alignment="center">
      <UserBoardDetail post={post} />
    </Frame>
  );
};

export default UserBoardDetailContainer;
