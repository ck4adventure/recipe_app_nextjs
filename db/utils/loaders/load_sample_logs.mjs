


export const loadSampleLogs = async (client) => {

	try {
		await client.sql`INSERT INTO loafer (leaven_temp, leaven_start_time, dough_creation_time, water_ml, water_temp) VALUES (70, '2024-09-25 21:00', '2024-09-26 08:30', 700, 80)`;
	} catch (error) {
		console.error('Error loading loafer sample logs', error);
	}
}
