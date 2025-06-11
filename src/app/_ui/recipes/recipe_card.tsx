'use client'
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
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import { Recipe } from '../../loafer/definitions';
import React from "react";
import { SquarePenIcon } from "lucide-react";

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
	const hasRecipeDetails = recipe && recipe.ingredients && recipe.steps;
	const [checked, setChecked] = React.useState<boolean[]>((recipe.steps ?? []).map(() => false));

	const handleCheck = (idx: number) => {
		setChecked(prev => prev.map((val, i) => (i === idx ? !val : val)));
	};

	const clearAll = () => setChecked(prev => prev.map(() => false))

	return (
		<Card className="w-full max-w-2xl shadow-2xl p-2 m-4">
			<CardHeader >
				<div className="flex justify-between">
					<CardTitle className="mb-1">{recipe.recipe_title}</CardTitle>
					<div><Link href={`/recipes/${recipe.recipe_slug}/edit`}><SquarePenIcon /></Link></div>
				</div>
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
						<ol className={'list-none'} data-cy="recipe-steps-list">
							{recipe.steps.map((step, index) => {
								return (
									<li key={index} className="" data-cy="recipe-step">
										<div className="flex min-h-16">
											<Checkbox
												className="m-2 mt-[12px] h-[18px] w-[18px] [&_svg]:stroke-[3px]"
												checked={checked[index]}
												onCheckedChange={() => handleCheck(index)}
											/>
											<div className="flex ml-1">
												<div className="m-2">{index + 1}.</div>
												<div className="m-2">{step}</div>
											</div>
										</div>
									</li>
								);
							})}
						</ol>
						<div className="m4 flex justify-end" data-cy="recipe-steps-button-clear">
							<Button onClick={clearAll} className="mr-4">Reset Progress</Button>
						</div>
					</div>

				}

			</CardContent>
			<CardFooter>Notes</CardFooter>
		</Card>
	)
}

export default RecipeCard;