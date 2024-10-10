'use client'
import { useState } from "react"
import dayjs, { Dayjs } from 'dayjs';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { FormControl, FormLabel, FormControlLabel, TextField, Typography, Button } from '@mui/material';

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { TimeField } from "@mui/x-date-pickers";

import { LeavenFormData } from '@/app/_lib/definitions';


// LeavenFormSection only deals with the data timestemps for creating the leaven
export default function LeavenFormSection({ createLeavenLogAction }: { createLeavenLogAction: (formData: LeavenFormData) => void }) {

	const [formData, setFormData] = useState({
		water_amt: 200,
		water_temp: 80,
		starter_amt: 30,
		flour_amt: 200,
		start_time: dayjs().toString(),
		start_temp: 80
	})

	// const handleSetNow = (fieldName: string) => {
	// 	const now = new Date();
	// 	setFormData({
	// 		...formData,
	// 		[fieldName]: now,
	// 	});
	// };

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		let v;
		let { name, value } = e.target;
				if (name === 'water_amt' || name === 'water_temp' || name === 'starter_amt' || name === 'flour_amt' || name === 'start_temp') {
			 v = Number(value)
		} else {
			v = value
		}
		setFormData({
			...formData,
			[name]: v
		})
	}

	const handleTimeChange = (v: Dayjs | null) => {
		if (v) {
			setFormData({
				...formData,
				"start_time": v.toString(),
			});
		}
	}


	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		console.log("data to be submitted: ", formData)
		createLeavenLogAction(formData)
	}

	return (
		<Paper sx={{ width: '75%', margin: 2 }} elevation={6} className="">
			<Box component={"form"} onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', margin: 2, minHeight: 200 }}>
				<Typography variant='h5' sx={{ margin: 2 }}>Leaven</Typography>
				{/* <Typography sx={{ margin: 2 }} variant='body2'>1 TBL Starter + 200g Flour Blend + 200g Water</Typography> */}
				<Box sx={{ display: 'flex', flexDirection: 'row', margin: 2 }}>
					<FormControl sx={{ minWidth: 90, width: 150 }}>
						<TextField type="number" label="Water (ml)" value={formData.water_amt} variant="outlined" onChange={handleChange} id="water_amt" name="water_amt" />
					</FormControl>
					<FormControl sx={{ minWidth: 90, width: 150 }}>
						<TextField type="number" label="Water Temp (F)" value={formData.water_temp} onChange={handleChange} id="water_temp" name="water_temp" />
					</FormControl>
					<FormControl sx={{ minWidth: 90, width: 150 }}>
						<TextField type="number" label="Starter (g)" value={formData.starter_amt} onChange={handleChange} id="starter_amt" name="starter_amt" />
					</FormControl>
					<FormControl sx={{ minWidth: 90, width: 150 }}>
						<TextField type="number" label="Flour Blend (g)" value={formData.flour_amt} onChange={handleChange} id="flour_amt" name="flour_amt" />
					</FormControl>
				</Box>
				<Box sx={{ display: 'flex', margin: 2, alignItems: 'center' }}>
					<TimePicker
						label="Start Time"
						onChange={(value) => handleTimeChange(value)}
						value={dayjs(formData.start_time)}
					/>
					<FormControl sx={{ minWidth: 90, width: 150 }}>
						<TextField type="number" label="Room Temp Start(F)" value={formData.start_temp} onChange={handleChange} id="start_temp" name="start_temp" />
					</FormControl>
				</Box>
				<Box sx={{ margin: 2, display: 'flex', justifyContent: "center" }}>
					<Button type="submit">Save Leaven</Button>
				</Box>
			</Box>
		</Paper>
	);
}