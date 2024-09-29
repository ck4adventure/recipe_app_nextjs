'use client'

import { log } from "console";
import { QueryResultRow } from "pg"

// Define the interface for the log data
interface LogData extends QueryResultRow {
	id: number;
	leaven_start_time: string; // or Date, depending on your data type
	leaven_avg_temp: number;
}

// todo update baking log to take data from server component page it lives on
export default function LoafLog({ logs }: { logs: LogData[] }) {
	console.log(logs.length)

	return (
		<div className="flex flex-col items-center">
			<div data-cy='loafer' className="flex flex-col items-center">
				<table className="w-3/4">
					<thead>
						<tr>
							<th className="text-sm">Attempt #</th>
							<th className="text-sm">Leaven Creation</th>
							<th className="text-sm">Create and Rise</th>
							<th className="text-sm">Shape and Prove</th>
							<th className="text-sm">Bake</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{logs && logs.map(logData => {
							const startDate = new Date(logData.leaven_start_time)
							return (
								<tr key={logData.id}>
									<td>{logData.id}</td>
									<td>{startDate.toLocaleString()}</td>
									<td>08:30</td>
									<td>14:00</td>
									<td>19:45</td>
									<td><a href={`/loafer/${logData.id}`}>Update</a></td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</div>
	)
}