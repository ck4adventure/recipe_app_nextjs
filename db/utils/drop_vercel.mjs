// drop_vercel takes a client and drops all tables in the database using vercels sql templating

export const dropTables = async (client) => {
	try {
		await client.sql`
		  DROP TABLE IF EXISTS recipe_steps;
		`;
		await client.sql`
	  	DROP TABLE IF EXISTS recipe_ingredients;
		`;
		await client.sql`
	  DROP TABLE IF EXISTS recipe_categories;
	`;
		await client.sql`
	  DROP TABLE IF EXISTS recipes;
	`;
		await client.sql`
	  DROP TABLE IF EXISTS categories;
	`;
		await client.sql`
			DROP TABLE IF EXISTS source_authors;
		`;
		await client.sql`
			DROP TABLE IF EXISTS sources;
			DROP TYPE IF EXISTS sourcetyp;
	 `;
		await client.sql`
			DROP TABLE IF EXISTS authors;
		`;
		console.log('db tables dropped');
	} catch (error) {
		console.error('Error dropping tables', error);
	}
}