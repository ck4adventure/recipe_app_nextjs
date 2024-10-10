// dough new gets forwarded with the leavenID somehow
// dough is created, belongs to a leaven
// similar form pattern, record the amounts and hit a start button
// then redirect to the id page, and continue updating sections

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { FormControl, FormLabel, Typography } from '@mui/material';
import DoughCreateSection from '@/app/_ui/loafer/dough_create_section';
import { createDough } from '@/app/_lib/actions';


export default function Page() {


	return (
		<div className='flex flex-col items-center'>
			<div>New Dough Creation Page</div>
			<DoughCreateSection createDoughAction={createDough} leavenID={1}/>
		</div>
	)
}