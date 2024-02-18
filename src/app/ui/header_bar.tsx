import Link from 'next/link'
import Image from 'next/image'
import './components.css'
export default function HeaderBar() {
	return (
		<div className="headerbar">
			<div className="headerbar-left"><Link href="/"><Image src="/app/grumpy_brain.png" className='logo' width="48" height="48" alt="The character Brain from the WB show"/></Link> </div>
			<div className="headerbar-middle"></div>
			<div className="headerbar-right"><Link href="/recipes">Recipes</Link> </div>
		</div>
	)
}