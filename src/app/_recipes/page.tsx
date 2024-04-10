// recipes index page
import { getCategoriesAndRecipes } from "@/app/lib/data";
import RecipeIndexView from "@/app/ui/recipes/recipe_index_view";




// Recipe Index Page should display a list of recipes
export default async function Page() {
	const result = await getCategoriesAndRecipes()

	return (
		<div className=''>
			<div data-cy='recipes-index'>
				<RecipeIndexView recipes={result} />
			</div>
		</div>
	);
}

