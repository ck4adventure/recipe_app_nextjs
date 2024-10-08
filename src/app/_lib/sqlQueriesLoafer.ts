'use server'
import { sql } from '@vercel/postgres';

export const CREATE_LEAVEN = async (water_amt: number, water_temp: number, starter_amt: number, flour_amt: number, start_time: string, start_temp: number) => {
	const results = await sql`
		INSERT INTO leaven (water_amt, water_temp, starter_amt, flour_amt, start_time, start_temp) VALUES (${water_amt}, ${water_temp}, ${starter_amt}, ${flour_amt}, ${start_time}, ${start_temp}) RETURNING id
	`;
	return results.rows[0];
};

export const GET_LEAVEN_BY_ID = async (id: number) => {
	const results = await sql`
		SELECT * FROM leaven WHERE id = ${id}
	`;
	return results.rows[0];
}

export const UPDATE_LEAVEN_END_TIME = async (id: number, ts: string) => {
	const results = await sql`
		UPDATE leaven
		SET end_time = ${ts}
		WHERE id = ${id}
		RETURNING *
	`;
	return results.rows[0];
}

export const GET_LAST_5_LEAVENS = async () => {
	const results = await sql`
		SELECT *
		FROM leaven
		ORDER BY start_time DESC
		LIMIT 5
	`
	return results.rows
}

export const GET_LOAFER_LOGS = async () => {
	const results = await sql`
		SELECT * FROM loafer
	`
	return results.rows
}

export const GET_LOAFER_LOG_DETAILS = async (id: string) => {
	const results = await sql`
		SELECT * FROM loafer WHERE id = ${id}
	`
	return results.rows[0]
}