import { createClient } from '@vercel/postgres';
import dotenv from 'dotenv';

// import { dropTables } from '../db/utils/vercel/drop_vercel.mjs';
import { migrateTables } from '../db/utils/vercel/migrate_vercel.mjs';
import { loadDataVercel } from '../db/utils/vercel/load_vercel.mjs';


// Load environment variables from .env file
dotenv.config();

// sets up VERCEL NEON instance in the cloud
const setupDB = async () => {
	// console.log("setting up db", process.env.POSTGRES_URL_NON_POOLING);
	const client = createClient({
		connectionString: process.env.POSTGRES_URL_NON_POOLING
	});
	try {
		await client.connect();
		console.log("client connected");

		// await dropTables(client);
		// await migrateTables(client);
		await loadDataVercel(client);

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