"use client";

import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "GET":
        // 프로필 조회
        const profileData = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/profile`,
          {
            headers: {
              Authorization: req.headers.authorization,
            },
          }
        );
        return res.status(200).json(profileData.data);

      case "POST":
        const { type } = req.query;
        switch (type) {
          case "register":
            // 프로필 수정
            console.log("req.body", req.body);
            // console.log("session", session);
            console.log("req.headers.authorization", req.headers.authorization);
            const updateData = await axios.post(
              `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
              req.body,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: req.headers.authorization,
                },
              }
            );
            return res.status(200).json(updateData.data);

          case "update":
            // 프로필 수정
            console.log("profile update req.body", req.body);
            const updateProfileData = await axios.post(
              `${process.env.NEXT_PUBLIC_API_URL}/profile/update`,
              req.body,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: req.headers.authorization,
                },
              }
            );
            return res.status(200).json(updateProfileData.data);

          default:
            return res
              .status(405)
              .json({ message: "허용되지 않는 메소드입니다" });
        }
    }
  } catch (error) {
    console.error("프로필 API 오류:", error);
    if (axios.isAxiosError(error)) {
      return res.status(error.response?.status || 500).json({
        message: error.response?.data?.message || "서버 오류가 발생했습니다",
      });
    }
    return res.status(500).json({ message: "서버 내부 오류가 발생했습니다" });
  }
}
