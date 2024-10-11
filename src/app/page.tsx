import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import { Link, Typography, Box, Paper } from "@mui/material";
import Grid from '@mui/material/Grid2';

const AppSections = [
	["Leavens", "/loafer/leaven"],
	["Doughs", "loafer/dough"],
	["Loaves and Bakes", "loafer/loaf"],
	["Products", "/"],
	["Recipes", "/recipes"],
	["Ingredients", "/"],
]

export default async function Main() {

	return (
		<main className="min-h-screen">
			<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} margin={{xs:2, md:4 }}>
				{AppSections.map((entry, index) => (
					<Grid key={index} size={{ xs: 4, sm: 4, md: 6 }}>
						<Paper elevation={6}>
							<Box sx={{minHeight: 100, display:'flex', justifyContent: 'center', alignItems: 'center'}}>
								<Typography><Link href={entry[1]} underline="none">{entry[0]}</Link></Typography>
							</Box>
						</Paper>
					</Grid>
				))}
			</Grid>


			<Typography variant="h5"></Typography>
		</main>
	);
}
