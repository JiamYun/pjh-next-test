import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }



  const { type, page, pageSize, categoryId } = req.query;

  try {
    switch (type) {
      case "summary":
        // getNoticeSummary
        const summaryData = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/notice/post/list?page=${page}&pageSize=${pageSize}`
        );
        return res.status(200).json(summaryData.data);

      case "all":
        // getAllNotice
        const allData = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/notice/post/list?page=${page}&pageSize=${pageSize}&categoryId=${
            categoryId !== "0" ? categoryId : ""
          }`
        );
        return res.status(200).json(allData.data);

      case "category":
        // getCategory
        const categoryData = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/notice/category/list`
        );
        return res.status(200).json(categoryData.data);

      default:
        return res.status(400).json({ message: "Invalid type parameter" });
    }
  } catch (error) {
    console.error("Notice API Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
