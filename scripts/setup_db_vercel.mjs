import { createClient } from '@vercel/postgres';

import { dropTables } from '../db/utils/drop_vercel.mjs';
import { migrateTables } from '../db/utils/migrate_vercel.mjs';
import { loadAuthorsAndSources } from '../db/utils/loaders/load_authors_sources.mjs';
import { loadCategories } from '../db/utils/loaders/load_categories.mjs';
import { loadFoods } from '../db/utils/loaders/load_foods.mjs';
import dotenv from 'dotenv';
import { loadRecipes } from '../db/utils/loaders/load_recipes.mjs';


import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const setupDB = async () => {
	// console.log("setting up db", process.env.POSTGRES_URL_NON_POOLING);
	const client = createClient({
		connectionString: process.env.POSTGRES_URL_NON_POOLING
	});
	try {
		await client.connect();
		console.log("client connected");
		await dropTables(client);
		await migrateTables(client);
		await loadAuthorsAndSources(client);
		await loadCategories(client);
		await loadFoods(client);
		await loadRecipes(client);
		console.log("all scripts run");
	} catch (error) {
		console.error(error);
		throw error;
	} finally {
		await client.end();
		console.log("client should be closed now");
	}
}

setupDB();