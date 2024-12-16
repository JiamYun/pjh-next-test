import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { page, pageSize } = req.query;

    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/banner/list?page=${page}&pageSize=${pageSize}`
    );

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
