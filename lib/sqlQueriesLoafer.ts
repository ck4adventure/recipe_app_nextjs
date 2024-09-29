'use server'
import { sql } from '@vercel/postgres';

export const CREATE_LOAFER_LOG = async (leaven_temp: number, leaven_start_time: string) => {
	const results = await sql`
		INSERT INTO loafer (leaven_temp, leaven_start_time) VALUES (${leaven_temp}, ${leaven_start_time}) RETURNING id
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