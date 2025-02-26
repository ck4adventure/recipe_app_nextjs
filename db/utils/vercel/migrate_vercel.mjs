

// first read in the files, then sort
// then open the connection to client
// then read in each file
// catch any errors
// and finallly end the client connection

import { createIngrsTable } from "./migrations/0011_ingrs.mjs";
import { createChefsRecipesTable } from "./migrations/0012_chefs_recipes.mjs";
import { createChefsRecipeIngrsTable } from "./migrations/0013_chefs_recipes_inrs.mjs";



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

		// ingrs
		await createIngrsTable(client);

		// chefs_recipes
		await createChefsRecipesTable(client);

		// chefs_recipes_ingrs
		await createChefsRecipeIngrsTable(client);
		
		console.log('Tables migrated successfully');
	} catch (error) {
		console.error(error);
	}
}

// migrateTables();