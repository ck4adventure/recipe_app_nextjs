'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Button, Menu, MenuItem } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from 'react'
// import './components.css'
export default function HeaderBar() {


	return (
		<div data-cy='headerbar' className="flex justify-between bg-white items-center m-4 border-b-2">

			<div>
				<div className="m-2"><Link href="/"><Image src="/app/star_logo_large.png" className='logo' width="48" height="48" alt="The character Brain from the WB show" /></Link> </div>
			</div>
			

			<div className='flex flex-row'>
				<Link href={"/chef"} className='mx-2'>Chef's Corner</Link>
				<Link href={"/loafer"} className='mx-2'>Loafer</Link>
				<Link href={"/recipes"} className='mx-2'>Personal Recipes</Link>
			</div>
		</div>
	)
}