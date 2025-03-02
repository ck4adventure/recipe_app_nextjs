import { ChefsRecipeForm } from "@/app/_ui/chef/recipe_form";
import { GET_RECIPE_CATEGORIES } from "@/app/_lib/sqlQueriesChef";

export default async function Page() {
	const recipeCategories = await GET_RECIPE_CATEGORIES();
	const categories = recipeCategories.map(result => result.category);
	return (
		<div className="flex flex-col items-center">
			<ChefsRecipeForm categories={categories}/>
		</div>
	)
}