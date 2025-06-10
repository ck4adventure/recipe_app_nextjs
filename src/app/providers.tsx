'use client' // <-- Important!

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { UserProvider } from './_context/UserContext';

export default function Providers({ children }: { children: React.ReactNode }) {
	// Add other providers nested here as needed
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<UserProvider>
				{children}
			</UserProvider>
		</LocalizationProvider>
	)
}