'use client'
import React from 'react'
import Image from 'next/image'

interface DirectionFieldProps {
	value: string;
	onChange: (value: string) => void;
	onDelete: () => void;
}

// DirectionField is just a text input, later will have ordinals
const DirectionField: React.FC<DirectionFieldProps> = ({ value, onChange, onDelete }) => {

	return (
		<div className='flex justify-between mb-2'>
			<input className='flex-grow mr-2 border-b border-slate-300' type='text' value={value} onChange={e => onChange(e.target.value)} ></input>
			<button className='w-4' onClick={onDelete}><Image src='/trash.png' height={16} width={16} alt="delete button" /></button>
		</div>
	);
}

export default DirectionField;



