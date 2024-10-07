'use server'
import { sql } from '@vercel/postgres';

export const CREATE_LEAVEN = async (leaven_start_time: string) => {
	const results = await sql`
		INSERT INTO leaven (leaven_start_time) VALUES (${leaven_start_time}) RETURNING id
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