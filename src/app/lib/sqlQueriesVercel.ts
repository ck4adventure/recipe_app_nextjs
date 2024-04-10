import { sql } from '@vercel/postgres';

export const GET_AUTHORS = async () => {
	const results = await sql`SELECT * FROM authors`;
	return results.rows;
}

export const GET_AUTHOR_AND_SOURCES_BY_ID = async (authorId: number) => {
	const results = await sql`SELECT DISTINCT a.id as author_id, a.name as author_name, a.is_profi, s.title as source_title, s.source_type, s.source_url, s.id as source_id
		FROM recipes r
		JOIN sources s on r.source_id = s.id
		JOIN authors a on r.author_id = a.id
		WHERE r.author_id = ${authorId}`;
	return results.rows;
}
export const GET_AUTHOR_BY_ID = async (authorId: number) => {
	const result = await sql`SELECT * FROM authors WHERE id = ${authorId}`;
	return result.rows[0];
};

export const GET_SOURCES = async () => {
	const results = await sql`SELECT * FROM sources`;
	return results.rows;
};

export const GET_SOURCE_BY_ID = async (sourceId: number) => {
	const results = await sql`
		SELECT r.id as recipe_id, r.title as recipe_title, r.slug as recipe_slug, 
		    s.id as source_id, s.title as source_title, 
				a.id as author_id, a.name as author_name, a.slug as author_slug
		FROM recipes r
		JOIN sources s on r.source_id = s.id
		JOIN authors a on r.author_id = a.id
		WHERE r.source_id = ${sourceId}
	`;
	return results.rows[0];
};

export const GET_SOURCE_DATA_BY_ID = async (sourceId: number) => {
	const results = await sql`SELECT * FROM sources WHERE id = ${sourceId}`;
	return results.rows;
};

export const GET_CATEGORIES = async () => {
	const results = await sql`SELECT * FROM categories`;
	return results.rows;
};

export const GET_CATEGORIES_AND_RECIPES = async () => {
	const results = await sql`
		SELECT c.id AS category_id, c.name AS category_name, r.id AS recipe_id, r.title AS recipe_title, r.slug AS recipe_slug
		FROM categories c LEFT JOIN recipes r ON c.id = r.category_id
	`;
	return results.rows;
};

export const GET_RECIPES_FOR_CATEGORY_NAME = async (categoryName: string) => {
	const results = await sql`
		SELECT r.id AS recipe_id, r.title AS recipe_title, r.slug AS recipe_slug, c.id AS category_id, c.name AS category_name
		FROM recipes r 
		LEFT JOIN categories c ON r.category_id = c.id
		WHERE c.name = ${categoryName}
	`;
	return results.rows;
};

export const GET_RECIPE_BY_SLUG = async (slug: string) => {
	const results = await sql`
		SELECT r.id as recipe_id, r.title as recipe_title,
			c.id as category_id, c.name as category_name,
			s.id as source_id, s.title as source_title,
			a.id as author_id, a.name as author_name,
			ingredients, steps
		FROM recipes r
		INNER JOIN categories c ON r.category_id = c.id
		INNER JOIN sources s on r.source_id = s.id
		INNER JOIN authors a on r.author_id = a.id
		LEFT JOIN (
			SELECT recipe_id, array_agg(ingredient) as ingredients
			FROM recipe_ingredients
			GROUP BY recipe_id
		) ri ON r.id = ri.recipe_id
		LEFT JOIN (
			SELECT recipe_id, array_agg(step) as steps
			FROM recipe_steps
			GROUP BY recipe_id
		) rs ON r.id = rs.recipe_id
		WHERE r.slug = ${slug}
	`;
	return results.rows[0];
};

export const CREATE_RECIPE = async (title: string, categoryId: number, sourceId: number) => {
	const results = await sql`
		INSERT INTO recipes (title, category_id, source_id) VALUES (${title}, ${categoryId}, ${sourceId}) RETURNING id
	`;
	return results.rows[0];
};

export const ADD_INGREDIENT_TO_RECIPE = async (recipeId: number, ingredient: string) => {
	await sql`
		INSERT INTO recipe_ingredients (recipe_id, ingredient) VALUES (${recipeId}, ${ingredient})
	`;
};

export const DELETE_RECIPE_INGREDIENTS = async (recipeId: number) => {
	await sql`DELETE FROM recipe_ingredients WHERE recipe_id = ${recipeId}`;
};

export const ADD_STEP_TO_RECIPE = async (recipeId: number, step: string) => {
	await sql`
		INSERT INTO recipe_steps (recipe_id, step) VALUES (${recipeId}, ${step})
	`;
};

export const DELETE_RECIPE_STEPS = async (recipeId: number) => {
	await sql`DELETE FROM recipe_steps WHERE recipe_id = ${recipeId}`;
};

export const UPDATE_RECIPE = async (recipeId: number, title: string, categoryId: number, sourceId: number) => {
	const result = await sql`
		UPDATE recipes SET title = ${title}, category_id = ${categoryId}, source_id = ${sourceId} WHERE id = ${recipeId} RETURNING slug
	`;
	return result.rows[0];
};