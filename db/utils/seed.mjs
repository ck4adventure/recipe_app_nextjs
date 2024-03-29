import recipes_data from '../seeds/categories_recipes_seeds.json' assert { type: 'json' };
import authors_sources_data from '../seeds/authors_sources_seeds.json' assert { type: 'json' };
// seedTables uses client rather than pool because it's a one-off operation
export const seedTables = async (pool) => {
	try {
    // create authors and sources
		for (const author of Object.values(authors_sources_data)) {
			await pool.query(`INSERT INTO authors (first_name, last_name, is_profi) VALUES ('${author.first_name}', '${author.last_name}', ${author.is_profi})`);
			if (author.sources && author.sources.length > 0) {
				console.log(author.sources)
				for (const source of author.sources) {
					const stype = source.source_type;
					const stitle = source.title | null;
					const surl = source.url | null;
					await pool.query(`INSERT INTO sources (source_type, source_title, source_url) VALUES ('${stype}', '${stitle}', '${surl}')`);
				}
			}
		}
		console.log('authors and sources seeded')


		// create every category that exists
		for (const categoryName of Object.keys(recipes_data)) {
			console.log('creating category: ', categoryName);
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
				// only do if ingredients exist
				if (recipe.ingrs && recipe.ingrs.length > 0) {
					for (const ingredient of recipe.ingrs) {
						await pool.query(`INSERT INTO recipe_ingredients (recipe_id, ingredient) VALUES ('${recipeId}','${ingredient}')`);
					}
				}
				// only do if steps exist
				if (recipe.steps && recipe.steps.length > 0) {
					for (const step of recipe.steps) {
						await pool.query(`INSERT INTO recipe_steps (recipe_id, step) VALUES ('${recipeId}','${step}')`);
					}
				}
			}
		}
		console.log('db tables seeded')

	} catch (error) {
		console.error('error seeding tables', error);
	} 
}