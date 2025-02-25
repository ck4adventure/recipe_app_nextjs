import { GET_RECIPE_TITLES } from "@/app/_lib/sqlQueriesChef";
import Link from "next/link";

export default async function Page() {
	// fetch recipes, group in a meaningful way for display
	const recipeResults = await GET_RECIPE_TITLES();
	return (
		<div className=''>
			<div data-cy='recipes-index'>
				<div className="flex justify-center text-xl">
					<h1>Chef&apos;s Recipes Index Page</h1>
				</div>
				{/* add recipes component */}
				<div className="m-8">
					{recipeResults && recipeResults.map(recipe => (
						<div className="my-1" key={recipe.id}>
							<Link href={`/chef/recipes/${recipe.slug}`}><p>{recipe.title}</p></Link>
						</div>
					))}
				</div>

			</div>
		</div>
	);
}