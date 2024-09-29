
export const loadSampleLogs = async (client) => {

	try {
		await client.sql`INSERT INTO loafer (leaven_temp, leaven_start_time) VALUES (70, '2024-09-25 21:00')`;
		await client.sql`INSERT INTO loafer (leaven_temp, leaven_start_time) VALUES (75, '2024-09-27 21:30')`;

	} catch (error) {
		console.error('Error loading loafer logs', error);
	}
}
