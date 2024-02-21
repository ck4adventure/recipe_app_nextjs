import React from 'react'
import Image from 'next/image'
import { BakingUnits } from '../lib/constants'

interface IngredientFieldProps {
	value: string[];
	onChange: (type: string, value: string) => void;
	onDelete: () => void;
}

// IngredientField is just a text input for now and can be updated later to be in parts if needed
const IngredientField: React.FC<IngredientFieldProps> = ({ value, onChange, onDelete }) => {
	const [measure, unit, ingredient] = value; 
	return (
		<div className='flex justify-between mb-2'>
			<input
				className='w-16 mr-2 border-b border-slate-300'
				type='number' min='0' value={measure}
				onChange={e => onChange("measure", e.target.value)} />
			<select className='mx-2 border-b border-slate-300' value={unit} onChange={e => onChange("unit", e.target.value)}>
				<option value=''>Select unit</option>
				{Object.keys(BakingUnits).map((unit, index) => (<option key={index} value={unit}>{BakingUnits[unit]}</option>))}
			</select>
			<input className='flex-grow mr-2 border-b border-slate-300' type='text' value={ingredient} onChange={e => onChange("ingredient", e.target.value)} ></input>
			<button className='w-4' onClick={onDelete}><Image src='/trash.png' height={16} width={16} alt="delete button" /></button>
		</div>
	);
}

export default IngredientField;



