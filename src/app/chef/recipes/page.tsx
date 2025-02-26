import { GET_RECIPE_TITLES, GET_RECIPE_TITLES_BY_CAT } from "@/app/_lib/sqlQueriesChef";
import Link from "next/link";

export default async function Page() {
	// fetch recipes, group in a meaningful way for display
	const recipeResults = await GET_RECIPE_TITLES_BY_CAT();
	console.log(recipeResults[0].recipes)
	return (
		<div data-cy='recipes-index'>
			<div className="flex justify-center text-xl">
				<h1>Chef&apos;s Recipes Index Page</h1>
			</div>
			{/* add recipes component */}
			<div className="m-8">
				{recipeResults && recipeResults.map((result, i) => (
					<div key={i} className="m-8">
						<div className="uppercase font-semibold">{result.category}</div>
						<ul className="mx-4">
							{result.recipes && result.recipes.map((recipe: any) => (
								<li className="my-1" key={recipe.id}>
									<Link href={`/chef/recipes/${recipe.slug}`}><p>{recipe.title}</p></Link>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>

		</div>
	);
}