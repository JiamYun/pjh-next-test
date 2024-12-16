import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;
  const { id, type } = query;

  try {
    switch (type) {
      case 'detail':
        if (method !== 'GET') {
          return res.status(405).json({ message: 'Method not allowed' });
        }
        const detailData = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/notification/${id}`
        );
        return res.status(200).json(detailData.data);

      case 'read':
        if (method !== 'PATCH') {
          return res.status(405).json({ message: 'Method not allowed' });
        }
        const readData = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/notification/${id}/read`
        );
        return res.status(200).json(readData.data);

      case 'delete':
        if (method !== 'PATCH') {
          return res.status(405).json({ message: 'Method not allowed' });
        }
        const deleteData = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/notification/${id}/delete`
        );
        return res.status(200).json(deleteData.data);

      default:
        return res.status(400).json({ message: 'Invalid type parameter' });
    }
  } catch (error) {
    console.error('Notification API Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}