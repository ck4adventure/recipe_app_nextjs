'use client'
import { updateLeavenEndTime } from "@/app/_lib/actions";
import { Box, Paper, Typography, Button, Link } from "@mui/material"
import { QueryResultRow } from "pg";
import { useState, useEffect } from 'react'
import { calculateElapsedTime } from "./components";



export default function LeavenDisplaySection({ record }: { record: QueryResultRow }) {
	// State to hold the elapsed time
	const [elapsedTime, setElapsedTime] = useState<string>("");

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
				<Typography variant='h5' sx={{ marginLeft: 2 }}>Leaven</Typography>
				<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<Box sx={{ margin: 2 }}>
						<Typography color="gray">Water: {record.water_amt}ml</Typography>
						<Typography color="gray">Water Temp: {record.water_temp}F</Typography>
						<Typography color="gray">Starter: {record.starter_amt}g</Typography>
						<Typography color="gray">Flour Blend: {record.flour_amt}g</Typography>
						<Box sx={{ display: 'flex' }}>
							<Typography color="gray" sx={{ marginRight: 2 }}>Time Started: {new Date(record.start_time).toLocaleTimeString()}</Typography>
							<Typography color="gray" >Room Temp: {record.start_temp}F</Typography>
						</Box>
						<Box sx={{ display: 'flex' }}>
							<Typography color="gray" sx={{ marginRight: 2 }}>
								{record.end_time ? `Time Finished: ${new Date(record.end_time).toLocaleTimeString()}` : "In Progress"}
							</Typography>
							<Typography color="gray" >Room Temp: {record.end_temp ? record.end_temp : 'NA '}F</Typography>
						</Box>
					</Box>
					<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '150px', width: '250px', padding: 4 }}>
						<div>Elapsed Time {elapsedTime}</div>
					</Box>
				</Box>
				{!record.end_time && <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					<Button onClick={() => updateLeavenEndTime(record.id, new Date().toISOString())}>Finish Leaven</Button>
				</Box>}
				{record.end_time && <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					{/* <Button variant="contained">Next up: Dough!</Button> */}
					<Link href="/loafer/dough/new" underline="none">Next up: Start some dough</Link>
				</Box>}
			</Box>
		</Paper>
	);
}