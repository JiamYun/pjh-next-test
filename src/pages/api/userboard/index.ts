import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const isApp = req.headers["x-from-app"] === "true";

    switch (req.method) {
      case "GET":
        const { type, page, pageSize } = req.query;

        switch (type) {
          case "hotposts":
            const hotPostsData = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/userboard/post/hotposts`
            );
            return res.status(200).json(hotPostsData.data);

          case "list":
            const listData = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/userboard/post/list?page=${page}&pageSize=${pageSize}`
            );

            return res.status(200).json(listData.data);

          default:
            return res.status(400).json({ message: "잘못된 요청 타입입니다" });
        }

      case "POST":
        // 게시글 작성
        const registerData = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/userboard/post/register`,
          req.body,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: req.headers.authorization,
            },
          }
        );
        return res.status(200).json(registerData.data);

      default:
        return res.status(405).json({ message: "허용되지 않는 메소드입니다" });
    }
  } catch (error) {
    console.error("게시판 API 오류:", error);
    return res.status(500).json({ message: "서버 내부 오류가 발생했습니다" });
  }
}
