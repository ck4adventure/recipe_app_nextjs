import { pool } from '../db/db.mjs'
import { dropTables } from '../db/utils/drop.mjs';
import { migrateTables } from '../db/utils/migrate.mjs';
import { loadData } from '../db/utils/loadData.mjs';

const setupDB = async () => {
	const client = await pool.connect();
	console.log("pool connected");
	try {
		await dropTables(client);
		await migrateTables(client);
		// await loadData(client);
	} catch (error) {
		console.error(error);
		throw error;
	} finally {
		client.release();
		console.log("pool should be closed now");
	}
}

setupDB();