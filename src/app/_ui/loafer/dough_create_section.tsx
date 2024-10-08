'use client'
import React, { useState } from "react"
import dayjs, { Dayjs } from 'dayjs';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { FormControl, FormLabel, InputLabel, TextField, Typography, Button, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { TimeField } from "@mui/x-date-pickers";

import { DoughFormData } from "@/app/_lib/definitions";
import { FlourBlend } from "@/app/_lib/definitions";


// LeavenFormSection only deals with the data timestemps for creating the leaven
export default function DoughCreateSection({ leavenID, createDoughAction }: { createDoughAction: (formData: DoughFormData) => void, leavenID: number }) {

	const [formData, setFormData] = useState<DoughFormData>({
		water_amt: 740,
		water_temp: 80,
		leaven_amt: 200,
		leaven_id: 1,
		flour_amt: 1000,
		flour_blend: FlourBlend.Cottage,
		start_time: dayjs().toString(),
		start_temp: 80
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		let { name, value } = e.target;
		let v;
		if (name === 'water_amt' || name === 'water_temp' || name === 'leaven_amt' || name === 'leaven_id' || name === 'flour_amt' || name === 'start_temp') {
			 v = Number(value)
		} else {
			v = value
		}
		setFormData({
			...formData,
			[name]: v
		})
	}

	const handleSelectChange = (event: SelectChangeEvent) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			"flour_blend": value
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
		createDoughAction(formData)
	}

	return (
		<Paper sx={{ width: '75%', margin: 2 }} elevation={6} className="">
			<Box component={"form"} onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', margin: 2, minHeight: 200 }}>
				<Typography variant='h5' sx={{ margin: 2 }}>Dough</Typography>
				<Box sx={{ display: 'flex', flexDirection: 'row', margin: 2 }}>
					<FormControl sx={{ minWidth: 90, width: 150 }}>
						<TextField type="number" label="Water (ml)" value={formData.water_amt} variant="outlined" onChange={handleChange} id="water_amt" name="water_amt" />
					</FormControl>
					<FormControl sx={{ minWidth: 90, width: 150 }}>
						<TextField type="number" label="Water Temp (F)" value={formData.water_temp} onChange={handleChange} id="water_temp" name="water_temp" />
					</FormControl>
					<FormControl sx={{ minWidth: 90, width: 150 }}>
						<TextField type="number" label="Starter (g)" value={formData.leaven_amt} onChange={handleChange} id="leaven_amt" name="leaven_amt" />
					</FormControl>
					<FormControl sx={{ minWidth: 90, width: 150 }}>
						<TextField type="number" label="Flour Amount (g)" value={formData.flour_amt} onChange={handleChange} id="flour_amt" name="flour_amt" />
					</FormControl>
					<FormControl sx={{ minWidth: 90, width: 150 }}>
						<InputLabel id="flour_blend_label">Flour Blend</InputLabel>
						<Select
							labelId="flour_blend_label"
							id="flour_blend_label"
							value={formData.flour_blend}
							label="Flour Blend"
							onChange={handleSelectChange}
						>
							{Object.values(FlourBlend).map((blend) => (
								<MenuItem key={blend} value={blend}>
									{blend}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>
				<Box sx={{ display: 'flex', margin: 2, alignItems: 'center' }}>
					<TimePicker
						label="Start Time"
						onChange={(value) => handleTimeChange(value)}
						value={dayjs(formData.start_time)}
					/>
				</Box>
				<Box sx={{ margin: 2, display: 'flex', justifyContent: "center" }}>
					<Button type="submit">Save Dough</Button>
				</Box>
			</Box>
		</Paper>
	);
}