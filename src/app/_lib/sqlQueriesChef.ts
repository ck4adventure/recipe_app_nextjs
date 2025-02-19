'use server'
import { sql } from '@vercel/postgres';

export const GET_ALL_INGRS = async () => {
	const results = await sql`
		SELECT *
		FROM ingrs
	`
	return results.rows
};

export const GET_INGRS_AND_CATS = async () => {
	const results = await sql`
    SELECT category, array_agg(json_build_object('id', id, 'slug', slug, 'packaged_name', packaged_name)) as items
    FROM ingrs
    GROUP BY category
	`
	return results.rows;
}

export const GET_INGR_BY_SLUG = async (slug: string) => {
	const results = await sql`
		SELECT *
		FROM ingrs
		WHERE slug = ${slug}
	`
	return results.rows[0]
}