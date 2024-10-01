import { GET_LOAFER_LOG_DETAILS } from "../../../../lib/sqlQueriesLoafer"



export default async function Page ({ params }: { params: { id: string } }) {
	const logData = await GET_LOAFER_LOG_DETAILS(params.id)
	const leavenStartDate = new Date(logData.leaven_start_time)
	return (
		<div className="flex flex-col items-center">
			<div className="font-semibold">Now viewing data for attempt # {logData.id}</div>
			<div><hr/></div>
			<div>Leaven started on {leavenStartDate.getMonth()}/{leavenStartDate.getDate()} {leavenStartDate.getHours()}:{leavenStartDate.getMinutes()}</div>
			<div>Dough created at {leavenStartDate.getHours()}:{leavenStartDate.getMinutes()}</div>
			<div>Divide and rest start time {new Date(logData.leaven_start_time).toLocaleString()}</div>
			<div>Shape and prove start time {new Date(logData.leaven_start_time).toLocaleString()}</div>
			<div>Bake start time {new Date(logData.leaven_start_time).toLocaleString()}</div>
			<div>Bake end time {new Date(logData.leaven_start_time).toLocaleString()}</div>
		</div>
	)
}