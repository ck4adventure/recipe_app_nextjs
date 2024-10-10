import { Link, Typography, Box, Paper } from "@mui/material";


export default async function Main() {

	return (
		<div>
			<main className="flex min-h-screen flex-col items-center">
				<Box sx={{ width: '90%' }}>
					<Typography>What's in the works</Typography>
					<Box sx={{ width: '100%', display: 'flex' }}>
						<Box sx={{ margin: 2, width: 300, height: 150 }}>
							<Paper elevation={6} sx={{ width: '100%', height: '100%', padding: 2  }}>
								<Typography>Leavens</Typography>
								<Typography>Leaven #4 In Progress 04:25m</Typography>
								<Typography>Leaven #3 Finished 07:25m</Typography>
							</Paper>
						</Box>
						<Box sx={{ margin: 2, width: 300, height: 150 }}>
							<Paper elevation={6} sx={{ width: '100%', height: '100%', padding: 2 }}>
								<Typography>Doughs</Typography>
								<Typography>Leaven #4 In Progress 04:25m</Typography>
								<Typography>Leaven #3 Finished 07:25m</Typography>
							</Paper>
						</Box>
						<Box sx={{ margin: 2, width: 300, height: 150 }}>
							<Paper elevation={6} sx={{ width: '100%', height: '100%', padding: 2  }}>
								<Typography>Bakes</Typography>
								<Typography>Leaven #4 In Progress 04:25m</Typography>
								<Typography>Leaven #3 Finished 07:25m</Typography>
							</Paper>
						</Box>
					</Box>
				</Box>
				<Typography variant="h5"><Link href="/loafer/">Go To Loafer</Link></Typography>
			</main>
		</div>
	);
}
