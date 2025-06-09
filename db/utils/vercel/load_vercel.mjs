// import { loadAuthorsAndSources } from '../db/utils/loaders/vercel/load_authors_sources.mjs';
// import { loadCategories } from '../db/utils/loaders/vercel/load_categories.mjs';
// import { loadFoods } from '../db/utils/loaders/vercel/load_foods.mjs';
// import { loadRecipes } from '../db/utils/loaders/vercel/load_recipes.mjs';
// import { loadSampleLogs } from '../db/utils/loaders/vercel/load_sample_logs.mjs';
// import { loadChefsRecipesAndIngrs } from "./data_loaders/load_chefs_recipes_ingrs.mjs";
// import { loadIngrsRecipes } from "./data_loaders/load_ingr_recipes.mjs";
// import { loadIngrsData } from "./data_loaders/load_ingrs.mjs";

import { loadUsers } from "./data_loaders/load_users.mjs"

// import { loadProductsAndRecipes } from "./data_loaders/load_products_and_recipes.mjs"

export const loadDataVercel = async (client) => {
		// await loadAuthorsAndSources(client);
		// await loadCategories(client);
		// await loadFoods(client);
		// await loadRecipes(client);
		// await loadSampleLogs(client);
		// await loadIngrsData(client);
		// await loadIngrsRecipes(client);
		// await loadChefsRecipesAndIngrs(client);
		// await loadProductsAndRecipes(client);
    await loadUsers(client);
		
}