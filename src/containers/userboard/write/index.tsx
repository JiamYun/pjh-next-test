"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import WritePost from "@/components/userboard/write";
import { useApi } from "@/hooks/useApi";
import { useUploadPost } from "@/hooks/useUploadPost";

const WritePostContainer = () => {
  const { userboard } = useApi();
  const { setUploadHandler } = useUploadPost();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleClose = () => {
    router.back();
  };

  const handleSubmit = async () => {
    try {
      const response = await userboard.createPost({
        title,
        content,
        categoryId: 1,
      });

      if (response) {
        router.push("/userboard");
      }
    } catch (error) {
      console.error("게시글 작성 실패:", error);
    }
  };

  useEffect(() => {
    setUploadHandler(handleSubmit, Boolean(title && content), "create");
    return () => setUploadHandler(null, false, null);
  }, [title, content]);

  return (
    <WritePost
      title={title}
      content={content}
      onTitleChange={(e: any) => setTitle(e.target.value)}
      onContentChange={(e: any) => setContent(e.target.value)}
      onClose={handleClose}
      onSubmit={handleSubmit}
    />
  );
};

export default WritePostContainer;
