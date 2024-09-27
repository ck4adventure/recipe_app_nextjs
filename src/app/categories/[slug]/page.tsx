import { GET_RECIPES_FOR_CATEGORY_SLUG } from "../../../../lib/sqlQueriesVercel";
import AddRecipeButton from "../../ui/recipes/add_recipe_button";
import RecipesListView from "../../ui/recipes/recipe_list_view";
export default async function Page({ params }: {params: {slug: string}}) {
	const result = await GET_RECIPES_FOR_CATEGORY_SLUG(params.slug) as any[];
	const displayCategory = params.slug[0].toUpperCase() + params.slug.slice(1);
	return (
		<div>
			<h1 data-cy='category-name' className="text-xl m-4 text-center">{displayCategory}</h1>
			<RecipesListView data={result} />
		</div>
	);
}