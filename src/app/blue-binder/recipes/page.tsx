// recipes index page
import { GET_CATEGORIES_AND_RECIPES } from "../../_lib/sqlQueriesRecipes";
import RecipeIndexView from "../../_ui/recipes/recipe_index_view";




// Recipe Index Page should display a list of recipes
export default async function Page() {
	const result = await GET_CATEGORIES_AND_RECIPES()

	return (
		<div className=''>
			<div data-cy='recipes-index'>
				<RecipeIndexView recipes={result} />
			</div>
		</div>
	);
}

