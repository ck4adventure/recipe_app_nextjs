import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import Link from 'next/link';
import { Recipe } from '../../loafer/definitions';

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
		const hasRecipeDetails = recipe && recipe.ingredients && recipe.steps;
	return (
		<Card className="w-full max-w-2xl shadow-2xl p-2 m-4">
			<CardHeader >
				<CardTitle className="mb-1">{recipe.recipe_title}</CardTitle>
				<CardDescription >
					<div>Category:&nbsp;<Link href={`/categories/${recipe.category_name}`}>{recipe.category_name}</Link></div>
				</CardDescription>
				<CardDescription >
					<div>Source:&nbsp;<Link href={`/sources/${recipe.source_id}`}>{recipe.source_title}</Link>,&nbsp;by:&nbsp;<Link href={`/authors/${recipe.author_id}`}>{recipe.author_name}</Link> </div>
				</CardDescription>
			</CardHeader>


			<CardContent>
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
						<ol className={'mx-8 list-decimal'} data-cy="recipe-steps-list">
							{recipe.steps.map((step, index) => {
								return (
									<li key={index} className="my-1 ml-4" data-cy="recipe-step">
										<div className="flex flex-row">
											<Checkbox className="-ml-10 mr-6 mt-2" />
											<div>{step}</div>
										</div>
									</li>
								);
							})}
						</ol>
					</div>
				}

			</CardContent>
			<CardFooter>Notes</CardFooter>
		</Card>
	)
}

export default RecipeCard;