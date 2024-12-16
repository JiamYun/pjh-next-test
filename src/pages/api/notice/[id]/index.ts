import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id } = req.query;

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/notice/post/${id}`
    );
    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Notice Detail API Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}