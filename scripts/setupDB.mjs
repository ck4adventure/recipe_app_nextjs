// setupDB imports a client, connects it
// then passes it into each db util function
// to first drop, then create and finally seed the tables
import { client } from '../db/db.mjs'
import { dropTables } from '../db/utils/drop.mjs';
import { migrateTables } from '../db/utils/migrate.mjs';
import { seedTables } from '../db/utils/seed.mjs';

export const setupDB = async () => {
	try {
	await client.connect();
	await dropTables(client);
	await migrateTables(client);
	await seedTables(client);
	} catch (error) {
		console.error(error);
	} finally {
		await client.end();
	}
};

setupDB();