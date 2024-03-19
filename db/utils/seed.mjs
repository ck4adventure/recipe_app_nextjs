import recipes_data from '../seeds/categories_recipes_seeds.json' assert { type: 'json' };
// seedTables uses client rather than pool because it's a one-off operation
export const seedTables = async (pool) => {
	try {
		// create every category that exists
		for (const categoryName of Object.keys(recipes_data)) {
			const { rows } = await pool.query(`INSERT INTO categories (name) VALUES ('${categoryName}') RETURNING id`);
			const categoryId = rows[0].id;
			const categoryRecipes = recipes_data[categoryName];
			// skip if no recipes to add
			if (!categoryRecipes || categoryRecipes.length === 0) {
				continue;
			}
			for (const recipe of categoryRecipes) {
				const recipeData = await pool.query(`INSERT INTO recipes (title) VALUES ('${recipe.title}') RETURNING id`);
				const recipeId = recipeData.rows[0].id;
				await pool.query(`INSERT INTO recipe_categories (recipe_id, category_id) VALUES ('${recipeId}','${categoryId}')`);
			}
		}
		console.log('db tables seeded')

	} catch (error) {
		console.error('error seeding tables', error);
	} 
}

seedTables();