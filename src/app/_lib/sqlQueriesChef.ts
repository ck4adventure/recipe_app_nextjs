'use server'
import { sql } from '@vercel/postgres';

export const GET_ALL_INGRS = async () => {
	const results = await sql`
		SELECT *
		FROM ingrs
	`
	return results.rows
};

export const GET_INGR_BY_SLUG = async (slug: string) => {
	const results = await sql`
		SELECT *
		FROM ingrs
		WHERE keyname = ${slug}
	`
	return results.rows[0]
}