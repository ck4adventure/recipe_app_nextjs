'use server'

import { GET_LAST_5_LEAVENS, GET_LOAFER_LOGS } from "../_lib/sqlQueriesLoafer";
import { NewLeavenButton } from "@/app/_ui/loafer/components";
import LoafLog from "../_ui/loafer/loaf-log-main";
import LeavenTable from "../_ui/loafer/leaven_table";
import { Typography, Box } from "@mui/material";


export default async function Page() {
	const loaferLogs = await GET_LOAFER_LOGS()
	const leavenLogs = await GET_LAST_5_LEAVENS()


	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
			<Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
				<Typography variant="h5" sx={{ margin: 2}}>Latest Leavens</Typography>
				<LeavenTable results={leavenLogs} />
			</Box>

			<NewLeavenButton />
			<LoafLog logs={loaferLogs} />
		</Box>
	);
}
