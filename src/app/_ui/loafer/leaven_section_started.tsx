'use client'
import { LeavenFormData } from "@/app/_lib/actions";
import { Box, Paper, Typography } from "@mui/material"
import { QueryResultRow } from "pg";
import { useState, useEffect } from 'react'

export default function LeavenDisplaySection({record}: {record: QueryResultRow}) {
	// State to hold the elapsed time
	const [elapsedTime, setElapsedTime] = useState<string>("");

	// function to calculate elapsed time
	const calculateElapsedTime = (startDate: string) => {
		const start = new Date(startDate);
		const now = new Date();
		const durationMS = now.getTime() - start.getTime();
		const hours = Math.floor(durationMS / (1000 * 60 * 60));
		const minutes = Math.floor((durationMS % (1000 * 60 * 60)) / (1000 * 60));
		return `${hours}:${minutes}`
	}

	// Set up timer to update elapsed time every minute
	useEffect(() => {
		// define function to call
		const updateElapsedTime = () => {
			setElapsedTime(calculateElapsedTime(record.start_time));
		};

		// call it once to start
		updateElapsedTime();

		// Update every minute
		const intervalId = setInterval(updateElapsedTime, 60000);

		// Clean up interval on component unmount
		return () => clearInterval(intervalId);
	}, [record.start_time]);
	
	return (
		<Paper sx={{ width: '75%', margin: 2 }} elevation={6} className="">
			<Box sx={{ display: 'flex', flexDirection: 'column', margin: 2, minHeight: 200 }}>
				<Typography variant='h5' sx={{ marginLeft: 2 }}>Leaven</Typography>
				<Box sx={{ margin: 2 }}>
					<Typography color="gray">Water: {record.water_amt}ml</Typography>
					<Typography color="gray">Water Temp: {record.water_temp}F</Typography>
					<Typography color="gray">Starter: {record.starter_amt}g</Typography>
					<Typography color="gray">Flour Blend: {record.flour_amt}g</Typography>
					<Typography color="gray">Time Started: {new Date(record.start_time).toLocaleTimeString()}</Typography>
				</Box>
				<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					<div>Elapsed Time: {elapsedTime}</div>
				</Box>
			</Box>
		</Paper>
	);
}