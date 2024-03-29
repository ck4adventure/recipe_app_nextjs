// setupDB imports a client, connects it
// then passes it into each db util function
// to first drop, then create and finally seed the tables
import { pool } from '../db/db.mjs'
import { dropTables } from '../db/utils/drop.mjs';
import { migrateTables } from '../db/utils/migrate.mjs';
import { seedTables } from '../db/utils/seed.mjs';
import { seedExample } from '../db/utils/seed_example.mjs';

export const setupDB = async () => {
	const client = await pool.connect();
	try {

	await dropTables(client);
	await migrateTables(client);
	await seedTables(client);
	await seedExample(client);
	} catch (error) {
		console.error(error);
	} finally {
		client.release();
	}
};

setupDB();