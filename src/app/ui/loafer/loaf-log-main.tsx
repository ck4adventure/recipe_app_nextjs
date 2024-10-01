'use client'

import { QueryResultRow } from "pg"
import { shorthandDate } from "../../../../lib/formatters"

// todo update baking log to take data from server component page it lives on
export default function LoafLog({ logs }: { logs: QueryResultRow[] }) {

	return (
		<div className="flex flex-col items-center">
			<div data-cy='loafer' className="flex flex-col items-center">
				<table className="">
					<thead>
						<tr>
							<th className="text-sm">Bake #</th>
							<th className="text-sm">Leaven Start</th>
							<th className="text-sm">Dough Creation</th>
							<th className="text-sm">Bench Rest</th>
							<th className="text-sm">Shape and Prove</th>
							<th className="text-sm">Bake Start</th>
							<th className="text-sm">Bake End</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{logs && logs.map(logData => {
							return (
								<tr key={logData.id}>
									<td>{logData.id}</td>
									<td>{shorthandDate(logData.leaven_start_time)}</td>
									<td>{shorthandDate(logData.dough_creation_time)}</td>
									<td>{shorthandDate(logData.bench_rest_start_time)}</td>
									<td>{shorthandDate(logData.shaped_prove_start_time)}</td>
									<td>{shorthandDate(logData.bake_start_time)}</td>
									<td>{shorthandDate(logData.bake_end_time)}</td>
									<td className="mx-8"><a href={`/loafer/${logData.id}`}>View Page</a></td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</div>
	)
}