'use client'
import { useState } from 'react';
import { Link, Typography, Box, Paper, Button } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { NewDoughButton, NewLeavenButton } from './components';
import { StandardModal } from './modal_standard';

export const StatusSection = () => {
	const [modalIsOpen, setModalIsOpen] = useState(false)
	const handleModalClose = () => {
		setModalIsOpen(false)
	}
	return (
		<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} margin={{ xs: 2, md: 4 }} justifyContent={'center'}>
			<Grid size={{ xs: 4, sm: 8, md: 8 }}>
				<Paper elevation={2} sx={{ margin: 2, minHeight: 100, display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>
					<Typography sx={{ margin: 2 }}>Nothing currently in progress.</Typography>
					<div className='flex justify-between'>
						<NewLeavenButton />
						<NewDoughButton />
					</div>
				</Paper>
			</Grid>

		</Grid>
	)
}