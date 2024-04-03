import { getCategoriesAndRecipes } from "@/app/lib/data";
import RecipeIndexView from "./ui/recipes/recipe_index_view";

export default async function Main() {
	const result = await getCategoriesAndRecipes()

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
