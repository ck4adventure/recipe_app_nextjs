import { useUser } from '@/app/_context/UserContext';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {

		cookies().set('token', '', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			path: '/',
		});


  return NextResponse.json({ success: true});
}
