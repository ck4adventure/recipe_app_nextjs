'use client'
import Link from "next/link"

export default function AddAuthorButton() {
	return (
		<Link href="/blue-binder/authors/create">
			<div
				data-cy='add-author-link'
				className='fixed w-16 h-16 bottom-8 right-8 bg-indigo-400 text-white rounded-full text-center drop-shadow-lg'>
				<div className="mt-[12px] font-bold text-4xl">+
				</div>
			</div>
		</Link>
	)
}