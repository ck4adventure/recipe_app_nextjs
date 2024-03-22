// RecipeForm is a client component that displays a form
// with a recipe title input and a select dropdown to choose a category
// it should manage the state and submit the form
'use client'
import { createRecipe } from "@/app/lib/actions";
import { useState } from "react";
import IngredientField from "./ingredient_field";
import { act } from "react-dom/test-utils";

export const RecipeForm = ({ categoryRows }: { categoryRows: any }) => {
	const [recipeTitle, setRecipeTitle] = useState<string>('');
	const [categoryID, setCategoryID] = useState<number>(1);
	const [ingredients, setIngredients] = useState<string[]>(['','']);

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

	const addField = () => {
		setIngredients([...ingredients, '']);
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const actualIngredients = ingredients.filter(ingr => ingr.length > 0);
		await createRecipe(recipeTitle, categoryID, actualIngredients);
	};

	return (
		<div>
			<h1 className="m-4">Add Recipe</h1>
			<form data-cy='add-recipe-form' className="m-4 flex flex-col" onSubmit={handleSubmit}>
				{/* Recipe Title */}
				<div className="m-4">
					<label htmlFor="recipe-title">Recipe Title
						<input
							id="recipe-title"
							data-cy='recipe-title-input'
							className="border-b border-slate-300"
							onChange={e => setRecipeTitle(e.target.value)}
							value={recipeTitle}>
						</input>
					</label>
				</div>
				{/* Category Select */}
				<div className="m-4">
					<label htmlFor="category-select">Category
						<select
							id="category-select"
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
				<fieldset className='my-2'>Ingredients
					{ingredients.map((ingredient, i) => (
						<IngredientField
							key={i}
							value={ingredient}
							onChange={(value) => handleIngredientChange(i, value)}
							onDelete={() => handleIngredientDelete(i)} />
					))}
					<button type="button"  data-cy='add-ingr-button' onClick={addField}>+ Add Ingredient</button>
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