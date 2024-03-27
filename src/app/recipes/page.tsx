import Link from "next/link";
import { getCategoriesAndRecipes } from "@/app/lib/data";
import CategoryView from "../ui/headerbar/recipes/category_view";
import RecipeIndexView from "../ui/headerbar/recipes/recipe_index_view";



// Recipe Index Page should display a list of recipes
export default async function Page() {
	const result = await getCategoriesAndRecipes()

	return (
		<div className='flex flex-col max-w-screen-md justify-center items-center m-auto'>
			<title>Recipes</title>
			<main >
				<div data-cy='recipes-headerbar' className='flex justify-between my-4 mx-8'>
					<h1 className='' data-cy='recipes-header-type'>Recipes By Category</h1>
					<Link 
					  className='' 
						data-cy='add-recipe-link'
						href={'/recipes/add-recipe'}
						>Add Recipe</Link>
				</div>
				<RecipeIndexView recipes={result} />
			</main>
		</div>
	);
}	