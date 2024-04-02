import { getRecipesForCategory } from "@/app/lib/data";
import AddRecipeButton from "@/app/ui/recipes/add_recipe_button";
import RecipesListView from "@/app/ui/recipes/recipe_list_view";
export default async function Page({ params }: {params: {slug: string}}) {
	const result = await getRecipesForCategory(params.slug) as any[];
	const displayCategory = params.slug[0].toUpperCase() + params.slug.slice(1);
	return (
		<div>
			<h1 data-cy='category-name' className="text-xl m-4 text-center">{displayCategory}</h1>
			<RecipesListView data={result} />
			<AddRecipeButton />
		</div>
	);
}