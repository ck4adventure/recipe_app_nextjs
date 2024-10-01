import { GET_LOAFER_LOG_DETAILS } from "../../../../lib/sqlQueriesLoafer"

import { shorthandDate } from "../../../../lib/formatters"

export default async function Page({ params }: { params: { id: string } }) {
	const logData = await GET_LOAFER_LOG_DETAILS(params.id)
	const leavenStartDate = new Date(logData.leaven_start_time)
	return (
		<div className="flex flex-col items-center">
			<div className="font-semibold">Now viewing data for attempt # {logData.id}</div>
			<div><hr /></div>
			<div>{logData.id}</div>
			<div>{shorthandDate(logData.leaven_start_time)}</div>
			<div>{shorthandDate(logData.dough_creation_time)}</div>
			<div>{shorthandDate(logData.bench_rest_start_time)}</div>
			<div>{shorthandDate(logData.shaped_prove_start_time)}</div>
			<div>{shorthandDate(logData.bake_start_time)}</div>
			<div>{shorthandDate(logData.bake_end_time)}</div>
		</div>
	)
}