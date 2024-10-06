'use client'
import { useState } from 'react'
import { shorthandDate } from "../../../../lib/formatters"
import { TurnsForm } from "@/app/ui/loafer/components"

import dayjs, { Dayjs } from 'dayjs';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

// create an enum to hold the available loaf type options
enum LoafType {
	White = "White",
	Cottage = "Cottage",
	Wheat = "Wheat",
	Rye = "Rye",
	Complet = "Complet",
	Integraal = "Integraal"
}

interface ModalProps {
	isOpen: boolean;
	onSaveClose: () => void;
	onClose: () => void;
	children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onSaveClose, onClose, children }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 ">
			<div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
			<div className="flex flex-col justify-between bg-white p-4 rounded shadow-lg z-10 min-h-[200px] min-w-[400px]">
				{children}
				<div className='flex justify-between items-center'>
					<button onClick={onClose}>Discard</button>
					<button onClick={onSaveClose} className="">Save and Close</button>
				</div>
			</div>
		</div>
	);
};


export const LoaferForm = (params: any) => {
	const data = params.data;

	// some, all or none of this info may be present, user will visit at least twice
	const [formData, setFormData] = useState({
		leaven_start_time: data.leaven_start_time || '',
		loaf_type: data.loaf_type || 'cottage',
		dough_water_ml: 700,
		dough_water_temp: 80,
		dough_flour_grams: 1000,
		dough_start_time: data.dough_start_time || '',
	})
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [selectedDateTime, setSelectedDateTime] = useState<Dayjs | null>(null);
	const [currentField, setCurrentField] = useState<string>('');

	const openModal = (fieldName: string) => {
		setCurrentField(fieldName);
		setModalIsOpen(true);
	};

	const closeModal = () => {
		setSelectedDateTime(null);
		setModalIsOpen(false);
	};

	const handleModalDateTimeChange = (dateTime: Dayjs | null) => {
		setSelectedDateTime(dateTime);
	};

	const handleModalSave = () => {
		if (selectedDateTime && currentField) {
			setFormData({
				...formData,
				[currentField]: selectedDateTime,
			});
		}
		closeModal();
	};

	const handleSetNow = (fieldName: string) => {
		const now = new Date();
		setFormData({
			...formData,
			[fieldName]: now,
		});
	};

	const handleClearDateTime = (fieldName: string) => {
		setFormData({
			...formData,
			[fieldName]: '',
		})
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		let { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value
		})
	}

	const ButtonOrTimestamp = ({ ts, propertyName }: { ts: string; propertyName: string }) => {
		if (ts) {
			const date = new Date(ts)
			return (
				<div className='flex justify-center items-center'>
					<div>Completed At: {date.toLocaleTimeString()}</div>
					<div className='flex justify-end m-2'>
						<button className='text-sm m-2' onClick={() => openModal(propertyName)}>Edit</button>
					</div>
				</div>
			);
		} else {
			return (
				<div className='flex justify-center items-center'>
					<div>Completed At: In progress</div>
					<div className='bg-indigo-400 m-2 rounded-lg'>
						<button onClick={() => handleSetNow(propertyName)}>Done!</button>
					</div>
				</div>
			);
		}
	};
	return (
		<div className="flex flex-col items-center">
			<Typography variant='h4' sx={{ margin: 2 }}>Bake #{data.id}</Typography>
			<Paper sx={{ width: '75%', margin: 2 }} elevation={6} className="">
				<Typography variant='h5' sx={{ margin: 2 }}>Leaven</Typography>
				<Typography sx={{ margin: 2 }} variant='body2'>1 TBL Starter + 200g Flour Blend + 200g Water</Typography>
				<div className="flex min-h-max justify-between ml-4">
					<ButtonOrTimestamp ts={formData.leaven_start_time} propertyName="leaven_start_time" />
					<button onClick={() => handleClearDateTime("leaven_start_time")} className='m-4'>Reset Step</button>
				</div>
				<div>
					<Modal isOpen={modalIsOpen} onClose={closeModal} onSaveClose={handleModalSave} >
						<div>Set a new date / time</div>
						<div>
							<DateTimePicker value={dayjs(formData.leaven_start_time)} onChange={handleModalDateTimeChange} />
						</div>
					</Modal>
				</div>
			</Paper>
			<Paper sx={{ width: '75%', margin: 2 }} elevation={6} >
				<Typography variant='h5' sx={{ margin: 2 }}>Dough</Typography>
				<div className="m-4">
					<div className="flex items-center">
						<label htmlFor="loaf_type">Loaf Type</label>
						<select
							id="loaf_type"
							name="loaf_type"
							value={formData.loaf_type}
							onChange={handleChange}
						>
							<option value="">Select a type</option>
							{Object.values(LoafType).map((type) => (
								<option key={type} value={type}>
									{type}
								</option>
							))}
						</select>
						{/* <div className="m-2">900g Unbleached Bread Flour + 100g Whole Wheat Flour</div> */}
					</div>

					<div className="flex flex-col">
						<div className='flex items-center'>
							<label id="dough_water_ml">Water (ml)</label>
							<input type='number' value={formData.dough_water_ml} onChange={handleChange} name='dough_water_ml' />
						</div>
						<div className="flex items-center">
							<label>Water Temp (F)</label>
							<input type='number' value={formData.dough_water_temp} onChange={handleChange} name="dough_water_temp" />
						</div>
						<div className="flex items-center">
							<label>Total Flour (g)</label>
							<input type='number' value={formData.dough_flour_grams} onChange={handleChange} name='dough_flour_grams' />
						</div>
					</div>
				</div>

				<div className="flex justify-between items-center ml-4">
					<ButtonOrTimestamp ts={formData.dough_start_time} propertyName="dough_start_time" />
					<button onClick={() => handleClearDateTime("dough_start_time")} className='m-4'>Reset Step</button>
				</div>
				
				<div>
					<Modal isOpen={modalIsOpen} onClose={closeModal} onSaveClose={handleModalSave} >
						<div>Set a new date / time</div>
						<div>
							<DateTimePicker value={dayjs(formData.dough_start_time)} onChange={handleModalDateTimeChange} />
						</div>
					</Modal>
				</div>
			</Paper>

		</div>
	)
}



			// <Paper elevation={6} className="flex flex-col w-7/8 m-4">
			// 	<div className="m-2 font-semibold">Salt the Loaf</div>
			// 	<div className="m-2">20g Salt + 50g Water</div>
			// 	<div className="flex">
			// 		<div className="m-2">Salt Dough: {shorthandDate(data.dough_creation_time)}</div>
			// 		<div className="m-2">Water Temp: 78F</div>
			// 	</div>
			// </Paper>
			// <Paper elevation={6} className="flex flex-col w-7/8 m-4">
			// 	<div className="m-2 font-semibold">Turns</div>
			// 	{/* <TurnsForm /> */}
			// </Paper>
			// <Paper elevation={6} className="flex flex-col w-7/8 m-4">
			// 	<div className="m-2 font-semibold">Divide and Rest</div>
			// 	<div className="flex">
			// 		<div className="m-2">Rest Start Time: {shorthandDate(data.bench_rest_start_time)}</div>
			// 		<div className="m-2">Room Temp 72F</div>
			// 	</div>
			// 	<div className="flex">
			// 		<div className="m-2">Rest End Time: {shorthandDate(data.bench_rest_start_time)}</div>
			// 		<div className="m-2">Room Temp 70F</div>
			// 	</div>
			// </Paper>
			// <Paper elevation={6} className="flex flex-col w-7/8 m-4">
			// 	<div className="m-2 font-semibold">Shape and Prove</div>
			// 	<div className="flex">
			// 		<div className="m-2">
			// 			<div className="">Loaf 1: Oblong</div>
			// 			<div className="">Loaf 1 Prove Start: {shorthandDate(data.shaped_prove_start_time)}</div>
			// 			<div className="">Room Temp 72F</div>
			// 		</div>
			// 		<div className="m-2">
			// 			<div className="">Loaf 2: Round</div>
			// 			<div className="">Loaf 2 Prove Start: {shorthandDate(data.shaped_prove_start_time)}</div>
			// 			<div className="">Room Temp 72F</div>
			// 		</div>
			// 	</div>

			// </Paper>
			// <Paper elevation={6} className="flex flex-col w-7/8 m-4">
			// 	<div className="m-2 font-semibold">Bake</div>
			// 	<div className="flex">
			// 		<div className="m-2">
			// 			<div>Loaf 1</div>
			// 			<div>Bake Start: {shorthandDate(data.bake_start_time)}</div>
			// 			<div>Bake End: {shorthandDate(data.bake_end_time)}</div>
			// 		</div>
			// 		<div className="m-2">
			// 			<div>Loaf 2</div>
			// 			<div>Bake Start: {shorthandDate(data.bake_start_time)}</div>
			// 			<div>Bake End: {shorthandDate(data.bake_end_time)}</div>
			// 		</div>
			// 	</div>
			// </Paper>