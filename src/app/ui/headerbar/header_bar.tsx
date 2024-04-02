import Link from 'next/link'
import Image from 'next/image'
// import './components.css'
export default function HeaderBar() {
	return (
		<div data-cy='headerbar' className="flex justify-between bg-white items-center m-4 border-b-2">
			<div className=""><Link href="/"><Image src="/app/grumpy_brain.png" className='logo' width="48" height="48" alt="The character Brain from the WB show"/></Link> </div>
			<div className=""></div>
			<div className=""><Link href="/recipes">Recipes</Link> </div>
			<div className=""><Link href="/recipes/categories">Categories</Link> </div>
			<div className=""><Link href="/recipes/authors">Authors</Link> </div>
			<div className=""><Link href="/recipes/sources">Sources</Link> </div>
		</div>
	)
}