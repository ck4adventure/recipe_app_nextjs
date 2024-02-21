import React from 'react'
import Image from 'next/image'

interface DirectionFieldProps {
	ordinal: number;
	value: string;
	onChange: (value: string) => void;
	onDelete: () => void;
}

// DirectionField is just a text input for now and can be updated later to be in parts if needed
const DirectionField: React.FC<DirectionFieldProps> = ({ ordinal, value, onChange, onDelete }) => {
	return (
		<div className='flex justify-between mb-2'>
			<label className='w-4'>{ordinal}  </label>
			<textarea className='flex-grow h-6 mx-2 border-b border-slate-300' value={value} onChange={e => onChange(e.target.value)} ></textarea>
			<button className='w-4' onClick={onDelete}><Image src='/trash.png' height={16} width={16} alt="delete button" /></button>
		</div>
	);
}

export default DirectionField;



