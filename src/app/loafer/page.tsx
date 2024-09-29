'use server'

import { GET_LOAFER_LOGS } from "../../../lib/sqlQueriesLoafer";
import { CreateLogButton } from "@/app/ui/loafer/components";
import LoafLog from "../ui/loafer/loaf-log-main";

export default async function Page() {
	const loaferLogs = await GET_LOAFER_LOGS()
	

	return (
		<div className="flex flex-col justify-center items-center">
			<LoafLog logs={loaferLogs}/>
			<CreateLogButton />
		</div>
	);
}
