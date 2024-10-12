'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Button, Menu, MenuItem } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from 'react'
// import './components.css'
export default function HeaderBar() {
	const [anchorElLoafer, setAnchorElLoafer] = useState<HTMLElement | null>(null)
	const [anchorElRecipes, setAnchorElRecipes] = useState<HTMLElement | null>(null)

  const handleLoaferClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElLoafer(event.currentTarget);
  };

  const handleRecipesClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElRecipes(event.currentTarget);
  };

  const handleLoaferClose = () => {
    setAnchorElLoafer(null);
  };

  const handleRecipesClose = () => {
    setAnchorElRecipes(null);
  };
	return (
		<div data-cy='headerbar' className="flex justify-between bg-white items-center m-4 border-b-2">
			<div>
				<div className="m-2"><Link href="/"><Image src="/app/star_logo_large.png" className='logo' width="48" height="48" alt="The character Brain from the WB show" /></Link> </div>

			</div>
			<div className='flex flex-row'>
				<div className='m-2'>
					<Button
						variant='text'
						aria-controls="simple-menu"
						aria-haspopup="true"
						onClick={handleLoaferClick}
					>Loafer <ArrowDropDownIcon /></Button>
					<Menu
						anchorEl={anchorElLoafer}
						keepMounted
						open={Boolean(anchorElLoafer)}
						onClose={handleLoaferClose}
					>
						<MenuItem className="m-2" onClick={handleLoaferClose}><Link href="/loafer/">Main</Link> </MenuItem>
						<MenuItem className="m-2" onClick={handleLoaferClose}><Link href="/loafer/leaven/">Leaven</Link> </MenuItem>
						<MenuItem className="m-2" onClick={handleLoaferClose}><Link href="/loafer/dough/">Dough</Link> </MenuItem>
						<MenuItem className="m-2" onClick={handleLoaferClose}><Link href="/loafer/loaves/">Loaves</Link> </MenuItem>
					</Menu>
				</div>
				{/* <div className='m-2'>
					<Button
						variant='text'
						aria-controls="simple-menu"
						aria-haspopup="true"
						onClick={handleRecipesClick}
					>Recipe Manager <ArrowDropDownIcon /></Button>
					<Menu
						anchorEl={anchorElRecipes}
						keepMounted
						open={Boolean(anchorElRecipes)}
						onClose={handleRecipesClose}
					>
						<MenuItem className="m-2" onClick={handleRecipesClose}><Link href="/recipes/">Recipes</Link> </MenuItem>
						<MenuItem className="m-2" onClick={handleRecipesClose}><Link href="/categories/">Categories</Link> </MenuItem>
						<MenuItem className="m-2" onClick={handleRecipesClose}><Link href="/authors/">Authors</Link> </MenuItem>
						<MenuItem className="m-2" onClick={handleRecipesClose}><Link href="/sources/">Sources</Link> </MenuItem>
					</Menu>
				</div> */}
			</div>
		</div>
	)
}