import { GET_LOAFER_LOG_DETAILS } from "../../../../lib/sqlQueriesLoafer"

export default async function Page ({ params }: { params: { id: string } }) {
	const logData = await GET_LOAFER_LOG_DETAILS(params.id)
	
	return (
		<div>
			<div>Now viewing data for attempt # {logData.id}</div>
			<div>Leaven started on {new Date(logData.leaven_start_time).toLocaleString()}</div>
		</div>
	)
}