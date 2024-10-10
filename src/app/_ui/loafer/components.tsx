'use client'
import DialerSip from '@mui/icons-material/DialerSip';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { Button } from "@mui/material";

import Link from '@mui/material/Link';
import { useState } from "react";

	// function to calculate elapsed time
export	const calculateElapsedTime = (startDate: string, endDate: string | null) => {
		const start = new Date(startDate);
		const end = (endDate ? new Date(endDate) : new Date());
		const durationMS = end.getTime() - start.getTime();
		const hours = Math.floor(durationMS / (1000 * 60 * 60)).toString();
		const minutes = Math.floor((durationMS % (1000 * 60 * 60)) / (1000 * 60)).toString();
		const displayMinutes = (minutes.length < 2 ? "0" + minutes : minutes)
		return `${hours}:${displayMinutes}`
	}

// Turnsform controls the timestamps for turn
export const TurnsForm = () => {
	const [turns, setTurns] = useState([
		'', '', '', '', '', ''
	])

	const handleSetTime = (i: number) => {
		const now = new Date().toLocaleString();
		setTurns(turns.map((turn, index) => index === i ? now : turn));
	}

	const ButtonOrTimestamp = ({ ts, i }: { ts: string; i: number }) => {
		if (ts) {
			let turnDate = new Date(ts)
			return (
				<div>
					<div>{turnDate.toLocaleTimeString()}</div>
					<div className='flex justify-between'>
						<button className='text-sm'>Clear</button>
						<button className='text-sm'>Edit</button>
					</div>
				</div>
			);
		} else {
			return (
				<div className='bg-green-400 p-1 m-2 rounded-lg'>
					<button onClick={() => handleSetTime(i)}>Mark Done!</button>
				</div>
			);
		}
	}

	return (
		<div className="flex m-2">
			{turns.map((ts, i) => {
				return (
					<div key={i} className="flex-col justify-center bg-slate-200 m-2 h-[125px] w-[125px]">
						<div className='flex flex-col justify-center items-center'>
							<div>Turn {i + 1}</div>
							<ButtonOrTimestamp ts={ts} i={i} />
						</div>
					</div>
				)
			}
			)}

		</div>
	)
};

export const NewLeavenButton = () => {

	return (
		<div className="m-4">
			<Link href="/loafer/leaven/new" underline='none'>Start New Leaven</Link>
		</div>
	)
};

export const NewDoughButton = () => {
	return (
		<div className="m-4">
			<Link href="/loafer/dough/new" underline='none'>Start New Dough</Link>
		</div>
	)
}