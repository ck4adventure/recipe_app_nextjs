import Link from 'next/link'
import Image from 'next/image'
// import './components.css'
export default function HeaderBar() {
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
		</div>
	)
}