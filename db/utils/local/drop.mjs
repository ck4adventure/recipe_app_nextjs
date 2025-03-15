// dropTables takes a pool (or client) and drops all tables in the database

export const dropLocalTables = async (pool) => {
	try {

        await pool.query(`
            DROP TABLE IF EXISTS chefs_recipe_ingrs CASCADE;
            DROP TABLE IF EXISTS chefs_recipes_ingrs CASCADE;
            DROP TRIGGER IF EXISTS update_chefs_recipes_ingrs_updated_at ON chefs_recipe_ingrs;
            DROP TRIGGER IF EXISTS update_chefs_recipe_ingrs_updated_at ON chefs_recipe_ingrs;
						DROP TYPE IF EXISTS measure_type CASCADE;
        `);

        await pool.query(`
            DROP TRIGGER IF EXISTS update_chefs_recipes_updated_at ON chefs_recipes;
            DROP TABLE IF EXISTS chefs_recipes CASCADE;
        `);

        await pool.query(`
            DROP TRIGGER IF EXISTS update_ingrs_updated_at ON ingrs;
            DROP TABLE IF EXISTS ingrs CASCADE;

        `);
	
				await pool.query(`
					DROP TABLE IF EXISTS dough CASCADE;
					DROP TYPE IF EXISTS flour_blend_type CASCADE;
			`);
			
				await pool.query(`
					DROP TABLE IF EXISTS leaven CASCADE;
			`);
				await pool.query(`
					DROP TABLE IF EXISTS recipe_steps CASCADE;
				`);
				await pool.query(`
					DROP TABLE IF EXISTS recipe_ingredients CASCADE;
				`);
				await pool.query(`
				DROP TABLE IF EXISTS recipe_categories CASCADE;
			`);
				await pool.query(`
				DROP TABLE IF EXISTS recipes CASCADE;
			`);

				await pool.query(`
				DROP TABLE IF EXISTS foods CASCADE;
			`);
				await pool.query(`
				DROP TABLE IF EXISTS categories CASCADE;
			`);
				await pool.query(`
					DROP TABLE IF EXISTS source_authors CASCADE;
				`);
				await pool.query(`
					DROP TABLE IF EXISTS sources CASCADE;
					DROP TYPE IF EXISTS sourcetyp CASCADE;
			`);
				await pool.query(`
					DROP TABLE IF EXISTS authors CASCADE;
				`);
		console.log('db tables dropped');
	} catch (error) {
		console.error('Error dropping tables', error);
	}
}