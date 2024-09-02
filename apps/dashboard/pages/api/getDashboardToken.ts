import { sign } from '@tsndr/cloudflare-worker-jwt';

const DASHBOARD_SECRET = process.env.DASHBOARD_SECRET;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const token = await sign({ exp: Math.floor(Date.now() / 1000) + (60 * 5) }, DASHBOARD_SECRET);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate token' });
  }
}