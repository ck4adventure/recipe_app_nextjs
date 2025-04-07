import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

import Link from 'next/link';
export interface ChefsRecipe {
	id: string;
	slug: string;
	category: string;
	title: string;
	label: string,
	ingredients: any;
	steps?: string[];
	notes?: string[];
}
//  'milk', 'eggs', 'fish', 'shellfish', 'tree nuts', 
//  'peanuts', 'wheat', 'soy', 'sesame'
// const allergens = ['milk', 'eggs', 'fish', 'shellfish', 'tree nuts', 'peanuts', 'wheat', 'soy', 'sesame'];

export const ChefsRecipeCard = ({ recipe }: { recipe: ChefsRecipe }) => {
	if (!recipe) {
		return (
			<div data-cy='chefs-recipe-item' className='flex flex-col items-center'>
				<h2 data-cy='chefs-recipe-item-not-found' className="font-bold text-lg text-center">Recipe Not Found</h2>
				<p className="text-center">The chef's recipe you are looking for does not exist or has been removed.</p>
			</div>
		);
	}
	return (
		<Card data-cy='chefs-recipe-item' className='w-[600px] m-8 border-8'>
			<CardHeader className='text-center'>
				<CardTitle data-cy='chefs-recipe-packaged-name' className='capitalize [font-variant:petite-caps]'>{recipe.title}</CardTitle>
				<CardDescription data-cy='chefs-recipe-label_name'>{recipe.label}</CardDescription>
			</CardHeader>
			<CardContent>
				<div>
					<div className='flex my-2'>
						<p className='mr-2 font-semibold [font-variant:petite-caps]'>Category</p>
						<p data-cy='chefs-recipe-category'>{recipe.category}</p>
					</div>

					<div>
						<div data-cy='recipe-ingredients-section' className="">
							<h3 className="font-semibold [font-variant:petite-caps]">Ingredients</h3>
							<ul className="">
								{recipe.ingredients && recipe.ingredients.map((ingr: any) => (
									<li data-cy='recipe-ingredient' key={ingr.packaged_name} className="flex">
										<div className="flex"><p data-cy='ingredient-qty'>{ingr.qty}</p><p data-cy='ingredient-measure'>&nbsp;{ingr.measure}</p><p data-cy='ingredient-name'>&nbsp;{ingr.packaged_name}</p></div>{ingr.note && (<div className="flex font-semibold">,&nbsp;<div data-cy='ingredient-note' className="font-normal">&nbsp;{ingr.note}</div></div>)}
									</li>
								))}
							</ul>
						</div>
						<div data-cy='recipe-method-section' className="my-4">
							<h3 className="font-semibold [font-variant:petite-caps]">Method</h3>
							<ol className="list-decimal list-inside">
								{recipe.steps && recipe.steps.map((step: any, i: number) => (
									<li data-cy='recipe-step' key={i} className="">
										{step}
									</li>
								))}
							</ol>
						</div>

						{recipe.notes && recipe.notes.length > 0 && (
							<div data-cy='recipe-notes-section' className="">
								<div className="font-semibold [font-variant:petite-caps]">Notes</div>
								<ul>
									{recipe.notes && recipe.notes.map((note: string, i: number) => (
										<li key={i}>{note}</li>
									))}
								</ul>
							</div>
						)}
					</div>
					{/* <div className='flex flex-col my-2'>
						<p className='mr-2 [font-variant:petite-caps]'>On the label </p>
						<p data-cy='chefs-recipe-label-name'>{recipe.ingredients_label.join(", ")}</p>
					</div> */}
					{/* <div className='flex flex-col my-2'>
						<p className='mr-2 [font-variant:petite-caps]'>Allergen label </p>
						<p data-cy='chefs-recipe-label-name'>{chefs-recipe.allergens_label.filter(item => item != null).join(", ")}</p>
					</div> */}
					{/* <div data-cy='chefs-recipe-ingredients-section' className='flex flex-col my-2'>
						<p className='mr-2 [font-variant:petite-caps]'>Ingredients</p>

						<div className='flex flex-row'>
							<p className='mr-2 [font-variant:petite-caps]'>Base:</p>
							<div data-cy='chefs-recipe-base'>
								{chefs-recipe.components.base && chefs-recipe.components.base.map((recipeData: RecipeComponent) => {
									return (
										<div key={recipeData.id}>
											<Link href={`/chef/recipes/${recipeData.slug}`}>{recipeData.title}</Link>
										</div>
									);
								})}
							</div>
						</div>

						<div className='flex flex-row'>
							<p className='mr-2 [font-variant:petite-caps]'>Filling:</p>
							<div data-cy='chefs-recipe-filling'>
								{chefs-recipe.components.filling && chefs-recipe.components.filling.map((recipeData: RecipeComponent) => {
									return (
										<div key={recipeData.id}>
											<Link href={`/chef/recipes/${recipeData.slug}`}>{recipeData.title}</Link>
										</div>
									);
								})}
							</div>
						</div>

						<div className='flex flex-row'>
							<p className='mr-2 [font-variant:petite-caps]'>Topping:</p>
							<div data-cy='chefs-recipe-topping'>
								{chefs-recipe.components.topping && chefs-recipe.components.topping.map((recipeData: RecipeComponent) => {
									return (
										<div key={recipeData.id}>
											<Link href={`/chef/recipes/${recipeData.slug}`}>{recipeData.title}</Link>
										</div>
									);
								})}
								{!chefs-recipe.components.topping && (
									<div>none</div>
								)}
							</div>
						</div>
					</div> */}

				</div>
				{/* Steps Section */}
				{/* {chefs-recipe.steps?.length > 0 && (
					<div data-cy='chefs-recipe-method-section' className="m-4">
						<h3 className="font-semibold my-2">Method</h3>
						<ol className="list-decimal">
							{chefs-recipe.steps.map((step: any, i: number) => (
								<li data-cy='chefs-recipe-step' key={i} className="mx-4 my-2">
									{step}
								</li>
							))}
						</ol>
					</div>
				)} */}

				{/* Notes Section
				{chefs-recipe.notes?.length > 0 && (
					<div data-cy='chefs-recipe-notes-section' className="m-4">
						<div className="font-semibold my-2">Notes</div>
						<ul>
							{chefs-recipe.notes.map((note: string, i: number) => (
								<li key={i}>{note}</li>
							))}
						</ul>
					</div>
				)} */}

			</CardContent>
		</Card>
	)
}