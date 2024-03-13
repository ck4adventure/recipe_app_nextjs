import { query } from '../../../db/index.mjs';
import { Recipe } from './definitions';

// createRecipeWithCategory finds the latest recipe so that it can get the id
// then it attempts to create a new recipe with the given title
// then it uses the recipe id to create a new recipe_category row
export const createRecipeWithCategory = async (title: string, category_id: number) => {
	const res = await query(`SELECT id FROM recipes ORDER BY id DESC LIMIT 1`);
	console.log(res.rows)
	// const recipe_id = res.rows[0].id + 1;
	// await query(`INSERT INTO recipes (id, title) VALUES ($1, $2)`, [recipe_id, title]);
	// await query(`INSERT INTO recipe_categories (recipe_id, category_id) VALUES ($1, $2)`, [recipe_id, category_id]);
}