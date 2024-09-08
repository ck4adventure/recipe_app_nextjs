'use client'
import Link from 'next/link'
import Image from 'next/image'
// import './components.css'

import { useUser } from '@auth0/nextjs-auth0/client';

export default function HeaderBar() {
	const { user, error, isLoading } = useUser();

	const userComponent = () => {
		if (user) {
			return (
				<div className="m-2">
					<div>{user.name}</div>
					<Link href="/api/auth/logout">Logout</Link>
				</div>
			)
		}
		return (
			<div>
					<Link href="/api/auth/login">Login</Link>
			</div>
		)
	}

	return (
		<div data-cy='headerbar' className="flex justify-between bg-white items-center m-4 border-b-2">
			<div>
				<div className="m-2"><Link href="/"><Image src="/app/grumpy_brain.png" className='logo' width="48" height="48" alt="The character Brain from the WB show" /></Link> </div>

			</div>
			<div className='flex flex-row'>
				<div className="m-2"><Link href="/recipes/">Recipes</Link> </div>
				<div className="m-2"><Link href="/categories/">Categories</Link> </div>
				<div className="m-2"><Link href="/authors/">Authors</Link> </div>
				<div className="m-2"><Link href="/sources/">Sources</Link> </div>
			</div>
			<div>
				{userComponent()}
			</div>
		</div>
	)
}