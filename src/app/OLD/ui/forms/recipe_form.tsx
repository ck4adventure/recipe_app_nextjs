'use client'
import React, { useState } from 'react'
import IngredientField from './ingredient_field'
import DirectionField from './direction_field'
// RecipeForm should display a form with dynamic fields
// ingredients is a list of strings
// steps is a list of strings
// handleChange, handleDelete
const RecipeForm: React.FC = () => {
	const [name, setName] = useState<string>('')
	const [source, setSource] = useState<string>('')
	const [notes, setNotes] = useState<string>('')
	const [ingredients, setIngredients] = useState<string[][]>([['','',''], ['','',''], ['','','']])
	const [steps, setDirections] = useState<string[]>(['', '', ''])

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
		newIngredients[index] = ingrArray;
		setIngredients(newIngredients);
	};

	const handleIngredientDelete = (index: number) => {
		const newIngredients = [...ingredients];
		newIngredients.splice(index, 1);
		setIngredients(newIngredients);
	};

	const handleDirectionChange = (index: number, value: string) => {
		const newDirections = [...steps];
		newDirections[index] = value;
		setDirections(newDirections);
	};

	const handleDirectionDelete = (index: number) => {
		const newDirections = [...steps]
		newDirections.splice(index, 1);
		setDirections(newDirections);
	};
	// addField simply appends a blank string onto the array
	// code will loop it for display later
	const addField = (type: 'ingredient' | 'direction') => {
		if (type === 'ingredient') {
			setIngredients([...ingredients, []])
		} else {
			setDirections([...steps, ''])
		}
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		// validation goes here

		// for now just display the recipe
		const displayIngredients = ingredients.filter(ingr => ingr.length > 0).map(ingr => ingr.join(' '));
		const displayDirections = steps.filter(dir => dir.length > 0);
		const recipe = {
			name: name,
			notes: notes,
			ingredients: displayIngredients,
			steps: displayDirections,
		}
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
					<label htmlFor='notes' >Notes</label>
					<input className='flex-grow border-b border-slate-300' id='notes' onChange={e => setNotes(e.target.value)} value={notes}></input>
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
					{steps.map((direction, i) => (
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