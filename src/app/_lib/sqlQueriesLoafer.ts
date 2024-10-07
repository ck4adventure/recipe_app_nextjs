'use server'
import { sql } from '@vercel/postgres';

export const CREATE_LEAVEN = async (water_amt: number, water_temp: number, starter_amt: number, flour_amt: number, start_time: string, start_temp: number) => {
	const results = await sql`
		INSERT INTO leaven (water_amt, water_temp, starter_amt, flour_amt, start_time, start_temp) VALUES (${water_amt}, ${water_temp}, ${starter_amt}, ${flour_amt}, ${start_time}, ${start_temp}) RETURNING id
	`;
	return results.rows[0];
};

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