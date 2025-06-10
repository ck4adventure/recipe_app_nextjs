'use client';

import { useRouter } from 'next/navigation';
import { useUser } from '../_context/UserContext';

export default function LogoutButton() {
  const router = useRouter();
	const { setUser } = useUser();

  async function handleLogout() {
    const res = await fetch('/api/logout', { method: 'POST' });
		setUser(null);
		// window.location.href = '/login'; 
		router.replace('/login')
  }

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
    >
      Log out
    </button>
  );
}
