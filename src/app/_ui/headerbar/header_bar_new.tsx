'use client'
import Link from 'next/link'
import Image from 'next/image'
import LogoutButton from '../logout-button';
// import { Button, Menu, MenuItem } from '@mui/material'
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import { useState } from 'react'
// import './components.css'

type User = {
	username: string;
	// add other user fields as needed
};
export default function HeaderBar({ user }: { user: User | null }) {


	console.log(user)

	return (
		<div data-cy='headerbar' className="flex justify-between bg-white items-center m-4 border-b-2">

			<div>
				<div className="m-2"><Link href="/"><Image src="/app/star_logo_large.png" className='logo' width="48" height="48" alt="The character Brain from the WB show" /></Link> </div>
			</div>


			<div className='flex flex-row'>
				<Link href={"/chef"} className='mx-2'>Chefs Corner</Link>
				<Link href={"/recipes"} className='mx-2'>Personal Recipes</Link>
			</div>
			<div>
				{user && (
					<div>
						<div>Hello {user?.username}</div>
						<div><LogoutButton /></div>
					</div>
				)}
			</div>
		</div>
	)
}