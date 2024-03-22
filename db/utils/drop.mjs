// dropTables takes a pool (or client) and drops all tables in the database

export const dropTables = async (pool) => {
	try {
		await pool.query(`
	  	DROP TABLE IF EXISTS recipe_ingredients;
		`);

		await pool.query(`
	  DROP TABLE IF EXISTS recipe_categories;
	`);
		await pool.query(`
	  DROP TABLE IF EXISTS recipes;
	`);
		await pool.query(`
	  DROP TABLE IF EXISTS categories;
	`);
		console.log('db tables dropped');
	} catch (error) {
		console.error('Error dropping tables', error);
	}
}