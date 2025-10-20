// recipes index page
import { GET_CATEGORIES_AND_RECIPES } from "@/app/_lib/sqlQueriesRecipes";
import AddRecipeButton from "@/app/_ui/recipes/add_recipe_button";
import RecipeIndexView from "@/app/_ui/recipes/recipe_index_view";

export const revalidate = 5; // revalidate in seconds

// Recipe Index Page should display a list of recipes
export default async function Page() {
	const result = await GET_CATEGORIES_AND_RECIPES()

	return (
		<div className=''>
			<div data-cy='recipes-index'>
				<RecipeIndexView recipes={result} />
			</div>
			<div>
				<AddRecipeButton />
			</div>
		</div>
	);
}

