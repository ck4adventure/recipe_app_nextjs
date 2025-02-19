import Link from "next/link";

export default async function Page() {
	// TODO fetch products, recipes and ingrs, group in a meaningful way for display
	return (
		<div className=''>
			<div data-cy='recipes-index'>
				<h1 className="m-6 text-2xl font-semibold">Chef's Corner</h1>
				{/* add recipes component */}
				<div className="m-4 flex flex-col">
					<Link href={"/chef/ingrs"} className="m-2">Ingredients Page</Link>
					<Link href={"/chef/recipes"} className="m-2">Recipes Page</Link>
				</div>

			</div>
		</div>
	);
}