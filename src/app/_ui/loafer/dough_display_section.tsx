'use client'
// import { updateLeavenEndTime } from "@/app/_lib/actions";
import { Box, Paper, Typography, Button, Link } from "@mui/material"
import { QueryResultRow } from "pg";
import { useState, useEffect } from 'react'
import { updateDoughSaltTime, updateDoughEndTime } from "@/app/loafer/actions";



export default function DoughDisplaySection({ record }: { record: QueryResultRow }) {
	// State to hold the elapsed time
	const [elapsedTime, setElapsedTime] = useState<string>("");

	// function to calculate elapsed time
	const calculateElapsedTime = (startDate: string, endDate: string | null) => {
		const start = new Date(startDate);
		const end = (endDate ? new Date(endDate) : new Date());
		const durationMS = end.getTime() - start.getTime();
		const hours = Math.floor(durationMS / (1000 * 60 * 60)).toString();
		const minutes = Math.floor((durationMS % (1000 * 60 * 60)) / (1000 * 60)).toString();
		const displayMinutes = (minutes.length < 2 ? "0" + minutes : minutes)
		return `${hours}:${displayMinutes}`
	}

	// Set up timer to update elapsed time every minute
	useEffect(() => {
		// define function to call
		const updateElapsedTime = () => {
			setElapsedTime(calculateElapsedTime(record.start_time, record.end_time));
		};

		// call it once to start
		updateElapsedTime();

		// Update every minute
		const intervalId = setInterval(updateElapsedTime, 60000);

		// Clean up interval on component unmount
		return () => clearInterval(intervalId);
	}, [record.start_time, record.end_time]);


	return (
		<Paper sx={{ width: '75%', margin: 2 }} elevation={6} className="">
			<Box sx={{ display: 'flex', flexDirection: 'column', margin: 2, minHeight: 200 }}>
				<Typography variant='h5' sx={{ marginLeft: 2 }}>Dough</Typography>
				<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<Box sx={{ margin: 2 }}>
						<Typography color="gray">Water: {record.water_amt}ml</Typography>
						<Typography color="gray">Water Temp: {record.water_temp}F</Typography>
						<Typography color="gray">Leaven: {record.leaven_amt}g</Typography>
						<Typography color="gray">Flour Blend: {record.flour_blend}</Typography>
						<Typography color="gray">Flour Amt: {record.flour_amt}g</Typography>
						<Box sx={{ display: 'flex' }}>
							<Typography color="gray" sx={{ marginRight: 2 }}>Time Started: {new Date(record.start_time).toLocaleTimeString()}</Typography>
							<Typography color="gray" >Room Temp: {record.start_temp}F</Typography>
						</Box>
						<Box sx={{ display: 'flex' }}>
							<Typography color="gray" sx={{ marginRight: 2 }}>
								{record.salt_time ? `Time Salted: ${new Date(record.salt_time).toLocaleTimeString()}` : "Not Yet Salted"}
							</Typography>
							<Typography color="gray" >Room Temp: {record.salt_temp ? record.salt_temp : 'NA '}F</Typography>
						</Box>
						<Box sx={{ display: 'flex' }}>
							<Typography color="gray" sx={{ marginRight: 2 }}>
								{record.end_time ? `Time Finished: ${new Date(record.end_time).toLocaleTimeString()}` : "Not Yet Finished"}
							</Typography>
							<Typography color="gray" >Room Temp: {record.end_temp ? record.end_temp : 'NA '}F</Typography>
						</Box>
					</Box>
					<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '150px', width: '250px', padding: 4 }}>
						<div>Elapsed Time {elapsedTime}</div>
					</Box>
				</Box>
				{!record.salt_time && <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					<Button onClick={() => updateDoughSaltTime(record.id, new Date().toISOString())}>Mark Dough Salted</Button>
				</Box>}
				{record.salt_time && !record.end_time && <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					<Button onClick={() => updateDoughEndTime(record.id, new Date().toISOString())}>Finish Dough</Button>
				</Box>}
				{record.end_time && <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					{/* <Button variant="contained">Next up: Dough!</Button> */}
					<Link href="/loafer/" underline="none">Next up: Shape, Prove, and Bake</Link>
				</Box>}
			</Box>
		</Paper>
	);
}