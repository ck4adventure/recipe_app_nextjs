import { GET_LOAFER_LOG_DETAILS } from "../../../_lib/sqlQueriesLoafer"

import { shorthandDate } from "../../../_lib/formatters"
import { TurnsForm } from "@/app/_ui/loafer/components"

export default async function Page({ params }: { params: { id: string } }) {
	const logData = await GET_LOAFER_LOG_DETAILS(params.id)

	return (
		<div className="flex flex-col items-center">
			<div className="font-semibold">Bake #{logData.id}</div>
			<div className="flex flex-col border border-indigo-700 rounded-md w-[800px]">
				<div className="m-2 font-semibold">Leaven</div>
				<div className="m-2">1 TBL Starter + 200g Flour Blend + 200g Water</div>
				<div className="flex">
					<div className="m-2">Start Time: {shorthandDate(logData.leaven_start_time)} </div>
					<div className="m-2">Water Temp: 78F </div>
					<div className="m-2">Room Temp 68F</div>
				</div>
				<div className="flex">
					<div className="m-2">Finish Time: {shorthandDate(logData.leaven_start_time)} </div>
					<div className="m-2">Room Temp 72F</div>
				</div>
			</div>
			<div className="flex flex-col border border-indigo-700 rounded-md w-[800px]">
				<div className="m-2 font-semibold">Dough</div>
				<div className="flex">
					<div className="m-2">Loaf Type: Cottage</div>
					<div className="m-2">900g Unbleached Bread Flour + 100g Whole Wheat Flour</div>
				</div>
				<div className="flex">
					<div className="m-2">Grams Flour: 1000</div>
					<div className="m-2">ML Water: 740</div>
					<div className="m-2">Water Temp: 78F</div>
				</div>
				<div className="flex">
					<div className="m-2">Autolyse Start Time: {shorthandDate(logData.dough_creation_time)}</div>

					<div className="m-2">Room Temp 72F</div>
				</div>
				<div className="flex">
					<div className="m-2">Autolyse End Time: {shorthandDate(logData.dough_creation_time)}</div>
					<div className="m-2">Room Temp 72F</div>
				</div>
			</div>
			<div className="flex flex-col border border-indigo-700 rounded-md w-[800px]">
				<div className="m-2 font-semibold">Salt the Loaf</div>
				<div className="m-2">20g Salt + 50g Water</div>
				<div className="flex">
					<div className="m-2">Salt Dough: {shorthandDate(logData.dough_creation_time)}</div>
					<div className="m-2">Water Temp: 78F</div>
				</div>
			</div>
			<div className="flex flex-col border border-indigo-700 rounded-md w-[800px]">
				<div className="m-2 font-semibold">Turns</div>
				<TurnsForm />
			</div>
			<div className="flex flex-col border border-indigo-700 rounded-md w-[800px]">
				<div className="m-2 font-semibold">Divide and Rest</div>
				<div className="flex">
					<div className="m-2">Rest Start Time: {shorthandDate(logData.bench_rest_start_time)}</div>
					<div className="m-2">Room Temp 72F</div>
				</div>
				<div className="flex">
					<div className="m-2">Rest End Time: {shorthandDate(logData.bench_rest_start_time)}</div>
					<div className="m-2">Room Temp 70F</div>
				</div>
			</div>
			<div className="flex flex-col border border-indigo-700 rounded-md w-[800px]">
				<div className="m-2 font-semibold">Shape and Prove</div>
				<div className="flex">
					<div className="m-2">
						<div className="">Loaf 1: Oblong</div>
						<div className="">Loaf 1 Prove Start: {shorthandDate(logData.shaped_prove_start_time)}</div>
						<div className="">Room Temp 72F</div>
					</div>
					<div className="m-2">
						<div className="">Loaf 2: Round</div>
						<div className="">Loaf 2 Prove Start: {shorthandDate(logData.shaped_prove_start_time)}</div>
						<div className="">Room Temp 72F</div>
					</div>
				</div>

			</div>
			<div className="flex flex-col border border-indigo-700 rounded-md w-[800px]">
				<div className="m-2 font-semibold">Bake</div>
				<div className="flex">
					<div className="m-2">
						<div>Loaf 1</div>
						<div>Bake Start: {shorthandDate(logData.bake_start_time)}</div>
						<div>Bake End: {shorthandDate(logData.bake_end_time)}</div>
					</div>
					<div className="m-2">
						<div>Loaf 2</div>
						<div>Bake Start: {shorthandDate(logData.bake_start_time)}</div>
						<div>Bake End: {shorthandDate(logData.bake_end_time)}</div>
					</div>
				</div>
			</div>
		</div>
	)
}