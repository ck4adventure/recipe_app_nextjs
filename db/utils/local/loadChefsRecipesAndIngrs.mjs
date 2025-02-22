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
				// console.log(recipe.ingredients);

				// const recipeResult = await pool.query(
				// 	`INSERT INTO chefs_recipes (
				// 	title,
				// 	label,
				// 	steps,
				// 	notes
				// 	) VALUES ($1, $2, $3, $4) RETURNING id`,
				// 	[recipe.title, recipe.label, recipe.steps, recipe.notes]
				// );

				// const recipeId = recipeResult.rows[0].id;
				// console.log(recipeId);

				for (const ingredient of recipe.ingredients) {
					// console.log("processing ingr: ", ingredient.name)
					const ingrResult = await pool.query(
						`SELECT id FROM ingrs WHERE slug = $1`,
						[ingredient.name]
					);

					if (ingrResult.rows.length === 0) {
						console.error(`Ingredient not found: ${ingredient.name}`);
						continue; // Skip this ingredient if not found
					}
				}

			}
		}
		// // read and run each file		
		// for (const file of sortedFiles) {
		// 	const sql = fs.readFileSync(path.join(process.cwd(), 'db', 'migrations', 'todo', file), 'utf-8');
		// 	await pool.query(sql);
		// 	console.log(`Migrated ${file}`);
		// }
		console.log('chefs_recipes file script finished');
	} catch (error) {
		console.error(error);
	}
}

// migrateTables();