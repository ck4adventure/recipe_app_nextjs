import { GET_DOUGH_BY_ID } from "@/app/_lib/sqlQueriesLoafer"
import DoughDisplaySection from "@/app/_ui/loafer/dough_display_section"


export default async function Page({ params }: { params: { id: string } }) {
	// this prolly needs to be more like an effect? maybe it is already
	// so first try and load any available data for this entry, which we'll likely continue updating
	// const logData = await GET_LOAFER_LOG_DETAILS(params.id)
	const record = await GET_DOUGH_BY_ID(Number(params.id))
	return (
		<div className="flex flex-col items-center">
			<div>Dough #{params.id}</div>
			{record && <DoughDisplaySection record={record} />}
			
		</div>
	);
}