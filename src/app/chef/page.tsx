import Link from "next/link";


export default async function Page() {


	// TODO fetch products, recipes and ingrs, group in a meaningful way for display
	return (
		<div data-cy='recipes-index' className="flex flex-col items-center">
			<h1 className="m-6 text-2xl font-semibold text-center">Chef&apos;s Corner</h1>
			{/* add recipes component */}
			<div className="m-4 flex justify-between">
				<Link data-cy='recipes-link' href={"/chef/products"} className="m-4 text-2xl">Products Page</Link>
				<Link data-cy='recipes-link' href={"/chef/recipes"} className="m-4 text-2xl">Recipes Page</Link>
				<Link data-cy='ingredients-link' href={"/chef/ingrs"} className="m-4 text-2xl">Ingredients Page</Link>
			</div>

		</div>
	);
}