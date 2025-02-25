import fs from 'fs';
import path from 'path';
// first read in the files, then sort
// then open the connection to client
// then read in each file
// catch any errors
// and finallly end the client connection
// migrateTables takes a pool/client and runs all sql migrations in numerical order
export const loadChefsRecipesAndIngrs = async (pool) => {
	try {
		//recipe_store/recipes/almond_cream/chocolate_almond_cream.mjs
		const folders = fs.readdirSync(path.join(process.cwd(), 'recipe_store', 'recipes'));

		// almond_cream, chocolate // citrus // cookies
		for (const recipeCatFolder of folders) {
			// console.log("processing category: ", recipeCatFolder);
			const recipesFiles = fs.readdirSync(path.join(process.cwd(), 'recipe_store', 'recipes', recipeCatFolder));
			for (const file of recipesFiles) {
				// console.log("processing file", file);
				const filePath = path.join(process.cwd(), 'recipe_store', 'recipes', recipeCatFolder, file);
				const { default: recipe } = await import(filePath);

				// change style from UPPERCASE_UNDERSCORE to lowercase-dash-spacing
				const recipeSlug = recipe.id.toLowerCase().replace(/_/g, '-');
				const recipeResult = await pool.query(`
				INSERT INTO chefs_recipes (
					title,
					label,
					slug,
					steps,
					notes
				) VALUES ($1, $2, $3, $4, $5)
				RETURNING id
			`, [recipe.title, recipe.label, recipeSlug, recipe.steps, recipe.notes])

				const recipeId = recipeResult.rows[0].id;
				console.log(recipeId);

				for (const ingredient of recipe.ingredients) {
					console.log("adding recipe ingr: ", ingredient.name)
					const ingrResult = await pool.query(
						`SELECT id FROM ingrs WHERE slug LIKE ($1)`,
						[ingredient.name]
					);

					if (ingrResult.rows.length === 0) {
						console.error(`Ingredient not found: ${ingredient.name}`);
						throw new Error('ingredient not found');
					} else {
						const ingrID = ingrResult.rows[0].id;

						await pool.query(`
							INSERT INTO chefs_recipe_ingrs (
								recipe_id,
								ingr_id,
								qty,
								measure,
								note
							) VALUES ($1, $2, $3, $4, $5)
						`, [recipeId, ingrID, ingredient.qty, ingredient.unit, ingredient.note])
					}
				}

			}
		}
		console.log('chefs_recipes file script finished');
	} catch (error) {
		console.error(error);
	}
}

// migrateTables();