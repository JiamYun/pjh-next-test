"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/useApi";

import { UserBoardType } from "@/types";
import WritePost from "@/components/userboard/write";
import { FrameScreen } from "@/atoms/Frame";
import { useUploadPost } from "@/hooks/useUploadPost";

export const UserBoardEditContainer = ({ id }: { id: number }) => {
  const router = useRouter();
  const { userboard } = useApi();
  const [post, setPost] = useState<UserBoardType | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { setUploadHandler } = useUploadPost();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await userboard.getPost(Number(id));
        setPost(response.data);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (error) {
        console.error("게시글 조회 오류:", error);
        router.push("/userboard");
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  const handleSubmit = async () => {
    try {
      await userboard.updatePost(Number(id), {
        title,
        content,
        categoryId: post?.categoryId || 1,
      });
      router.replace(`/userboard/${id}`);
    } catch (error) {
      console.error("게시글 수정 오류:", error);
    }
  };

  useEffect(() => {
    setUploadHandler(handleSubmit, Boolean(title && content), "edit");
    return () => setUploadHandler(null, false, null);
  }, [title, content]);

  if (!post) return null;

  return (
    <FrameScreen>
      <WritePost
        title={title}
        content={content}
        onTitleChange={(e) => setTitle(e.target.value)}
        onContentChange={(e) => setContent(e.target.value)}
        onClose={() => router.back()}
        onSubmit={handleSubmit}
      />
    </FrameScreen>
  );
};
