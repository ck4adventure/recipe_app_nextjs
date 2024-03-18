// // import testing libraries
// describe("recipes database", () => {
// 	// import the client
// 	const { client } = require('../db/db.mjs');
// 	// import the createTables function
// 	const { createTables } = require('../scripts/createSimpleTables.mjs');
// 	// import the dropTables function
// 	const { dropTables } = require('../scripts/dropTables.mjs');

// 	// before all tests, drop the tables and create the tables
// 	before(async () => {
// 		await dropTables();
// 		await createTables();
// 	});

// 	// after all tests, drop the tables
// 	after(async () => {
// 		await dropTables();
// 	});



// 	// test the recipes table
// 	describe("recipes table", () => {
// 		// test the title column
// 		it("has a title column", async () => {
// 			const result = await client.query(`
// 				SELECT column_name
// 				FROM information_schema.columns
// 				WHERE table_name = 'recipes'
// 			`);
// 			const columnNames = result.rows.map(row => row.column_name);
// 			expect(columnNames).toContain('title');
// 		});

// 		// test the title column is required
// 		it("title is required", async () => {
// 			let error;
// 			try {
// 				await client.query(`

// 			});
// 		});



// // recipe_categories table should exist
// // columns id, recipe_id, category_id
// // recipe_id and category_id are required
