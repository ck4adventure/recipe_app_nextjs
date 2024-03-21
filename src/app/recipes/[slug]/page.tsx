import { getRecipeBySlug } from '@/app/lib/data';
import { Recipe } from '@/app/lib/definitions';

// RecipeDetailPage should fetch the recipe by id
export default async function Page({ params }: { params: { slug: string } }) {
	const recipe = await getRecipeBySlug(params.slug) as unknown as Recipe;
	return (
		<div>
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
						<li className='my-1 pl-2'>4 cups flour</li>
						<li className='my-1 pl-2'>1 cup sugar</li>
						<li className='my-1 pl-2'>2 eggs</li>
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
			</main>
		</div>
	);
}