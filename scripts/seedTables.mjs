import { client } from '../db/db.mjs';
import { recipes_data } from '../cypress/fixtures/recipes_data.js';
// seedTables uses client rather than pool because it's a one-off operation
export async function seedTables(inClient = client) {
	try {
		await inClient.connect();
		let counter = 0;
		Object.keys(recipes_data).forEach(async (category, index) => {
			const categoryRecipes = recipes_data[category];
			const { rows } = await inClient.query(`INSERT INTO categories (id, name) VALUES ('${index},${category}') RETURNING id`);
			const categoryId = rows[0].id;
			categoryRecipes.forEach(async (recipe) => {
				await inClient.query(`INSERT INTO recipes (id, title, slug) VALUES ('${recipe.id},${recipe.title},${recipe.slug}')`);
				await inClient.query(`INSERT INTO recipe_categories (id, recipe_id, category_id) VALUES ('${counter},${recipe.id},${categoryId}')`);
				counter++;
			});
		});
		console.log('db table seeds complete');
	} catch (error) {
		console.error('Error seeding tables', error);
	} finally {
		inClient.end();
	}
}

seedTables();