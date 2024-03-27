import Link from "next/link";
import { getCategoriesAndRecipes } from "@/app/lib/data";
import CategoryView from "../ui/recipes/category_view";
import RecipeIndexView from "../ui/recipes/recipe_index_view";
import AddRecipeButton from "../ui/recipes/add_recipe_button";



// Recipe Index Page should display a list of recipes
export default async function Page() {
	const result = await getCategoriesAndRecipes()

	return (
		<div className='flex flex-col'>
			<div
				data-cy='recipes-index'
			>
				<RecipeIndexView recipes={result} />
			</div>
		<AddRecipeButton />
		</div>
	);
}

