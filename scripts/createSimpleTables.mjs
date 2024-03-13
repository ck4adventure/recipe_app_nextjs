import { client } from '../db/db.mjs';

export async function createTables(inClient = client) {
	try {
		await inClient.connect();
		await inClient.query(`
	  CREATE TABLE IF NOT EXISTS categories (
		  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		  name VARCHAR(255) NOT NULL
	  )
	`);

		await inClient.query(`
	  CREATE TABLE IF NOT EXISTS recipes (
		  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		  title VARCHAR(400) NOT NULL
	  )
	`);

		await inClient.query(`
	  CREATE TABLE IF NOT EXISTS recipe_categories (
	  	id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	  	recipe_id INTEGER REFERENCES recipes(id),
	  	category_id INTEGER REFERENCES categories(id)
		)
	`);

		console.log('db table creations complete');
	} catch (error) {
		console.error('Error creating tables', error);
	} finally {
		inClient.end();
	}
}

createTables();