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
import { DateTimeField } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from 'dayjs';

export default function DoughTable({ data }: { data: QueryResultRow[] }) {
	const displayTime = (ts: string) => {
		const time = new Date(ts)
		const month = time.getMonth() + 1; //apparently months start at zero
		const day = time.getDate()
		const hours = time.getHours()
		const minutes = time.getMinutes().toString()
		const displayMinutes = (minutes.length < 2 ? "0" + minutes : minutes)
		return `${month}/${day} ${hours}:${displayMinutes}`
	}

	return (
		<TableContainer component={Paper} sx={{ width: '90%' }} elevation={0}>
			<Table sx={{ minWidth: 200 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>#</TableCell>
						<TableCell align="left">Type</TableCell>
						<TableCell align="left">Weight</TableCell>
						<TableCell align="left">Finish</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>

					{data.map(res => (

						<TableRow key={res.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >

							<TableCell><Link href={`/loafer/dough/${res.id}`}>{res.id}</Link></TableCell>
							<TableCell>{res.flour_blend[0].toUpperCase() + res.flour_blend.slice(1)}</TableCell>
							<TableCell>{res.water_amt + res.flour_amt + res.leaven_amt}</TableCell>
							<TableCell align="left"><Link href={`/loafer/dough/${res.id}`}>{res.end_time ? displayTime(res.end_time) : "In progress"}</Link></TableCell>
						</TableRow>

					)
					)}
				</TableBody>
			</Table>
		</TableContainer>
	)
}