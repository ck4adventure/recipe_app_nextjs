import { createClient } from '@vercel/postgres';
import { dropTables } from '../db/utils/drop.mjs';
import { migrateTables } from '../db/utils/migrate.mjs';
import { loadData } from '../db/utils/loadData.mjs';

import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const setupDB = async () => {
	const client = createClient({
		connectionString: process.env.POSTGRES_URL_NON_POOLING
	});
	try {
		await client.connect();
		console.log("client connected");
		await dropTables(client);
		await migrateTables(client);
		await loadData(client);
	} catch (error) {
		console.error(error);
		throw error;
	} finally {
		await client.end();
		console.log("client should be closed now");
	}
}

setupDB();