// read the folders of the data folder and parse
// author name then types, then source title, finally recipes
// and insert them into the database

import { sampleData } from '../loaders/load_sample_logs.mjs';

export const loadData2 = async (client) => {
	try {
		for (const log of sampleData) {
      await client.query(
        `INSERT INTO loafer (leaven_start_time, dough_creation_time, bench_rest_start_time, shaped_prove_start_time, bake_start_time, bake_end_time) VALUES ($1, $2, $3, $4, $5, $6)`,
        [log.leaven_start_time, log.dough_creation_time, log.bench_rest_start_time, log.shaped_prove_start_time, log.bake_start_time, log.bake_end_time]
      );
    }
		console.log("sample loafer logs loaded")
	} catch (error) {
		console.error('Error loading authors and sources', error);
		throw error;
	}

}