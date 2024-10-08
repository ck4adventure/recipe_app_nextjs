import { GET_LAST_5_LEAVENS } from "@/app/_lib/sqlQueriesLoafer"
import Link from "next/link";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DateField } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export default async function Page() {
	const results = await GET_LAST_5_LEAVENS();
	console.log(results)

	const displayTime = (ts: string) => {
		const time = new Date(ts)
		const month = time.getMonth()
		const day = time.getDate()
		const hours = time.getHours()
		const mins = time.getMinutes()
		return `${month}/${day} ${hours}:${mins}`
	}
	return (
		<div className="flex flex-col items-center">
			Leaven List View Page
			<TableContainer component={Paper} sx={{ width: '75%' }} elevation={6}>
				<Table sx={{ minWidth: 200 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>#</TableCell>
							<TableCell align="left">Started at</TableCell>
							<TableCell align="left">Finished at</TableCell>
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

							</TableRow>

						)
						)}
					</TableBody>
				</Table>
			</TableContainer>

		</div>
	)
}

{/* <Link href={`/loafer/leaven/${res.id}`}></Link> */ }