'use client'
import Link from 'next/link'
import Image from 'next/image'
// import { Button, Menu, MenuItem } from '@mui/material'
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import { useState } from 'react'
// import './components.css'
export default function FooterBar() {


	return (
		<div data-cy='headerbar' className="flex justify-between bg-white items-center m-4 border-b-2">

			<div>
				<div className="m-2"><Link href={"https://github.com/ck4adventure/recipe_app_nextjs"}>v 0.1</Link></div>
			</div>
			
		</div>
	)
}