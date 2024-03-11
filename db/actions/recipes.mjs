import { query } from '../index.mjs';

export const createRecipe = async (title) => {
	const idRes = await query(`SELECT id FROM recipes SORT BY id DESC LIMIT 1`)
	const id = idRes.rows[0].id + 1;
	await query(`INSERT INTO recipes (id, title) VALUES ($1, $2)`, [id, title]);
}

// createRecipeWithCategory takes a recipe title and a category ID
// and creates the entries for recipe and recipe_categories tables
export const createRecipeWithCategory = async (title, categoryID) => {
	const idRes = await query(`SELECT id FROM recipes SORT BY id DESC LIMIT 1`)
	const id = idRes.rows[0].id + 1;
	await query(`INSERT INTO recipes (id, title) VALUES ($1, $2)`, [id, title]);
	await query(`INSERT INTO recipe_categories (recipe_id, category_id) VALUES ($1, $2)`, [id, categoryID]);
}