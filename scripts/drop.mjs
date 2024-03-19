import { client } from '../db/db.mjs';

export const dropTables = async () => {
	try {
		await client.connect();
		await client.query(`
	  DROP TABLE IF EXISTS recipe_categories;
	`);
		await client.query(`
	  DROP TABLE IF EXISTS recipes;
	`);
		await client.query(`
	  DROP TABLE IF EXISTS categories;
	`);
		console.log('db table drops complete');
	} catch (error) {
		console.error('Error dropping tables', error);
	} finally {
		client.end();
	}
}

dropTables();