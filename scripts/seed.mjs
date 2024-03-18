import { client, pool } from '../db/db.mjs';
import recipes_data from '../db/seeds/categories_recipes_seeds.json' assert { type: 'json' };
// seedTables uses client rather than pool because it's a one-off operation
export async function seedTables(inClient = client) {
	try {
		await inClient.connect();
		// create every category that exists
		for (const categoryName of Object.keys(recipes_data)) {
			const { rows } = await inClient.query(`INSERT INTO categories (name) VALUES ('${categoryName}') RETURNING id`);
			const categoryId = rows[0].id;
			const categoryRecipes = recipes_data[categoryName];
			// skip if no recipes to add
			if (!categoryRecipes || categoryRecipes.length === 0) {
				continue;
			}
			for (const recipe of categoryRecipes) {
				const recipeData = await inClient.query(`INSERT INTO recipes (title) VALUES ('${recipe.title}') RETURNING id`);
				const recipeId = recipeData.rows[0].id;
				await inClient.query(`INSERT INTO recipe_categories (recipe_id, category_id) VALUES ('${recipeId}','${categoryId}')`);
			}
		}

	} catch (error) {
		console.error('error seeding tables', error);
	} finally {
		inClient.end();
		console.log('db table seeds complete');
	}
}

seedTables();