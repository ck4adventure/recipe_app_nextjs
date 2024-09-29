import { GET_RECIPE_BY_SLUG } from '../../../../lib/sqlQueriesRecipes';
import { Recipe } from '../../../../lib/definitions';
// import { DeleteRecipeButton } from '@/app/ui/recipes/delete_recipe_button';

import Link from 'next/link';

// RecipeDetailPage should fetch the recipe by id
export default async function Page({ params }: { params: { slug: string } }) {
	const recipe = await GET_RECIPE_BY_SLUG(params.slug) as unknown as Recipe;
	const hasRecipeDetails = recipe && recipe.ingredients && recipe.steps;

	return (
		<div id='recipe_page'>
			<title>Recipe</title>
			<main>
				{recipe && (
					<div className='flex flex-col items-center'>
						<div className='flex flex-col items-center' data-cy="recipe-detail-header">
							<div className='text-xl' data-cy="recipe-title">{recipe.recipe_title}</div>
							<div className='font-light text-xs' data-cy="recipe-category-link"><Link href={`/categories/${recipe.category_name}`}>{recipe.category_name}</Link></div>
						</div>

						<div data-cy="recipe-source-header">
							{recipe.source_id && <div className='m-2 text-sm' data-cy="recipe-source-title">Source: <Link href={`/sources/${recipe.source_id}`}>{recipe.source_title}</Link></div>}
							{recipe.author_id && <div className='m-2 text-sm' data-cy="recipe-source-author">By: <Link href={`/authors/${recipe.author_id}`}>{recipe.author_name}</Link></div>}
						</div>

						<div className='flex flex-col'>
							{!hasRecipeDetails &&
								<div className='sm:my-4'>
									No details yet for this recipe.
								</div>
							}

							{/* ingredients section */}
							{recipe.ingredients &&
								<div className='sm:my-4' data-cy="recipe-ingredients-section">
									<div className='m-2 text-lg' data-cy="recipe-ingredients-label">Ingredients</div>
									<ul className={`mx-8 list-disc`} data-cy='recipe-ingredients-list'>
										{recipe.ingredients.map((ingredient, index) => {
											return (
												<li key={index} className='my-1 pl-2' data-cy="recipe-detail-ingredient">{ingredient}</li>
											);
										})}
									</ul>
								</div>
							}

							{/* steps section */}
							{recipe.steps &&
								<div className='sm:my-4' data-cy="recipe-steps-section">
									<div className='m-2 text-lg' data-cy="recipe-steps-label">Directions</div>
									<ol className={`mx-8 list-decimal`} data-cy="recipe-steps-list">
										{recipe.steps.map((step, index) => {
											return (
												<li key={index} className='my-1 pl-2' data-cy="recipe-step">{step}</li>
											);
										})}
									</ol>
								</div>
							}
						</div>
					</div>
				)}
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