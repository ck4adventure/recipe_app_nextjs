// RecipeForm is a client component that displays a form
// with a recipe title input and a select dropdown to choose a category
// it should manage the state and submit the form
'use client'
import { createRecipeAndRedirect, updateRecipeAndRedirect } from "../../recipes/actions";
import { useState } from "react";
import IngredientField from "./ingredient_field";
import DirectionField from "./direction_field";
import { Card } from "@/components/ui/card";

export const RecipeForm = ({ authorsRows, sourcesRows, categoryRows, recipe }: { authorsRows: any, sourcesRows: any, categoryRows: any, recipe?: any }) => {
	const [recipeTitle, setRecipeTitle] = useState<string>(recipe ? recipe.recipe_title : '');
	const [categoryID, setCategoryID] = useState<number>(recipe ? recipe.category_id : 1);
	const [ingredients, setIngredients] = useState<string[]>((recipe && recipe.ingredients) ? recipe.ingredients : ['', '']);
	const [steps, setSteps] = useState<string[]>((recipe && recipe.steps) ? recipe.steps : ['', '']);
	const [authorID, setAuthorID] = useState<number>(recipe ? recipe.author_id : 1);
	const [sourceID, setSourceID] = useState<number>(recipe ? recipe.source_id : 1);


	const addField = (type: 'ingredients' | 'steps') => {
		if (type === 'steps') {
			setSteps([...steps, '']);
		} else {
			setIngredients([...ingredients, '']);
		}
	}

	const handleIngredientChange = (index: number, value: string) => {
		const newIngredients = [...ingredients];
		newIngredients[index] = value;
		setIngredients(newIngredients);
	}

	const handleIngredientDelete = (index: number) => {
		const newIngredients = [...ingredients];
		newIngredients.splice(index, 1);
		setIngredients(newIngredients);
	}

	const handleDirectionChange = (index: number, value: string) => {
		const newSteps = [...steps];
		newSteps[index] = value;
		setSteps(newSteps);
	}

	const handleDirectionDelete = (index: number) => {
		const newSteps = [...steps];
		newSteps.splice(index, 1);
		setSteps(newSteps);
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const actualIngredients = ingredients.filter(ingr => ingr.length > 0);
		const actualSteps = steps.filter(step => step.length > 0);
		if (recipe) {
			await updateRecipeAndRedirect(recipe.recipe_id, recipeTitle, categoryID, sourceID, authorID, actualIngredients, actualSteps);
		} else {
			await createRecipeAndRedirect(recipeTitle, categoryID, sourceID, authorID, actualIngredients, actualSteps);
		}
	};

	return (
		<Card className="w-[700px] m-4 p-8 shadow-2xl">

			<h1 className="my-2 font-bold">{recipe ? 'Update' : 'Add'} Recipe</h1>
			<form data-cy='recipe-form' className="my-4 flex flex-col justify-center" onSubmit={handleSubmit}>
				{/* Recipe Title */}
				<div className="my-2">
					<label className='flex items-center' htmlFor="recipe-title">Recipe Title
						<input
							id="recipe-title"
							data-cy='recipe-title-input'
							className="grow border-b border-slate-300"
							onChange={e => setRecipeTitle(e.target.value)}
							value={recipeTitle}>
						</input>
					</label>
				</div>
				{/* Category Select */}
				<div className="my-2">
					<label htmlFor="category-select" className="w-[350px] flex justify-between items-center">Category
						<select
							id="category-select"
							className="w-[225px]"
							onChange={e => setCategoryID(parseInt(e.target.value))}
							data-cy='recipe-category-select'
							value={categoryID}
						>
							{categoryRows.map((row: any) => (
								<option
									key={row.id}
									value={row.id}>
									{row.name}
								</option>))}
						</select>
					</label>
				</div>
				{/* Source Select */}
				<div className="my-2">
					<label htmlFor="source-select" className="w-[350px] flex justify-between items-center">Source
						<select
							id="source-select"
							className="w-[250px]"
							onChange={e => setSourceID(parseInt(e.target.value))}
							data-cy='recipe-source-select'
							value={sourceID}
						>
							{sourcesRows.map((row: any) => (
								<option
									key={row.id}
									value={row.id}>
									{row.title}
								</option>))}
						</select>
					</label>
				</div>
				{/* Author Select */}
				<div className="my-2">
					<label htmlFor="author-select" className="w-[350px] flex justify-between items-center">Author
						<select
							id="author-select"
							className="w-[250px]"
							onChange={e => setAuthorID(parseInt(e.target.value))}
							data-cy='recipe-author-select'
							value={authorID}
						>
							{authorsRows.map((row: any) => (
								<option
									key={row.id}
									value={row.id}>
									{row.name}
								</option>))}
						</select>
					</label>
				</div>
				{/* Ingredients Section */}
				<fieldset data-cy='recipe-ingredients-section' className='my-4'>Ingredients
					{ingredients.map((ingredient, i) => (
						<IngredientField
							key={i}
							value={ingredient}
							onChange={(value) => handleIngredientChange(i, value)}
							onDelete={() => handleIngredientDelete(i)} />
					))}
					<button type="button" data-cy='add-ingr-button' onClick={() => addField("ingredients")}>+ Add Ingredient</button>
				</fieldset>
				{/* Steps Section */}
				<fieldset data-cy='recipe-steps-section' className='my-4'>Steps
					{steps.map((direction, i) => (
						<DirectionField
							key={i}
							value={direction}
							onChange={(value) => handleDirectionChange(i, value)}
							onDelete={() => handleDirectionDelete(i)} />

					))}
					<button type="button" data-cy='add-dir-button' onClick={() => addField("steps")}>+ Add Step</button>

				</fieldset>
				{/* Submit button */}
				<div className="m-4">
					<button
						type="submit"
						className="m-4"
						data-cy='recipe-submit-button'
					>{recipe ? 'Update' : 'Add'} Recipe</button>
				</div>
			</form>
		</Card>
	);
}