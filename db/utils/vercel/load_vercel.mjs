import { loadAuthorsAndSources } from '../db/utils/loaders/vercel/load_authors_sources.mjs';
import { loadCategories } from '../db/utils/loaders/vercel/load_categories.mjs';
import { loadFoods } from '../db/utils/loaders/vercel/load_foods.mjs';
import { loadRecipes } from '../db/utils/loaders/vercel/load_recipes.mjs';
// import { loadSampleLogs } from '../db/utils/loaders/vercel/load_sample_logs.mjs';

export const loadDataVercel = async (client) => {
		await loadAuthorsAndSources(client);
		await loadCategories(client);
		await loadFoods(client);
		await loadRecipes(client);
		// await loadSampleLogs(client);
}