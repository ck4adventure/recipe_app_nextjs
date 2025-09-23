import * as React from 'react';
import Link from 'next/link';


export default async function Page() {

	return (
		<main className="min-h-screen flex flex-col items-center">
			{/* <div className='w-[1000px] border-8 border-slate-200 m-4 p-4'>
				<Link href={"/chef"} className='font-bold'>Chef</Link>
				<div className='mx-4 flex'>
					<Link href={"/chef/products"} className='m-2 text-xl'>Products</Link>
					<Link href={"/chef/recipes"} className='m-2 text-xl'>Recipes</Link>
					<Link href={"/chef/ingrs"} className='m-2 text-xl'>Ingredients</Link>
				</div>
			</div> */}
			<div className='w-[1000px] border-8 border-slate-200 m-4 p-4'>
				<Link href={"/recipes"} className='font-bold'>Home Cooking</Link>
				<div className='mx-4 flex'>
					<Link href={"/recipes"} className='m-2 text-xl'>Recipes</Link>
					<Link href={"/authors"} className='m-2 text-xl'>Authors</Link>
					<Link href={"/sources"} className='m-2 text-xl'>Sources</Link>
					<Link href={"/categories"} className='m-2 text-xl'>Categories</Link>
				</div>
			</div>
		</main>
	);
}
