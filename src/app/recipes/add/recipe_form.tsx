'use client'
import React, { useState } from 'react'
import IngredientField from '@/app/ui/ingredient_field'
import DirectionField from '@/app/ui/direction_field'
// RecipeForm should display a form with dynamic fields
// ingredients is a list of strings
// directions is a list of strings
// handleChange, handleDelete
const RecipeForm: React.FC = () => {
	const [name, setName] = useState<string>('')
	const [description, setDescription] = useState<string>('')
	const [ingredients, setIngredients] = useState<string[][]>([['','',''], ['','',''], ['','','']])
	const [directions, setDirections] = useState<string[]>(['', '', ''])

	// change and delete are standard object manipulations
	// good patterns to know
	const handleIngredientChange = (index: number, type: string, value: string) => {
		const newIngredients = [...ingredients];
		const ingrArray = newIngredients[index];
		if (type === 'measure') { 
			ingrArray[0] = value;
		} else if (type === 'unit') {
			ingrArray[1] = value;
		} else if (type === 'ingredient') {
			ingrArray[2] = value;
		}
		console.log(ingrArray)
		newIngredients[index] = ingrArray;
		setIngredients(newIngredients);
	};

	const handleIngredientDelete = (index: number) => {
		const newIngredients = [...ingredients];
		newIngredients.splice(index, 1);
		setIngredients(newIngredients);
	};

	const handleDirectionChange = (index: number, value: string) => {
		const newDirections = [...directions];
		newDirections[index] = value;
		setDirections(newDirections);
	};

	const handleDirectionDelete = (index: number) => {
		const newDirections = [...directions]
		newDirections.splice(index, 1);
		setDirections(newDirections);
	};
	// addField simply appends a blank string onto the array
	// code will loop it for display later
	const addField = (type: 'ingredient' | 'direction') => {
		if (type === 'ingredient') {
			setIngredients([...ingredients, []])
		} else {
			setDirections([...directions, ''])
		}
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		const displayIngredients = ingredients.filter(ingr => ingr.length > 0).map(ingr => ingr.join(' '));

		const recipe = {
			name: name,
			description: description,
			ingredients: displayIngredients,
			directions: directions
		}
		console.log(recipe)

	}

	return (
		<div className='flex flex-col items-center'>
			<h2>Add a Recipe</h2>
			<form className='flex flex-col' style={{width: "700px"}} onSubmit={handleSubmit}>
				<div className='my-2 flex'>
					<label htmlFor='name' >Name</label>
					<input className='flex-grow border-b border-slate-300' id='name' onChange={e => setName(e.target.value)} value={name}></input>
				</div>
				<div className='my-2 flex'>
					<label htmlFor='description' >Description</label>
					<input className='flex-grow border-b border-slate-300' id='description' onChange={e => setDescription(e.target.value)} value={description}></input>
				</div>
				<fieldset className='my-2'>Ingredients
					{ingredients.map((ingredient, i) => (
						<IngredientField
							key={i}
							value={ingredient}
							onChange={(type, value) => handleIngredientChange(i, type, value)}
							onDelete={() => handleIngredientDelete(i)} />
					))}
					<button onClick={() => addField('ingredient')}>+ Add Ingredient</button>
				</fieldset>
				<fieldset className='my-2'>Directions
					{directions.map((direction, i) => (
						<DirectionField
							key={i}
							ordinal={i + 1}
							value={direction}
							onChange={(value) => handleDirectionChange(i, value)}
							onDelete={() => handleDirectionDelete(i)}
						/>
					))}
					<button onClick={() => addField('direction')}>+ Add Step</button>
				</fieldset>
				<button className='m-4' type='submit'>Create Recipe</button>
			</form>
		</div>
	);
}

export default RecipeForm;