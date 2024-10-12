'use server'

import { GET_LAST_N_DOUGHS, GET_LAST_N_LEAVENS, GET_LOAFER_LOGS } from "../_lib/sqlQueriesLoafer";
import { NewDoughButton, NewLeavenButton } from "@/app/_ui/loafer/components";
import LeavenTable from "../_ui/loafer/leaven_table";
import { Typography, Box, Paper } from "@mui/material";
import DoughTable from "../_ui/loafer/dough_table";
import Grid from '@mui/material/Grid2';



export default async function Page() {
	const leavenLogs = await GET_LAST_N_LEAVENS(3);
	const doughLogs = await GET_LAST_N_DOUGHS(3);


	return (
		<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} margin={{ xs: 2, md: 4 }}>
			<Grid size={{ xs: 4, sm: 4, md: 6 }}>
				<Paper elevation={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					<Typography variant="h5" sx={{ margin: 2 }}>Latest Leavens</Typography>
					<LeavenTable results={leavenLogs} />
					<NewLeavenButton />
				</Paper>
			</Grid>
			<Grid size={{ xs: 4, sm: 4, md: 6 }}>

				<Paper elevation={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					<Typography variant="h5" sx={{ margin: 2 }}>Latest Doughs</Typography>
					<DoughTable data={doughLogs} />
					<NewDoughButton />
				</Paper>

			</Grid>
		</Grid >
	);
}
