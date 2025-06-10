import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'dev_secret');

export async function GET() {
  const token = cookies().get('token')?.value;
  if (!token) {
    return NextResponse.json({ user: null });
  }
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
		// feel like missing something here   
		console.log("payload is: ", payload)
		return NextResponse.json({ user: { username: payload.username } });
  } catch {
    return NextResponse.json({ user: null });
  }
}