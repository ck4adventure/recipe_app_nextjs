'use server'
import { sql } from '@vercel/postgres';

export const GET_AUTHORS = async () => {
	const results = await sql`SELECT * FROM authors ORDER BY name asc`;
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

export const CREATE_AUTHOR = async (authorName: string, isProfi: boolean) => {
	console.log("create author: ", authorName, isProfi)
	const result = await sql`
		INSERT INTO authors (name, is_profi) VALUES (${authorName}, ${isProfi}) RETURNING id;
	`
	return result.rows[0]
}

export const UPDATE_AUTHOR = async (authorID: number, authorName: string, isProfi: boolean) => {
		const result = await sql`
		UPDATE authors SET name = ${authorName}, is_profi = ${isProfi} WHERE id = ${authorID} RETURNING *
	`;
	return result.rows[0];
}

export const GET_SOURCES = async () => {
	const results = await sql`SELECT * FROM sources ORDER BY title asc`;
	return results.rows;
};

export const GET_SOURCE_AND_RECIPES_BY_ID = async (sourceId: number) => {
	const results = await sql`
		SELECT r.id as recipe_id, r.title as recipe_title, r.slug as recipe_slug, 
		    s.id as source_id, s.title as source_title, 
				a.id as author_id, a.name as author_name, a.slug as author_slug
		FROM recipes r
		JOIN sources s on r.source_id = s.id
		JOIN authors a on r.author_id = a.id
		WHERE r.source_id = ${sourceId}
	`;
	return results.rows;
};

export const GET_SOURCE_DATA_BY_ID = async (sourceId: number) => {
	const results = await sql`SELECT * FROM sources WHERE id = ${sourceId}`;
	return results.rows[0];
};

export const CREATE_SOURCE = async (name: string, source_type: string, url: string, singleAuthor: boolean) => {
	const result = await sql`INSERT into SOURCES (title, source_type, source_url, single_author) VALUES (${name}, ${source_type}, ${url}, ${singleAuthor})`
	return result.rows;
}

export const UPDATE_SOURCE = async (sourceId: number, name: string, source_type: string, url: string, singleAuthor: boolean) => {
	const result = await sql`
		UPDATE sources
		SET title = ${name}, source_type = ${source_type}, source_url = ${url}, single_author = ${singleAuthor}
		WHERE id = ${sourceId}
		RETURNING *;
	`;
	return result.rows;
}

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

export const GET_RECIPES_FOR_CATEGORY_SLUG = async (categorySlug: string) => {
	const results = await sql`
		SELECT r.id AS recipe_id, r.title AS recipe_title, r.slug AS recipe_slug, c.id AS category_id, c.name AS category_name
		FROM recipes r 
		LEFT JOIN categories c ON r.category_id = c.id
		WHERE c.name = ${categorySlug}
	`;
	return results.rows;
};

export const GET_RECIPE_BY_SLUG = async (slug: string) => {
	const results = await sql`
		SELECT r.id as recipe_id, r.title as recipe_title,
			r.slug as recipe_slug,
			c.id as category_id, c.name as category_name,
			s.id as source_id, s.title as source_title,
			a.id as author_id, a.name as author_name,
			ingredients, steps, notes
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
		LEFT JOIN (
			SELECT recipe_id, array_agg(note) as notes
			FROM recipe_notes
			GROUP BY recipe_id
		) rn ON r.id = rn.recipe_id
		WHERE r.slug = ${slug}
	`;

	return results.rows[0];
};

export const CREATE_RECIPE = async (title: string, categoryId: number, sourceId: number, authorID: number) => {
	const results = await sql`
		INSERT INTO recipes (title, category_id, source_id, author_id) VALUES (${title}, ${categoryId}, ${sourceId}, ${authorID}) RETURNING id, slug
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

export const ADD_NOTE_TO_RECIPE = async (recipeId: number, note: string) => {
	await sql`
		INSERT INTO recipe_notes (recipe_id, note) VALUES (${recipeId}, ${note})
	`;
};

export const DELETE_RECIPE_NOTES = async (recipeId: number) => {
	await sql`DELETE FROM recipe_notes WHERE recipe_id = ${recipeId}`;
};

export const UPDATE_RECIPE = async (recipeId: number, title: string, categoryId: number, sourceId: number, authorId: number, ingredients?: string[], steps?: string[]) => {
	const result = await sql`
		UPDATE recipes SET title = ${title}, category_id = ${categoryId}, source_id = ${sourceId}, author_id = ${authorId} WHERE id = ${recipeId} RETURNING slug
	`;
	return result.rows[0];
};

export const DELETE_RECIPE_BY_ID = async (recipeId: number) => {
	await sql`DELETE FROM recipes WHERE id = ${recipeId}`;
}