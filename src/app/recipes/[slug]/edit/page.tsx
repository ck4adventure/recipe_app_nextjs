// anything can link to this page
// just need the recipe slug from the path params
// then fetch it properly using next's app features (not page features)
// then pass the recipe into the client component
import { RecipeForm } from "@/app/ui/recipes/recipe_form";
import { getRecipeBySlug, getCategories } from "@/app/lib/data";
import { Recipe } from "@/app/lib/definitions";

export default async function Page({ params }: { params: { slug: string } }) {
	const recipe = await getRecipeBySlug(params.slug) as unknown as Recipe;
	const categoryRows = await getCategories();
	return (
		<div>
			<title>Edit Recipe</title>
			<main className="max-w-screen-sm m-auto">
				<RecipeForm categoryRows={categoryRows} recipe={recipe} />
			</main>
		</div>
	);
}