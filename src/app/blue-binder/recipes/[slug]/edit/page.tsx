import { RecipeForm } from "@/app/_ui/recipes/recipe_form";
import { Recipe } from '@/app/loafer/definitions';
import { GET_AUTHORS, GET_CATEGORIES, GET_SOURCES, GET_RECIPE_BY_SLUG } from "@/app/_lib/sqlQueriesRecipes";

export default async function Page({ params }: { params: { slug: string } }) {
	const recipe = await GET_RECIPE_BY_SLUG(params.slug) as unknown as Recipe;
	const authorsResults = await GET_AUTHORS();
	const sourcesResults = await GET_SOURCES();
	const categories = await GET_CATEGORIES();
	return (
		<div className="flex flex-col items-center">
			<RecipeForm authorsRows={authorsResults} categoryRows={categories} sourcesRows={sourcesResults} recipe={recipe}/>
		</div>
	)
}