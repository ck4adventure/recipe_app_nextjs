import { RecipeForm } from "@/app/_ui/recipes/recipe_form";
import { GET_AUTHORS, GET_CATEGORIES, GET_SOURCES } from "@/app/_lib/sqlQueriesRecipes";

export const revalidate = 5; // reval in seconds

export default async function Page() {
	const authorsResults = await GET_AUTHORS();
	const sourcesResults = await GET_SOURCES();
	const categories = await GET_CATEGORIES();
	return (
		<div className="flex flex-col items-center">
			<RecipeForm authorsRows={authorsResults} categoryRows={categories} sourcesRows={sourcesResults}/>
		</div>
	)
}