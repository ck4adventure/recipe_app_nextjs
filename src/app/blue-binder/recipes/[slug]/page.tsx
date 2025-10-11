
import { GET_RECIPE_BY_SLUG } from '@/app/_lib/sqlQueriesRecipes';
import { Recipe } from '@/app/loafer/definitions';
// import { DeleteRecipeButton } from '@/app/ui/recipes/delete_recipe_button';
import RecipeCard from '@/app/_ui/recipes/recipe_card';

export const revalidate = 60; // revalidate in seconds

import type { Metadata, ResolvingMetadata } from 'next'
 
 
export async function generateMetadata(
  { params }:{ params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { slug } = await params
 
  // fetch data
  const recipe = await GET_RECIPE_BY_SLUG(slug)
 
  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: `${recipe.recipe_title} | Blue Binder`,
  }
}


// RecipeDetailPage should fetch the recipe by id
export default async function Page({ params }: { params: { slug: string } }) {
	const recipe = await GET_RECIPE_BY_SLUG(params.slug) as unknown as Recipe;




	return (
		<div id='recipe_page'>
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