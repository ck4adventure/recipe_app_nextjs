import fs from 'fs';
import path from 'path';
// first read in the files, then sort
// then open the connection to client
// then read in each file
// catch any errors
// and finallly end the client connection
// migrateTables takes a pool/client and runs all sql migrations in numerical order
export const loadChefsRecipesAndIngrs = async (client) => {
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
				const recipeResult = await client.sql`
				INSERT INTO chefs_recipes (
				category,
					title,
					label,
					slug,
					steps,
					notes
				) VALUES (${recipeCatFolder}, ${recipe.title}, ${recipe.label}, ${recipeSlug}, ${recipe.steps}, ${recipe.notes})
				RETURNING id, label
			`;

				const recipeId = recipeResult.rows[0].id;
				const recipeName = recipeResult.rows[0].label;
				console.log(recipeName, recipeId);

				for (const ingredient of recipe.ingredients) {
					console.log("adding recipe ingr: ", ingredient.name)
					const ingrResult = await client.sql`
						SELECT id FROM ingrs WHERE slug LIKE ${ingredient.name}`;

					if (ingrResult.rows.length === 0) {
						console.error(`Ingredient not found: ${ingredient.name}`);
						throw new Error('ingredient not found');
					} else {
						const ingrID = ingrResult.rows[0].id;

						await client.sql`
							INSERT INTO chefs_recipe_ingrs (
								recipe_id,
								ingr_id,
								qty,
								measure,
								note
							) VALUES (${recipeId}, ${ingrID}, ${ingredient.qty}, ${ingredient.unit}, ${ingredient.note})
						`;
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