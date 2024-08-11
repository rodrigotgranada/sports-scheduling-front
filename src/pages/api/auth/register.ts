import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const response = await axios.post('http://localhost:8000/auth/register', req.body, {
      headers: req.headers,
      withCredentials: true,
    });
    res.setHeader('Set-Cookie', response.headers['set-cookie'] || '');
    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao registrar. Por favor, tente novamente.' });
  }
}
