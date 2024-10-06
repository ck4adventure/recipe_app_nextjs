import { GET_LOAFER_LOG_DETAILS } from "../../../../lib/sqlQueriesLoafer"

import { LoaferForm } from "@/app/ui/loafer/loafer_form"


export default async function Page({ params }: { params: { id: string } }) {
	// this prolly needs to be more like an effect? maybe it is already
	// so first try and load any available data for this entry, which we'll likely continue updating
	const logData = await GET_LOAFER_LOG_DETAILS(params.id)

	return (
		<LoaferForm data={logData} />
	)
}