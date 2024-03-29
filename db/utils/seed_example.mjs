import example from '../seeds/complete_example.json' assert { type: "json" };
// seedTables uses client rather than pool because it's a one-off operation
export const seedExample = async (pool) => {
	try {
		// loop over entries in example
		console.log(Object.values(example));
		for (const authorEntry of Object.values(example)) {

			const { first_name, last_name, is_profi, books, sites } = authorEntry;

			// create author 
			const authorResult = await pool.query(`INSERT INTO authors (first_name, last_name, is_profi) VALUES ($1, $2, $3) RETURNING id`, [first_name, last_name, is_profi]);
			const authorId = authorResult.rows[0].id;
			
			// loop over any books
			if (books && books.length > 0) {
				for (const book of books) {
					const { title, recipes } = book;

					// create source of type BOOK
					const sourceResult = await pool.query(`INSERT INTO sources (source_type, source_title) VALUES ('BOOK',$1) RETURNING id`, [title]);
					const sourceId = sourceResult.rows[0].id;

					// create source_author entry
					await pool.query(`INSERT INTO source_authors (source_id, author_id) VALUES ($1, $2)`, [sourceId, authorId]);
					
					// create recipes
					if (recipes && recipes.length > 0) {
						for (const recipe of recipes) {

							// create recipe entry
							const recipeResult = await pool.query(`INSERT INTO recipes (title) VALUES ($1) RETURNING id`, [recipe.title]);
							const recipeId = recipeResult.rows[0].id;
							
							// create recipe_source entry
							await pool.query(`INSERT INTO recipe_source (source_id, recipe_id) VALUES ($1, $2)`, [sourceId, recipeId]);
							
							// create recipe_categories entries
							if (recipe.categories && recipe.categories.length > 0) {
								for (const category of recipe.categories) {
									// get Category ID
									const categoryResult = await pool.query(`SELECT id FROM categories WHERE name LIKE $1`, [category]);
									const categoryId = categoryResult.rows[0].id;

									// create recipe_categories entry
									await pool.query(`INSERT INTO recipe_categories (recipe_id, category_id) VALUES ($1, $2)`, [recipeId, categoryId]);
								}
							}
							
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

				}
			}
			// loop over any sites
			if (sites && sites.length > 0) {
				for (const site of sites) {
					const { title, url, recipes } = site;

					// create source of type SITE
					const sourceResult = await pool.query(`INSERT INTO sources (source_type, source_url, source_title) VALUES ('SITE',$1, $2) RETURNING id`, [url, title]);
					const sourceId = sourceResult.rows[0].id;

					// create source_author entry
					await pool.query(`INSERT INTO source_authors (source_id, author_id) VALUES ('${sourceId}','${authorId}')`);

					// create recipes
					if (recipes && recipes.length > 0) {
						for (const recipe of recipes) {
							const { title, url, categories, ingrs, steps } = recipe;

							// create recipe entry
							const recipeResult = await pool.query(`INSERT INTO recipes (title) VALUES ($1) RETURNING id`, [title]);
							const recipeId = recipeResult.rows[0].id;

							// create recipe_source entry
							await pool.query(`INSERT INTO recipe_source (source_id, recipe_id, page) VALUES ($1, $2, $3)`, [sourceId, recipeId, url || null]);

							// create recipe_categories entries
							if (categories && categories.length > 0) {
								for (const category of categories) {
									// get Category ID
									const categoryResult = await pool.query(`SELECT id FROM categories WHERE name = '${category}'`);
									const categoryId = categoryResult.rows[0].id;
									await pool.query(`INSERT INTO recipe_categories (recipe_id, category_id) VALUES ('${recipeId}','${categoryId}')`);
								}
							}

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
				}
			}
		}


	} catch (error) {
		console.error('error seeding example', error);
		throw error; 
	} 
}