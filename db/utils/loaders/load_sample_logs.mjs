		// Current Table Columns for sample data
		// leaven_start_time TIMESTAMPTZ,
		// dough_creation_time TIMESTAMPTZ,
		// bench_rest_start_time TIMESTAMPTZ,
		// shaped_prove_start_time TIMESTAMPTZ,
		// bake_start_time TIMESTAMPTZ,
		// bake_end_time TIMESTAMPTZ
export const sampleData = [
  {
    leaven_temp: 35,
    leaven_start_time: '2024-09-25 21:00:00-07', // Corrected timestamp
    dough_creation_time: '2024-09-26 08:30:00-07', // Corrected timestamp
    bench_rest_start_time: '2024-09-26 14:30:00-07', // Corrected timestamp
    shaped_prove_start_time: '2024-09-26 15:05:00-07', // Corrected timestamp
    bake_start_time: '2024-09-26 21:00:00-07', // Corrected timestamp
    bake_end_time: '2024-09-26 21:43:00-07', // Corrected timestamp
  },
  {
    leaven_temp: 36,
    leaven_start_time: '2024-09-26 21:00:00-07', // Corrected timestamp
    dough_creation_time: '2024-09-27 08:30:00-07', // Corrected timestamp
    bench_rest_start_time: '2024-09-27 14:30:00-07', // Corrected timestamp
    shaped_prove_start_time: '2024-09-27 15:05:00-07', // Corrected timestamp
    bake_start_time: '2024-09-27 21:00:00-07', // Corrected timestamp
    bake_end_time: '2024-09-27 21:43:00-07', // Corrected timestamp
  },
  {
    leaven_temp: 37,
    leaven_start_time: '2024-09-27 21:00:00-07', // Corrected timestamp
    dough_creation_time: '2024-09-28 08:30:00-07', // Corrected timestamp
    bench_rest_start_time: '2024-09-28 14:30:00-07', // Corrected timestamp
    shaped_prove_start_time: '2024-09-28 15:05:00-07', // Corrected timestamp
    bake_start_time: '2024-09-28 21:00:00-07', // Corrected timestamp
    bake_end_time: '2024-09-28 21:43:00-07', // Corrected timestamp
  },
  // Add more sample data as needed
];

export const loadSampleLogs = async (client) => {
  try {
    // Insert sample data into the loafer table
    for (const log of sampleData) {
      await client.sql`INSERT INTO loafer (leaven_start_time, dough_creation_time, bench_rest_start_time, shaped_prove_start_time, bake_start_time, bake_end_time)
			 VALUES (${log.leaven_start_time}, ${log.dough_creation_time}, ${log.bench_rest_start_time}, ${log.shaped_prove_start_time}, ${log.bake_start_time}, ${log.bake_end_time})`;
    }

    console.log('Sample data inserted successfully');
  } catch (err) {
    console.error('Error inserting sample data:', err);
  } finally {
    await client.end();
  }
}