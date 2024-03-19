

export const dropTables = async (pool) => {
	try {

		await pool.query(`
	  DROP TABLE IF EXISTS recipe_categories;
	`);
		await pool.query(`
	  DROP TABLE IF EXISTS recipes;
	`);
		await pool.query(`
	  DROP TABLE IF EXISTS categories;
	`);
		console.log('db table drops complete');
	} catch (error) {
		console.error('Error dropping tables', error);
	} 
}

// dropTables();