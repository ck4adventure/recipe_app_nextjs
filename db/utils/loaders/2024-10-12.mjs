// completed_logs hold my data day to day as I work towards a complete feature
export const daily_log = {
	leaven_start_time: '2024-10-11 23:45:00-07',
	leaven_water_temp: 72,
	leaven_room_temp_start: 70,
	leaven_room_temp_finish: 68,
	doughs: [
		{
			water_amt: 400,
			water_temp: 90,
			leaven_amt: 100,
			flour_blend: 'wheat',
			flout_amt: 500,
			start_hydrolyse_time: '2024-10-12 12:20:00-07',
			start_temp: 100,
			salt_amt: 11,
			salt_water_amt: 25,
			salt_time: '2024-10-12 013:00:00-07',
			turns: [
				'2024-10-11 13:30:00-07',
				'2024-10-11 14:00:00-07',
				'2024-10-11 14:30:00-07',
				'2024-10-11 15:00:00-07',
				'2024-10-11 15:30:00-07',
				'2024-10-11 16:00:00-07',
			],
			end_temp: 80
		},
		{
			water_amt: 375,
			water_temp: 80,
			leaven_amt: 100,
			flour_blend: 'white',
			flout_amt: 500,
			start_hydrolyse_time: '2024-10-12 12:30:00-07',
			start_temp: 100,
			salt_amt: 11,
			salt_water_amt: 25,
			salt_time: '2024-10-12 12:50:00-07',
			turns: [
				'2024-10-11 13:30:00-07',
				'2024-10-11 14:00:00-07',
				'2024-10-11 14:30:00-07',
				'2024-10-11 15:00:00-07',
				'2024-10-11 15:30:00-07',
				'2024-10-11 16:00:00-07',
			],
			end_temp: 100
		}
	],
	loaves: [
		{
			loaf_shape: 'oblong',
			loaf_weight: 600,
			bench_rest_start_time: '2024-10-12 16:30:00-07',
			bench_rest_room_temp: 72,
			shaped_prove_start_time: '2024-10-12 16:45:00-07',
			shaped_prove_room_temp: 100,
			shaped_prove_final_room_temp: 100,
			bake_start_time: '2024-10-12 20:45:00-07',
			bake_end_time: 'NA'
		},
		{
			loaf_shape: 'tin',
			loaf_weight: 600,
			qty: 2,
			bench_rest_start_time: '2024-10-12 16:30:00-07',
			bench_rest_room_temp: 74,
			shaped_prove_start_time: '2024-10-12 17:00:00-07',
			shaped_prove_room_temp: 100,
			shaped_prove_final_room_temp: 100,
			bake_start_time: '2024-10-12 20:45:00-07',
			bake_end_time: '2024-10-12 21:20:00-07'
		}

	]
}