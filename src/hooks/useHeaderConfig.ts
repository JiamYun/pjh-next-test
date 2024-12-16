// 사용자 상태에 따라 헤더 메뉴 버튼 표시 여부를 결정하는 훅
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useApi } from "./useApi";
import { UserBoardType } from "@/types";

export const useHeaderConfig = () => {
  const { data: session } = useSession();
  const { userboard } = useApi();
  const [currentPost, setCurrentPost] = useState<UserBoardType | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const fetchPost = async () => {
      if (
        pathname &&
        pathname.startsWith("/userboard/") &&
        pathname.split("/").length === 3
      ) {
        const postId = pathname.split("/")[2];
        try {
          const response = await userboard.getPost(Number(postId));

          setCurrentPost(response.data);
        } catch (error) {
          console.error("게시글 조회 실패:", error);
        }
      }
    };

    fetchPost();
  }, [pathname]);

  const shouldShowDotButton = Boolean(
    !pathname?.includes("/edit") &&
      session?.user &&
      currentPost &&
      Number(session.user.profile.userId) === currentPost.author.id
  );

  return { shouldShowDotButton };
};
