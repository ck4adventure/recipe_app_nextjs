'use client'
import Link from "next/link";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { QueryResultRow } from "pg";
import { calculateElapsedTime } from "./components";

export default function LeavenTable({ results }: { results: QueryResultRow[] }) {
	const displayTime = (ts: string) => {
		const time = new Date(ts)
		const month = time.getMonth()
		const day = time.getDate()
		const hours = time.getHours()
		const mins = time.getMinutes()
		return `${month}/${day} ${hours}:${mins}`
	}

	return (
			<TableContainer component={Paper} sx={{ width: '75%' }} elevation={6}>
				<Table sx={{ minWidth: 200 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>#</TableCell>
							<TableCell align="left">Started at</TableCell>
							<TableCell align="left">Finished at</TableCell>
							<TableCell align="left">Elapsed Time</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>

						{results.map(res => (

							<TableRow key={res.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >

								<TableCell><Link href={`/loafer/leaven/${res.id}`}>{res.id}</Link></TableCell>
								<TableCell align="left">
									<Link href={`/loafer/leaven/${res.id}`}>
										{displayTime(res.start_time)}
									</Link>
								</TableCell >
								<TableCell align="left"><Link href={`/loafer/leaven/${res.id}`}>{res.end_time ? displayTime(res.end_time) : "In progress"}</Link></TableCell>
								<TableCell>{calculateElapsedTime(res.start_time, res.end_time)}</TableCell>
							</TableRow>

						)
						)}
					</TableBody>
				</Table>
			</TableContainer>
	)
}