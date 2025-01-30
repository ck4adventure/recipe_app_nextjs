// drop_vercel takes a client and drops all tables in the database using vercels sql templating

export const dropTables = async (client) => {
	try {
		await client.sql`DROP TABLE IF EXISTS ingrs`
		await client.sql`
			DROP TABLE IF EXISTS dough;
			DROP TYPE IF EXISTS flour_blend_type;
			DROP TABLE IF EXISTS leaven;
		`;
		await client.sql`
			DROP TABLE IF EXISTS foods;
		`;
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