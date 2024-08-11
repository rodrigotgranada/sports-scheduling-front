import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const response = await axios.post('http://localhost:8000/auth/login', req.body, {
      withCredentials: true,
    });
    res.setHeader('Set-Cookie', response.headers['set-cookie'] || '');
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(401).json({ message: 'Credenciais inválidas. Por favor, tente novamente.' });
  }
}
