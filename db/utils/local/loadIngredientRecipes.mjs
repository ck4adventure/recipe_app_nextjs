import fs from 'fs';
import path from 'path';

// load recipe
// iterate over ingredients
// gen ingr ingredients list and allergens list
// save recipe
// use info to save ingredient under same name as recipe
// ideally a link between two, ingredient has a recipe
// on recipe.ingredients update, would want to regen ingredients list and allergens


export const loadIngredientRecipes = async (pool) => {
	try {
		//recipe_store/recipes/almond_cream/chocolate_almond_cream.mjs
		// for each recipe file that is also an ingredient
		const ingrRecipeFiles = fs.readdirSync(path.join(process.cwd(), 'recipe_store', 'ingr_recipes'));
		for (const file of ingrRecipeFiles) {
			const filePath = path.join(process.cwd(), 'recipe_store', 'ingr_recipes', file);
			const { default: recipe } = await import(filePath);
			console.log("recipe: ", recipe.id); // id in this case is slug (uniq)

			let allergens = new Set();
			let label_ingredients = [];

			// It goes from a Recipe to being an Ingredient Row
			// INGR
			// slug -> taken from recipe.id
			// category -> 'homemade' for now til better idea
			// brand -> ''
			// packaged_name -> recipe title
			// label_name -> recipe label
			// ingredients -> array of strings (these we look up, taken from ingr.label_name)
			// allergens -> array of strings, controlled values

			for (const ingredient of recipe.ingredients) {
				// console.log("processing ingr: ", ingredient.name)
				const ingrResult = await pool.query(
					`SELECT * FROM ingrs WHERE slug = $1`,
					[ingredient.name]
				);

				if (ingrResult.rows.length === 0) {
					console.error(`Ingredient not found: ${ingredient.name}`);
					continue; // Skip this ingredient if not found
				} else {
					// build allergens array
					const ingr = ingrResult.rows[0];
					if (ingr.allergens.length > 0) {
						ingr.allergens.forEach(a => allergens.add(a));
					}

					label_ingredients.push(ingr.label_name);
				}
			}

			// should now have allergens and ingredients collected
			console.log('allergens final: ', [...allergens.values()]);
			console.log('ingredients final: ', label_ingredients)

			// Create Recipe
			// title
			// label
			// steps
			// notes

			// change style from UPPERCASE_UNDERSCORE_SPACING to lowercase-dash-spacing
			// ex: "CANDIED_LEMON_PEEL" to 'candied-lemon-peel'
			const recipeSlug = recipe.id.replace(/_/g, '-').toLowerCase();
			const recipeResult = await pool.query(`
				INSERT INTO chefs_recipes (
					title,
					label,
					slug,
					steps,
					notes
				) VALUES ($1, $2, $3, $4, $5)
			`, [recipe.title, recipe.label, recipeSlug, recipe.steps, recipe.notes])

			console.log('recipe saved: ', recipeResult.rows[0]);

			// Then Ingr listing

			const ingrResult = await pool.query(
				`INSERT INTO ingrs (
					category,
					slug,
					brand, 
					packaged_name, 
					label_name, 
					ingredients, 
					allergens
			) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
				['homemade', recipeSlug, '', recipe.title, recipe.label, label_ingredients, [...allergens.values()]]
			);

			console.log('ingr created: ', ingrResult.rows[0]);
		}

		console.log('ingredient recipes files script finished');
	} catch (error) {
		console.error(error);
	}
}

// migrateTables();