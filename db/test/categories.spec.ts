// categories table
// should exist
// columns: id, name 
// name is required and unique
describe("categories table", () => {
	// import the client
	const { client } = require('../db/db.mjs');
	// import the createTables function
	const { createTables } = require('../scripts/createSimpleTables.mjs');
	// import the dropTables function
	const { dropTables } = require('../scripts/dropTables.mjs');

	// before all tests, drop the tables and create the tables
	before(async () => {
		await dropTables();
		await createTables();
	});

	// after all tests, drop the tables
	after(async () => {
		await dropTables();
	});
	
	// test the name column
	it("has a name column", async () => {
		const result = await client.query(`
				SELECT column_name
				FROM information_schema.columns
				WHERE table_name = 'categories'
			`);
		const columnNames = result.rows.map((row: any) => row.column_name);
		expect(columnNames).to.include('name');
	});

	// test the name column is required
	it("name is required", async () => {
		let error;
		try {
			await client.query(`
					INSERT INTO categories (name) VALUES (null)
				`);
		} catch (e) {
			error = e;
		}
		expect(error).to.be.true;
	});

	// test the name column is unique
	it("name is unique", async () => {
		await client.query(`
				INSERT INTO categories (name) VALUES ('breakfast')
			`);
		let error;
		try {
			await client.query(`
					INSERT INTO categories (name) VALUES ('breakfast')
				`);
		} catch (e) {
			error = e;
		}
		expect(error).to.be.true;
	});
});