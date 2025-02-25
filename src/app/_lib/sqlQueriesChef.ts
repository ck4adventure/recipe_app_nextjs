'use server'
import { sql } from '@vercel/postgres';

export const GET_ALL_INGRS = async () => {
	const results = await sql`
		SELECT *
		FROM ingrs
	`;
	return results.rows;
};

export const GET_INGRS_AND_CATS = async () => {
	const results = await sql`
    SELECT category, array_agg(json_build_object('id', id, 'slug', slug, 'packaged_name', packaged_name)) as items
    FROM ingrs
    GROUP BY category
	`;
	return results.rows;
}

export const GET_INGR_BY_SLUG = async (slug: string) => {
	const results = await sql`
		SELECT *
		FROM ingrs
		WHERE slug = ${slug}
	`;
	return results.rows[0];
}

export const GET_RECIPE_TITLES = async () => {
	const results = await sql`
	SELECT *
	FROM chefs_recipes
	`;
	return results.rows;
}

export const GET_CHEFS_RECIPE_BY_SLUG = async (slug: string) => {
	const results = await sql`
		SELECT 
				r.id AS id,
				r.title AS title,
				r.steps,
				JSON_AGG(
						JSON_BUILD_OBJECT(
								'brand_name', i.brand,
								'packaged_name', i.packaged_name,
								'qty', ri.qty,
								'measure', ri.measure
						)
				) AS ingredients
		FROM chefs_recipes r
		JOIN chefs_recipe_ingrs ri ON r.id = ri.recipe_id
		JOIN ingrs i ON ri.ingr_id = i.id
		WHERE r.slug = ${slug}
		GROUP BY r.id;
	`;
	return results.rows[0];
}