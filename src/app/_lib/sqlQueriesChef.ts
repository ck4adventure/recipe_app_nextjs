'use server'
import { sql } from '@vercel/postgres';

export const GET_ALL_INGRS = async () => {
	const results = await sql`
		SELECT *
		FROM ingrs
	`
	return results.rows
};