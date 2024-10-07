'use client'
import { useState } from "react"
import dayjs, { Dayjs } from 'dayjs';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { FormControl, FormLabel, Typography } from '@mui/material';

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import { Modal } from "./basic_modal";


// LeavenFormSection only deals with the data timestemps for creating the leaven
export default function LeavenFormSection({ createLeavenLogAction }: { createLeavenLogAction: (formData: FormData) => void }) {

	// import a server action to save the leaven data and connect it to a button on the leaven section

	// some, all or none of this info may be present, user will visit at least twice
	const [formData, setFormData] = useState({
		leaven_start_time: '',
		leaven_water_ml: 20,
		leaven_water_temp: 80,
		leaven_starter_grams: 30,
		leaven_flour_grams: 200,
		leaven_end_time: '',
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

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		let { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value
		})
	}


	const handleSubmit = async () => {
		console.log("data to be submitted: ", formData)
		const id = await createLeavenLogAction()
	}


	const handleClearDateTime = (fieldName: string) => {
		setFormData({
			...formData,
			[fieldName]: '',
		})
	};



	return (
		<Paper sx={{ width: '75%', margin: 2 }} elevation={6} className="">
			<Box component={"form"} onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
				<Typography variant='h5' sx={{ margin: 2 }}>Leaven</Typography>
				<Typography sx={{ margin: 2 }} variant='body2'>1 TBL Starter + 200g Flour Blend + 200g Water</Typography>
				<FormControl>
					<FormLabel>Water Amt</FormLabel>
					<input type="number" min={0} />
				</FormControl>

				<div className="flex min-h-max justify-between ml-4">
					{/* <ButtonOrTimestamp ts={formData.leaven_start_time} propertyName="leaven_start_time" btnMessage='Start Leaven' /> */}
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
			</Box>
		</Paper>
	);
}