'use client'
import { finishLeaven } from "@/app/_lib/actions";
import { Box, Paper, Typography, Button, Link, TextField, FormControl } from "@mui/material"
import Grid from "@mui/material/Grid2"
import { QueryResultRow } from "pg";
import { useState, useEffect } from 'react'
import { calculateElapsedTime } from "./components";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { LeavenFormData } from "@/app/_lib/definitions";



export default function LeavenDisplaySection({ record }: { record: QueryResultRow }) {
	// State to hold the elapsed time
	const isComplete = Boolean(record.end_time);
	const [elapsedTime, setElapsedTime] = useState<string>("");
	const [formData, setFormData] = useState<LeavenFormData>({
		id: record.id,
		water_amt: record.water_amt,
		water_temp: record.water_temp,
		starter_amt: record.starter_amt,
		flour_amt: record.flour_amt,
		start_time: record.start_time,
		start_temp: record.start_temp,
		end_time: record.end_time || dayjs().toString(),
		end_temp: record.end_temp || record.start_temp,
	})

	// Set up timer to update elapsed time every minute
	useEffect(() => {
		// define function to call
		const updateElapsedTime = () => {
			setElapsedTime(calculateElapsedTime(formData.start_time, formData.end_time || null));
		};
		// call it once to start
		updateElapsedTime();

		// Update every minute
		const intervalId = setInterval(updateElapsedTime, 60000);

		// Clean up interval on component unmount
		return () => clearInterval(intervalId);
	}, [record.start_time, record.end_time]);

	const handleTimeChange = (v: Dayjs | null, name: string) => {
		if (v) {
			setFormData({
				...formData,
				[name]: v.toString(),
			});
		}
	}
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

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		console.log("data to be submitted: ", formData)
		finishLeaven(record.id, formData.end_time || "", formData.end_temp || null)
	}

	return (
		<Paper elevation={6} sx={{ width: '90%' }}>
			<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} margin={{ xs: 4, md: 4 }} >
				<Grid size={{ xs: 4, sm: 8, md: 12 }} display='flex' flexDirection='column' alignItems='center'>
					<Typography>Leaven #{record.id}</Typography>
				</Grid>
				<Grid size={{ xs: 4, sm: 8, md: 12 }} display='flex' flexDirection='row' justifyContent='center'>
					<Typography sx={{marginX: 2}}>Time: {elapsedTime}</Typography>
					<Typography sx={{marginX: 2}}>Amount: {formData.water_amt + formData.flour_amt + formData.starter_amt}g</Typography>
				</Grid>
				<Grid size={{ xs: 4, sm: 4, md: 4 }}>
					<FormControl>
						<TextField sx={{ width: 200 }} type="number" label="Water (ml)" value={formData.water_amt} variant="outlined" disabled id="water_amt" name="water_amt" />
					</FormControl>
				</Grid>
				<Grid size={{ xs: 4, sm: 4, md: 4 }}>
					<FormControl>
						<TextField sx={{ width: 200 }} type="number" label="Water Temp (F)" value={formData.water_temp} disabled id="water_temp" name="water_temp" />
					</FormControl>
				</Grid>
				<Grid size={{ xs: 4, sm: 4, md: 4 }}>
					<FormControl>
						<TextField sx={{ width: 200 }} type="number" label="Starter (g)" value={formData.starter_amt} disabled id="starter_amt" name="starter_amt" />
					</FormControl>
				</Grid>
				<Grid size={{ xs: 4, sm: 4, md: 4 }}>
					<FormControl>
						<TextField sx={{ width: 200 }} type="number" label="Flour Blend (g)" value={formData.flour_amt} disabled id="flour_amt" name="flour_amt" />
					</FormControl>
				</Grid>

				<Grid size={{ xs: 4, sm: 4, md: 4 }}>
					<FormControl >
						<TextField sx={{ width: 200 }} type="number" label="Room Temp Start(F)" value={formData.start_temp} disabled id="start_temp" name="start_temp" />
					</FormControl>
				</Grid>
				<Grid size={{ xs: 4, sm: 4, md: 4 }}>
					<DateTimePicker
						label="Start Time"
						disabled
						value={dayjs(formData.start_time)}
						views={['month', 'day', 'hours', 'minutes']}
					/>
				</Grid>
				<Grid size={{ xs: 4, sm: 4, md: 4 }}>
					<FormControl >
						<TextField disabled={isComplete} sx={{ width: 200 }} type="number" label="Room Temp End(F)" value={formData.end_temp} onChange={handleChange} id="end_temp" name="end_temp" />
					</FormControl>
				</Grid>
				<Grid size={{ xs: 4, sm: 4, md: 4 }}>
					<DateTimePicker
						label="End Time"
						disabled={isComplete}
						onChange={(v) => handleTimeChange(v, "end_time")}
						value={dayjs(formData.end_time)}
						views={['month', 'day', 'hours', 'minutes']}
					/>
				</Grid>


				{!isComplete && <Grid size={{ xs: 4, sm: 8, md: 12 }} display={'flex'} justifyContent={'center'}>
					<Button type="submit" onClick={handleSubmit}>Finish Leaven</Button>
				</Grid>}
			</Grid>
		</Paper >

	);
}

// {!record.end_time && <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
// 	<Button onClick={() => updateLeavenEndTime(record.id, new Date().toISOString())}>Finish Leaven</Button>
// </Box>}


// {record.end_time && <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
// 	{/* <Button variant="contained">Next up: Dough!</Button> */}
// 	<Link href="/loafer/dough/new" underline="none">Next up: Start some dough</Link>
// </Box>}