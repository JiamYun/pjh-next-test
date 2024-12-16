import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;
  const { type, page, pageSize } = query;

  const userId = 1;
  try {
    switch (type) {
      case 'list':
        if (method !== 'GET') {
          return res.status(405).json({ message: 'Method not allowed' });
        }
        const listData = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/notification?page=${page}&pageSize=${pageSize}&id=${userId}`
        );
        return res.status(200).json(listData.data);

      case 'readAll':
        if (method !== 'PATCH') {
          return res.status(405).json({ message: 'Method not allowed' });
        }
        const readAllData = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/notification/readAll`
        );
        return res.status(200).json(readAllData.data);

      default:
        return res.status(400).json({ message: 'Invalid type parameter' });
    }
  } catch (error) {
    console.error('Notification API Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}