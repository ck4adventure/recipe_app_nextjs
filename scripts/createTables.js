import { client } from '../db/db.mjs';

export async function createTables(inClient = client) {
  try {
    await inClient.connect();
    await inClient.query(`
	  CREATE TABLE IF NOT EXISTS categories (
		  id SERIAL PRIMARY KEY,
		  name VARCHAR(255) NOT NULL
	  )
	`);

    await inClient.query(`
	  CREATE TABLE IF NOT EXISTS recipes (
		  id SERIAL PRIMARY KEY,
		  title VARCHAR(400) NOT NULL,
		  slug VARCHAR(400) NOT NULL UNIQUE
	  )
	`);

    await inClient.query(`
	  CREATE TABLE IF NOT EXISTS recipe_categories (
	  	id SERIAL PRIMARY KEY,
	  	recipe_id INT REFERENCES recipes(id),
	  	category_id INT REFERENCES categories(id)
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