import { GET_LOAFER_LOG_DETAILS } from "../../../../lib/sqlQueriesLoafer"

import { shorthandDate } from "../../../../lib/formatters"

export default async function Page({ params }: { params: { id: string } }) {
	const logData = await GET_LOAFER_LOG_DETAILS(params.id)

	return (
		<div className="flex flex-col items-center">
			<div className="font-semibold">Bake #{logData.id}</div>
			<div className="flex flex-col border border-green-700 rounded-md">
				<div className="m-2 font-semibold">Leaven</div>
				<div className="m-2">1 TBL Starter + 200g Flour Blend + 200g Water</div>
				<div className="m-2">Water Temp: 78F </div>
				<div className="m-2">Start Time: {shorthandDate(logData.leaven_start_time)} </div>
				<div className="m-2">Room Temp 68F</div>
			</div>
			<div className="flex flex-col border border-green-700 rounded-md">
				<div className="m-2 font-semibold">Dough</div>
				<div className="m-2">Loaf Type: Cottage</div>
				<div className="m-2">900g Bread Flour + 100g Wheat Flour</div>
				<div className="m-2">Create Dough: {shorthandDate(logData.dough_creation_time)}</div>
				<div className="m-2">Water Temp: 78F</div>
				<div className="m-2">Room Temp 72F</div>
			</div>
			<div className="flex flex-col border border-green-700 rounded-md">
				<div className="m-2 font-semibold">Salt the Loaf</div>
				<div className="m-2">22g Salt + 50g Water</div>
				<div className="m-2">Salt Dough: {shorthandDate(logData.dough_creation_time)}</div>
				<div className="m-2">Water Temp: 78F</div>
				<div className="m-2">Room Temp 72F</div>
			</div>
			<div className="flex flex-col border border-green-700 rounded-md">
				<div className="m-2 font-semibold">Turns</div>
				<div className="flex">
					<div className="mx-2">Turn</div>
					<div className="mx-2">Turn</div>
					<div className="mx-2">Turn</div>
					<div className="mx-2">Turn</div>
					<div className="mx-2">Turn</div>
					<div className="mx-2">Turn</div>

				</div>
			</div>
			<div className="flex border border-green-700 rounded-md">
				<div className="m-2 font-semibold">Divide</div>
				<div className="m-2">Divide and Rest: {shorthandDate(logData.bench_rest_start_time)}</div>
				<div className="m-2">Room Temp 72F</div>
			</div>
			<div className="flex border border-green-700 rounded-md">
				<div className="m-2 font-semibold">Shape</div>
				<div className="m-2">Shape and Prove: {shorthandDate(logData.shaped_prove_start_time)}</div>
				<div className="m-2">Room Temp 72F</div>
				<div className="m-2">Loaf 1: Oblong</div>
				<div className="m-2">Loaf 2: Round</div>
			</div>
			<div className="flex border border-green-700 rounded-md">
				<div className="m-2 font-semibold">Bake</div>
				<div className="m-2">
					<div>Bake Start: {shorthandDate(logData.bake_start_time)}</div>
				</div>
				<div className="m-2">
					<div>Bake End: {shorthandDate(logData.bake_end_time)}</div>
				</div>
			</div>
		</div>
	)
}