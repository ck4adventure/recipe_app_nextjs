import { GET_CATEGORIES_AND_RECIPES } from "./_lib/sqlQueriesRecipes";
import RecipeIndexView from "./_ui/recipes/recipe_index_view";

export default async function Main() {
	const result = await GET_CATEGORIES_AND_RECIPES()
	return (
		<div>
			<main className="flex min-h-screen flex-col items-center justify-between">
				<div data-cy='recipes-index'>
					<RecipeIndexView recipes={result} />
				</div>
			</main>
		</div>
	);
}
