// dropTables takes a pool (or client) and drops all tables in the database

export const dropTables = async (pool) => {
	try {
		await pool.query(`
		DROP TABLE IF EXISTS ingrs
		`);
		await pool.query(`
			DROP TABLE IF EXISTS dough;
			DROP TYPE IF EXISTS flour_blend_type;
	`);
		await pool.query(`
			DROP TABLE IF EXISTS leaven;
	`);
		await pool.query(`
		  DROP TABLE IF EXISTS recipe_steps;
		`);
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
		DROP TABLE IF EXISTS foods
	`);
		await pool.query(`
	  DROP TABLE IF EXISTS categories;
	`);
		await pool.query(`
			DROP TABLE IF EXISTS source_authors;
		`);
		await pool.query(`
			DROP TABLE IF EXISTS sources;
			DROP TYPE IF EXISTS sourcetyp;
	 `);
		await pool.query(`
			DROP TABLE IF EXISTS authors;
		`);
		console.log('db tables dropped');
	} catch (error) {
		console.error('Error dropping tables', error);
	}
}