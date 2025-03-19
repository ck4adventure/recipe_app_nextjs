'use server'
import { sql } from '@vercel/postgres';

export const GET_ALL_INGRS_FOR_FORM = async () => {
	const results = await sql`
		SELECT id, brand, label_name
		FROM ingrs
		ORDER BY label_name ASC
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

export const GET_RECIPE_CATEGORIES = async () => {
	const results = await sql`
		SELECT DISTINCT category
		FROM chefs_recipes
	`
	return results.rows;
}

export const GET_RECIPE_TITLES = async () => {
	const results = await sql`
	SELECT *
	FROM chefs_recipes
	`;
	return results.rows;
}
export const GET_RECIPE_TITLES_BY_CAT = async () => {
	const results = await sql`
		SELECT 
				r.category,
				JSON_AGG(
						JSON_BUILD_OBJECT(
								'id', r.id,
								'title', r.title,
								'slug', r.slug
						)
				) AS recipes
		FROM chefs_recipes AS r
		GROUP BY r.category;
	`;
	return results.rows;
}

// first create recipe, then can use id to insert ingrs
export const CREATE_NEW_RECIPE = async (recipe: any) => {
	const results = await sql`
		INSERT INTO chefs_recipes (
		category,
			title,
			label,
			slug,
			steps,
			notes
		) VALUES (${recipe.category}, ${recipe.title}, ${recipe.label}, ${recipe.slug}, ${recipe.steps}, ${recipe.notes})
		RETURNING id, slug
	`;

	return results;
}

// adds a single recipe ingr entry
export const ADD_RECIPE_INGRS = async (id: number, ingrsMap: any) => {
	const results = await sql`
		INSERT INTO chefs_recipe_ingrs (
			recipe_id,
			ingr_id,
			qty,
			measure,
			note
		) VALUES (${id}, ${ingrsMap.ingr_id}, ${ingrsMap.qty}, ${ingrsMap.measure}, ${ingrsMap.note})
		RETURNING (id, recipe_id, ingr_id)
	`;
	return results;
}

export const GET_CHEFS_RECIPE_BY_SLUG = async (slug: string) => {
	try {
	const results = await sql`
		SELECT 
				r.id AS id,
				r.category,
				r.title AS title,
				r.steps,
				r.notes,
				JSON_AGG(
						JSON_BUILD_OBJECT(
								'brand_name', i.brand,
								'packaged_name', i.packaged_name,
								'qty', ri.qty,
								'measure', ri.measure,
								'note', ri.note
						)
				) AS ingredients
		FROM chefs_recipes r
		JOIN chefs_recipe_ingrs ri ON r.id = ri.recipe_id
		JOIN ingrs i ON ri.ingr_id = i.id
		WHERE r.slug = ${slug}
		GROUP BY r.id;
	`;
	return results.rows[0];
	} catch (error) {
		console.log("got error from query: ", error)
	}

}

export const GET_PRODUCTS_BY_CAT = async () => {
	const results = await sql`
		SELECT 
			products.category,
				JSON_AGG(
						JSON_BUILD_OBJECT(
								'id', products.id,
								'name', products.name,
								'slug', products.slug
						)
				) AS products
		FROM products
		GROUP BY products.category;
	`
	return results.rows;
}

export const GET_PRODUCT_BY_SLUG = async (slug: string) => {
	const results = await sql`
		SELECT 
			products.id,
			products.name,
			products.category,
			products.description,
			products.steps,
			products.notes
		FROM products 
		WHERE products.slug LIKE ${slug}
	`
	return results.rows[0];
}

export const GET_PRODUCT_COMPONENTS_BY_ID = async (id: number) => {
	const results = await sql`
		SELECT 
			products.id,
			product_recipes.component,
				JSON_AGG(
						JSON_BUILD_OBJECT(
								'id', chefs_recipes.id,
								'title', chefs_recipes.title,
								'slug', chefs_recipes.slug
						)
				) AS recipes
		FROM products 
		JOIN product_recipes on products.id = product_recipes.product_id
		JOIN chefs_recipes on product_recipes.recipe_id = chefs_recipes.id
		WHERE products.id = ${id}
		GROUP BY products.id, product_recipes.component
	`
	return results.rows;
}