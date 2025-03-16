import { GET_RECIPE_TITLES, GET_RECIPE_TITLES_BY_CAT } from "@/app/_lib/sqlQueriesChef";
import Link from "next/link";

export default async function Page() {
	// fetch recipes, group in a meaningful way for display
	const recipeResults = await GET_RECIPE_TITLES_BY_CAT();
	return (
		<div data-cy='chef-recipes'>
			<div className="flex justify-center">
				<h1 className="text-xl">Chef&apos;s Recipes Page</h1>
			</div>
			{/* add recipes component */}
			<div data-cy='chef-recipes-by-category' className="m-8">
				{recipeResults && recipeResults.map((result, i) => (
					<div data-cy='category-section' key={i} className="m-8">
						<div className="font-medium capitalize">{result.category}</div>
						<ul className="mx-4">
							{result.recipes && result.recipes.map((recipe: any) => (
								<li data-cy='recipe-item' className="my-1" key={recipe.id}>
									<Link data-cy='recipe-link' href={`/chef/recipes/${recipe.slug}`} className="font-light text-sm"><p data-cy='recipe-title'>{recipe.title}</p></Link>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>

		</div>
	);
}