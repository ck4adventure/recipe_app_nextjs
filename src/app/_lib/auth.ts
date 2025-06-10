import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

export function getCurrentUser() {
  const token = cookies().get('token')?.value;
  if (!token) return null;

  try {
    const user = jwt.verify(token, JWT_SECRET) as { userId: string; username: string };
    return user;
  } catch {
    return null;
  }
}
