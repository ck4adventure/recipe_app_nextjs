

// first read in the files, then sort
// then open the connection to client
// then read in each file
// catch any errors
// and finallly end the client connection

// import { createAuthorsTable } from "./migrations/authors.mjs";
// import { createCategoriesTable } from "./migrations/categories.mjs";
// import { createDoughTable } from "./migrations/dough.mjs";
// import { createFoodsTable } from "./migrations/foods.mjs";
import { createIngrsTable } from "./migrations/ingrs.mjs";
// import { createLeavenTable } from "./migrations/leaven.mjs";
// import { createRecipeIngredientsTable } from "./migrations/recipe_ingredients.mjs";
// import { createRecipeSteps } from "./migrations/recipe_steps.mjs";
// import { createRecipesTable } from "./migrations/recipes.mjs";
// import { createSourcesTable } from "./migrations/sources.mjs";
// import { createUpdateFunction } from "./migrations/update_updated_at.mjs";

// migrateTables takes a pool/client and runs all sql migrations in numerical order
export const migrateTables = async (client) => {
	try {
		console.log('Migrating tables...');
		// await createUpdateFunction(client);

		// // personal recipes manager
		// await createAuthorsTable(client);
		// await createSourcesTable(client);
		// await createFoodsTable(client);
		// await createCategoriesTable(client);
		// await createRecipesTable(client);
		// await createRecipeIngredientsTable(client);
		// await createRecipeSteps(client);
		
		// // loafer
		// await createLeavenTable(client);
		// await createDoughTable(client);

		// chef
		await createIngrsTable(client);
		
		console.log('Tables migrated successfully');
	} catch (error) {
		console.error(error);
	}
}

// migrateTables();