'use client'
import Link from 'next/link'
import Image from 'next/image'
import LogoutButton from '../logout-button';

import { useUser } from '../../_context/UserContext';
// import { Button, Menu, MenuItem } from '@mui/material'
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import { useState } from 'react'
// import './components.css'

export default function HeaderBar() {

	const { user } = useUser();

	return (
		<div data-cy='headerbar' className="flex justify-between bg-white items-center m-4 border-b-2">

			<div>
				<div className="m-2"><Link href="/"><Image src="/app/star_logo_large.png" className='logo' width="48" height="48" alt="The character Brain from the WB show" /></Link> </div>
			</div>


			{user ? (
				<>

					<div>
						<span className='mr-4'>Hello, {user.username}!</span>
						<LogoutButton />
					</div>
				</>
			) : (
				<div><Link href={"/login"}>Log in</Link></div>
			)}


		</div>
	)
}