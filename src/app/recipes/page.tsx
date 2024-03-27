import Link from "next/link";
import { getCategoriesAndRecipes } from "@/app/lib/data";
import CategoryView from "../ui/headerbar/recipes/category_view";
import RecipeIndexView from "../ui/headerbar/recipes/recipe_index_view";



// Recipe Index Page should display a list of recipes
export default async function Page() {
	const result = await getCategoriesAndRecipes()

	return (
		<div className='flex flex-col'>
			<div
				data-cy='recipes-headerbar'
				className='max-w-full flex flex-row-reverse m-4'
			>
				<Link
					className=''
					data-cy='add-recipe-link'
					href={'/recipes/add-recipe'}
				>+ Add Recipe</Link>
			</div>
			<div
				data-cy='recipes-index'
				>
				<RecipeIndexView recipes={result} />
			</div>
		</div>
	);
}	