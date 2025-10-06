
import { GET_RECIPE_BY_SLUG } from '@/app/_lib/sqlQueriesRecipes';
import { Recipe } from '@/app/loafer/definitions';
// import { DeleteRecipeButton } from '@/app/ui/recipes/delete_recipe_button';
import RecipeCard from '@/app/_ui/recipes/recipe_card';

export const revalidate = 60; // revalidate in seconds


// RecipeDetailPage should fetch the recipe by id
export default async function Page({ params }: { params: { slug: string } }) {
	const recipe = await GET_RECIPE_BY_SLUG(params.slug) as unknown as Recipe;




	return (
		<div id='recipe_page'>
			<title>Recipe</title>
			<main className='flex flex-col items-center'>
				{recipe && <RecipeCard recipe={recipe} />}

				{!recipe && (
					<div>
						<div>The recipe for <b>{params.slug}</b> could not be found. Please check the db.</div>
					</div>
				)}
			</main>
		</div>
	);
}

// {/* <div>
// 	<Link data-cy="recipe-update-button" href={`/recipes/${encodeURI(params.slug)}/edit`}>Edit Recipe</Link>
// </div> */}
// {/* <div className='flex justify-center m-4 mt-8'>
// 	<DeleteRecipeButton id={recipe.recipe_id} />
// </div> */}