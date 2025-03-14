import { ChefsRecipeForm } from "@/app/_ui/chef/recipe_form";
import { GET_ALL_INGRS_FOR_FORM, GET_RECIPE_CATEGORIES } from "@/app/_lib/sqlQueriesChef";
import { IngrResult } from "@/app/_ui/chef/recipe_form";
export default async function Page() {
	const recipeCategories = await GET_RECIPE_CATEGORIES();
	const availableIngredients = await GET_ALL_INGRS_FOR_FORM() as IngrResult[];

	const categories = recipeCategories.map(result => result.category);
	return (
		<div className="flex flex-col items-center">
			<ChefsRecipeForm categories={categories} ingredientsList={availableIngredients}/>
		</div>
	)
}