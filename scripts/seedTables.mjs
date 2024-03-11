import { client, pool } from '../db/db.mjs';
import recipes_data from './categories_recipes_seeds.json' assert { type: 'json' };
// seedTables uses client rather than pool because it's a one-off operation
export async function seedTables(inClient = pool) {
	try {
		// await inClient.connect();
		let counter = 0;
		let catIndexCounter = 0;
		// create every category that exists
		for (const category of Object.keys(recipes_data)) {
			const { rows } = await inClient.query(`INSERT INTO categories (id, name) VALUES ('${catIndexCounter}','${category}') RETURNING id`);
			const categoryId = rows[0].id;
			const categoryRecipes = recipes_data[category];
			catIndexCounter += 1;
			// skip if no recipes to add
			if (!categoryRecipes || categoryRecipes.length === 0) {
				continue;
			}
			for (const recipe of categoryRecipes) {
				const recipeData = await inClient.query(`INSERT INTO recipes (id, title, slug) VALUES ('${recipe.id}','${recipe.title}','${recipe.slug}') RETURNING id`);
				const recipeId = recipeData.rows[0].id;
				await inClient.query(`INSERT INTO recipe_categories (id, recipe_id, category_id) VALUES ('${counter}','${recipeId}','${categoryId}')`);
				console.log(`counter was ${counter}`)
				counter += 1;
			}
		}

	} catch (error) {
		console.error('error seeding tables', error);
	} finally {
		// inClient.end();
		console.log('db table seeds complete');
	}
}

seedTables();