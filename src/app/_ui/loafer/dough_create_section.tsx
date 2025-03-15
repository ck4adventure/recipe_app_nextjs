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
import Grid from "@mui/material/Grid2";


import { DoughFormData } from "@/app/loafer/definitions";
import { FlourBlend } from "@/app/loafer/definitions";

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
		<Paper elevation={6} sx={{ width: '90%' }}>
			<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} margin={{ xs: 4, md: 4 }} >
				<Grid size={{ xs: 4, sm: 8, md: 12 }} display='flex' flexDirection='column' alignItems='center'>
					<Typography>Make some Dough</Typography>
				</Grid>
				<Grid size={{ xs: 4, sm: 4, md: 4 }}>
					<FormControl>
						<TextField sx={{ width: 200 }} type="number" label="Water (ml)" value={formData.water_amt} variant="outlined" onChange={handleChange} id="water_amt" name="water_amt" />
					</FormControl>
				</Grid>
				<Grid size={{ xs: 4, sm: 4, md: 4 }}>
					<FormControl>
						<TextField sx={{ width: 200 }} type="number" label="Water Temp (F)" value={formData.water_temp} onChange={handleChange} id="water_temp" name="water_temp" />
					</FormControl>
				</Grid>
				<Grid size={{ xs: 4, sm: 4, md: 4 }}>
					<FormControl>
						<TextField sx={{ width: 200 }} type="number" label="Leaven(g)" value={formData.leaven_amt} onChange={handleChange} id="leaven_amt" name="leaven_amt" />
					</FormControl>
				</Grid>
				<Grid size={{ xs: 4, sm: 4, md: 4 }}>
					<FormControl>
						<TextField sx={{ width: 200 }} type="number" label="Flour Amt (g)" value={formData.flour_amt} onChange={handleChange} id="flour_amt" name="flour_amt" />
					</FormControl>
				</Grid>
				<Grid size={{ xs: 4, sm: 4, md: 4 }}>
					<FormControl>
						<InputLabel id="flour_blend_label">Flour Blend</InputLabel>
						<Select
							labelId="flour_blend_label"
							id="flour_blend_label"
							value={formData.flour_blend}
							label="Flour Blend"
							onChange={handleSelectChange}
							sx={{width: 200}}
						>
							{Object.values(FlourBlend).map((blend) => (
								<MenuItem key={blend} value={blend}>
									{blend[0].toUpperCase() + blend.slice(1)}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>


				<Grid size={{ xs: 4, sm: 4, md: 4 }}>
					<FormControl >
						<TextField sx={{ width: 200 }} type="number" label="Room Temp Start(F)" value={formData.start_temp} onChange={handleChange} id="start_temp" name="start_temp" />
					</FormControl>
				</Grid>
				<Grid size={{ xs: 4, sm: 4, md: 4 }}>
					<DateTimePicker
						label="Start Time"
						onChange={(value) => handleTimeChange(value)}
						value={dayjs(formData.start_time)}
						views={['month', 'day', 'hours', 'minutes']}
					/>
				</Grid>

				<Grid size={{ xs: 4, sm: 8, md: 12 }} display={'flex'} justifyContent={'center'}>
					<Button type="submit" onClick={handleSubmit}>Save Dough</Button>
				</Grid>
			</Grid>
		</Paper >
	);
}