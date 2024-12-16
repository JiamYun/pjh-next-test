import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { type } = req.query;
    const { phone, inputCode, actualCode } = req.body;

    switch (type) {
      case "check-phone":
        if (req.method !== "POST") {
          return res.status(405).json({ message: "Method not allowed" });
        }

        const checkPhoneData = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/verify/check-phone`,
          { phone },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return res.status(200).json(checkPhoneData.data);

      case "verify-code":
        if (req.method !== "POST") {
          return res.status(405).json({ message: "Method not allowed" });
        }

        const verifyCodeData = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/verify/verify-code`,
          {
            phone,
            inputCode,
            actualCode,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return res.status(200).json(verifyCodeData.data);

      case "change-phone":
        if (req.method !== "POST") {
          return res.status(405).json({ message: "Method not allowed" });
        }
        // const session = await getServerSession(req, res, authOptions);
        // if (!session) {
        //   return res.status(401).json({ message: "Unauthorized" });
        // }
        const changePhoneData = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/verify/change-phone`,
          req.body,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: req.headers.authorization,
            },
          }
        );
        return res.status(200).json(changePhoneData.data);

      default:
        return res.status(400).json({ message: "잘못된 요청 타입입니다" });
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return res.status(error.response?.status || 500).json({
        message: error.response?.data?.message || "서버 오류가 발생했습니다",
      });
    }
    return res.status(500).json({ message: "서버 오류가 발생했습니다" });
  }
}
