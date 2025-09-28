import * as React from 'react';
import Link from 'next/link';

const cards = [
	{display: "All Recipes",
		link: "/blue-binder/recipes"
	},
	{display: "Authors",
		link: "/blue-binder/authors"
	},
	{display: "Categories",
		link: "/blue-binder/categories"
	},
	{display: "Sources",
		link: "/blue-binder/sources"
	},
]



export default async function Page() {

	return (
		<main className="min-h-screen flex flex-col items-center">
			{cards.map((card, i: number) => {

				return (
					<div key={`card-${i}`} className='w-[400px] h-[100px]  border-8 border-slate-200 rounded-lg m-4 p-4 flex items-center justify-center'>
						<Link href={`${card.link}`} className='m-2 text-xl'>{card.display}</Link>
					</div>
				)
			})}
		</main>
	);
}
