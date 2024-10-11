'use server'

import { GET_LAST_5_DOUGHS, GET_LAST_5_LEAVENS, GET_LOAFER_LOGS } from "../_lib/sqlQueriesLoafer";
import { NewDoughButton, NewLeavenButton } from "@/app/_ui/loafer/components";
// import LoafLog from "../_ui/loafer/loaf-log-main";
import LeavenTable from "../_ui/loafer/leaven_table";
import { Typography, Box } from "@mui/material";
import DoughTable from "../_ui/loafer/dough_table";


export default async function Page() {
	// const loaferLogs = await GET_LOAFER_LOGS();
	const leavenLogs = await GET_LAST_5_LEAVENS();
	const doughLogs = await GET_LAST_5_DOUGHS();


	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
			<Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<Typography variant="h5" sx={{ margin: 2 }}>Latest Leavens</Typography>
				<LeavenTable results={leavenLogs} />
				<NewLeavenButton />
			</Box>

			<Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<Typography variant="h5" sx={{ margin: 2 }}>Latest Doughs</Typography>
				<DoughTable data={doughLogs} />
				<NewDoughButton />
			</Box>
			{/* <LoafLog logs={loaferLogs} /> */}
		</Box>
	);
}
