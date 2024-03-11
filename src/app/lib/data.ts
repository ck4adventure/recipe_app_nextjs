// import { cache } from 'react'
import { query } from '../../../db/index.mjs'

export const getRecipeCategoriesTitles = (async () => {
	const results: { [key: string]: any } = {}
	// wraps pool.query(text, params, callback) in a promise
	const { rows } = await query('SELECT id, name FROM categories ORDER BY name ASC;')
	await rows.forEach(async (row: any) => {
		const recipeResults = await query(`
		SELECT categories.name as category, recipes.title, recipes.id
		FROM recipes
		JOIN recipe_categories ON recipes.id = recipe_categories.recipe_id
		JOIN categories ON recipe_categories.category_id = categories.id;
		`)
		results[row.name] = recipeResults.rows
	})

	return results
})