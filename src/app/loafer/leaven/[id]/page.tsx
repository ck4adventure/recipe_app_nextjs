import React, { useEffect, useState } from "react";
import { GET_LEAVEN_BY_ID } from "@/app/_lib/sqlQueriesLoafer"

import LeavenDisplaySection from "@/app/_ui/loafer/leaven_display_section";


export default async function Page({ params }: { params: { id: string } }) {
	// this prolly needs to be more like an effect? maybe it is already
	// so first try and load any available data for this entry, which we'll likely continue updating
	const id = Number(params.id)
	const record = await GET_LEAVEN_BY_ID(id)

	return (
		<div className="flex flex-col items-center">
			<div>Leaven #{id}</div>
			{record && <LeavenDisplaySection record={record} />}
			
		</div>
	)
}