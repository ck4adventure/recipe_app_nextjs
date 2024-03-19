// categories table
// should exist
// columns: id, name 
// name is required and unique

import { client } from '../db/db.mjs';
describe("categories table", () => {
	// import the client
	// test the name column
	before(async () => {
		try {
			await client.connect();
			// run the migrations
		} catch (error) {
			console.error('Error connecting client', error);
		}
	});

	after(async () => {
		try {
			// drop it all
			await client.end();
		} catch (error) {
			console.error('Error closing client', error);
		}
	});

	context("columns", () => {
		it("has a name column", async () => {
			const result = await client.query(`
				SELECT column_name
				FROM information_schema.columns
				WHERE table_name = 'categories'
			`);
			const columnNames = result.rows.map((row) => row.column_name);
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
});