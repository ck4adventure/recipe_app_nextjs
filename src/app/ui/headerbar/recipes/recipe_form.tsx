// RecipeForm is a client component that displays a form
// with a recipe title input and a select dropdown to choose a category
// it should manage the state and submit the form
'use client'
import { createRecipeAndRedirect } from "@/app/lib/actions";
import { useState } from "react";
import IngredientField from "./ingredient_field";
import DirectionField from "./direction_field";

export const RecipeForm = ({ categoryRows }: { categoryRows: any }) => {
	const [recipeTitle, setRecipeTitle] = useState<string>('');
	const [categoryID, setCategoryID] = useState<number>(1);
	const [ingredients, setIngredients] = useState<string[]>(['', '']);
	const [directions, setDirections] = useState<string[]>(['', '',]);

	const addField = (type: 'ingredients' | 'directions') => {
		if (type === 'directions') {
			setDirections([...directions, '']);
		}
		setIngredients([...ingredients, '']);
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
		const newDirections = [...directions];
		newDirections[index] = value;
		setDirections(newDirections);
	}

	const handleDirectionDelete = (index: number) => {
		const newDirections = [...directions];
		newDirections.splice(index, 1);
		setDirections(newDirections);
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const actualIngredients = ingredients.filter(ingr => ingr.length > 0);
		const actualDirections = directions.filter(dir => dir.length > 0);
		await createRecipeAndRedirect(recipeTitle, categoryID, actualIngredients, actualDirections);
	};

	return (
		<div>
			<h1 className="my-2 font-bold">Add Recipe</h1>
			<form data-cy='add-recipe-form' className="my-4 flex flex-col justify-center" onSubmit={handleSubmit}>
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
					<label htmlFor="category-select">Category
						<select
							id="category-select"
							className="w-[150px]"
							onChange={e => setCategoryID(parseInt(e.target.value))}
							data-cy='recipe-category-select'
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
				{/* Ingredients Section */}
				<fieldset className='my-4'>Ingredients
					{ingredients.map((ingredient, i) => (
						<IngredientField
							key={i}
							value={ingredient}
							onChange={(value) => handleIngredientChange(i, value)}
							onDelete={() => handleIngredientDelete(i)} />
					))}
					<button type="button" data-cy='add-ingr-button' onClick={() => addField("ingredients")}>+ Add Ingredient</button>
				</fieldset>
				{/* Directions Section */}
				<fieldset className='my-4'>Directions
					{directions.map((direction, i) => (
						<DirectionField
							key={i}
							value={direction}
							onChange={(value) => handleDirectionChange(i, value)}
							onDelete={() => handleDirectionDelete(i)} />

					))}
					<button type="button" data-cy='add-dir-button' onClick={() => addField("directions")}>+ Add Step</button>

				</fieldset>
				{/* Submit button */}
				<div className="m-4">
					<button
						type="submit"
						className="m-4"
						data-cy='recipe-submit-button'
					>Create Recipe</button>
				</div>
			</form>
		</div>
	);
}