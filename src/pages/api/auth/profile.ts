import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const response = await axios.get('http://localhost:8000/auth/profile', {
      headers: req.headers,
      withCredentials: true,
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(401).json({ message: 'Não autorizado' });
  }
}
