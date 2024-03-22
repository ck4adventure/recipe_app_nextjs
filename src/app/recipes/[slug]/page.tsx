import { getRecipeBySlug } from '@/app/lib/data';
import { Recipe } from '@/app/lib/definitions';
import { DeleteRecipeButton } from '@/app/ui/headerbar/recipes/delete_recipe_button';

// RecipeDetailPage should fetch the recipe by id
export default async function Page({ params }: { params: { slug: string } }) {
	const recipe = await getRecipeBySlug(params.slug) as unknown as Recipe;
	return (
		<div id='recipe_page'>
			<title>Recipe</title>
			<main className='max-w-screen-sm m-auto flex flex-col'>
				{/* header section */}
				<div className='flex flex-col items-center' data-cy="recipe-detail-header">
					<div className='text-xl' data-cy="recipe-detail-title">{recipe.recipe_title}</div>
					<div className='font-light text-xs' data-cy="recipe-detail-category">{recipe.category_name}</div>
				</div>
				
				{/* ingredients section */}
				<div className='my-4' data-cy="recipe-detail-ingredients">
					<div className='text-lg' data-cy="recipe-detail-ingredients-header">Ingredients</div>
					<ul className={`my-4 mx-8 list-disc`}>
						{recipe.ingredients && recipe.ingredients.map((ingredient, index) => {
							return (
								<li key={index} className='my-1 pl-2' data-cy="recipe-detail-ingredient">{ingredient}</li>
							);
						})}
					</ul>
				</div>
				
				{/* directions section */}
				<div className='my-4' data-cy="recipe-detail-directions">
					<div className='text-lg' data-cy="recipe-detail-directions-header">Directions</div>
					<ol className={`my-4 mx-8 list-decimal`} data-cy="recipe-detail-directions-list">
						<li className='my-1 pl-2'>Preheat oven to 350°F</li>
						<li className='my-1 pl-2'>Mix flour and sugar together</li>
						<li className='my-1 pl-2'>Add eggs</li>
						<li className='my-1 pl-2'>Bake</li>
					</ol>
				</div>
				<div className='flex justify-center mb-4'>
					<DeleteRecipeButton id={recipe.recipe_id} />
				</div>
				</main>
		</div>
	);
}