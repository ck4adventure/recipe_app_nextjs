'use client'
import React from 'react'
import Image from 'next/image'

interface IngredientFieldProps {
	value: string;
	onChange: (value: string) => void;
	onDelete: () => void;
}

// IngredientField is just a text input for now and can be updated later to be in parts if needed
const IngredientField: React.FC<IngredientFieldProps> = ({ value, onChange, onDelete }) => {

	return (
		<div className='flex mb-2'>
			<input className='grow mr-2 border-b border-slate-300' type='text' value={value} onChange={e => onChange(e.target.value)} ></input>
			<button className='w-4' onClick={onDelete}><Image src='/trash.png' height={16} width={16} alt="delete button" /></button>
		</div>
	);
}

export default IngredientField;



