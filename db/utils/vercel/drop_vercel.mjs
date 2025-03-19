// drop_vercel takes a client and drops all tables in the database using vercels sql templating

export const dropTables = async (client) => {
	try {
		await client.sql`
			DROP TABLE IF EXISTS product_recipes CASCADE;
			DROP TRIGGER IF EXISTS update_product_recipes_updated_at ON products;
			DROP TYPE IF EXISTS component_type;
		`;
		await client.sql`
			DROP TABLE IF EXISTS products CASCADE;
			DROP TRIGGER IF EXISTS update_products_updated_at ON products;
		`;

		// await client.sql`
    //         DROP TABLE IF EXISTS chefs_recipe_ingrs CASCADE;
    //         DROP TABLE IF EXISTS chefs_recipes_ingrs CASCADE;
    //         DROP TRIGGER IF EXISTS update_chefs_recipes_ingrs_updated_at ON chefs_recipe_ingrs;
    //         DROP TRIGGER IF EXISTS update_chefs_recipe_ingrs_updated_at ON chefs_recipe_ingrs;
		// 				DROP TYPE IF EXISTS measure_type CASCADE;
    //     `;

		// await client.sql`
    //         DROP TRIGGER IF EXISTS update_chefs_recipes_updated_at ON chefs_recipes;
    //         DROP TABLE IF EXISTS chefs_recipes CASCADE;
    //     `;

		// await client.sql`
    //         DROP TRIGGER IF EXISTS update_ingrs_updated_at ON ingrs;
    //         DROP TABLE IF EXISTS ingrs CASCADE;

    //     `;

		// 	await client.sql`
		// 		DROP TABLE IF EXISTS dough;
		// 		DROP TYPE IF EXISTS flour_blend_type;
		// 		DROP TABLE IF EXISTS leaven;
		// 	`;
		// 	await client.sql`
		// 		DROP TABLE IF EXISTS foods;
		// 	`;
		// 	await client.sql`
		// 	  DROP TABLE IF EXISTS recipe_steps;
		// 	`;
		// 	await client.sql`
		//   	DROP TABLE IF EXISTS recipe_ingredients;
		// 	`;
		// 	await client.sql`
		//   DROP TABLE IF EXISTS recipe_categories;
		// `;
		// 	await client.sql`
		//   DROP TABLE IF EXISTS recipes;
		// `;
		// 	await client.sql`
		//   DROP TABLE IF EXISTS categories;
		// `;
		// 	await client.sql`
		// 		DROP TABLE IF EXISTS source_authors;
		// 	`;
		// 	await client.sql`
		// 		DROP TABLE IF EXISTS sources;
		// 		DROP TYPE IF EXISTS sourcetyp;
		//  `;
		// 	await client.sql`
		// 		DROP TABLE IF EXISTS authors;
		// 	`;
		console.log('db tables dropped');
	} catch (error) {
		console.error('Error dropping tables', error);
	}
}