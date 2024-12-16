import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  console.log("method===", req.method)

  try {
    switch (req.method) {
      case "GET":
        // 게시글 상세 조회
        const detailData = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/userboard/post/detail?id=${id}`,
          {
            headers: {
              Authorization: req.headers.authorization,
            }
          }
        );
        return res.status(200).json(detailData.data);

      case "PUT":
        // 게시글 수정
        const updateData = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/userboard/post/update?id=${id}`,
          req.body,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: req.headers.authorization,
            }
          }
        );
        return res.status(200).json(updateData.data);

      case "DELETE":
        // 게시글 삭제
        const deleteData = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/userboard/post/delete?id=${id}`,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: req.headers.authorization,
            }
          }
        );
        return res.status(200).json(deleteData.data);

      default:
        return res.status(405).json({ message: "허용되지 않는 메소드입니다" });
    }
  } catch (error) {
    console.error("게시판 API 오류:", error);
    return res.status(500).json({ message: "서버 내부 오류가 발생했습니다" });
  }
}