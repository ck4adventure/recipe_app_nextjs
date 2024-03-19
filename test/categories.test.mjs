// categories table
// should exist
// columns: id, name 
// name is required and unique
import { testPool } from '../db/db.mjs';
import { expect } from 'chai';



describe("categories table", () => {
	// import the testPool
	// test the name column

	context("columns", () => {
		it("has a name column", async () => {
			const result = await testPool.query(`
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
				await testPool.query(`
					INSERT INTO categories (name) VALUES (null)
				`);
			} catch (e) {
				error = e;
			}
			// TODO better error check to ensure it's a not null constraint error
			expect(error).to.exist;
		});

		// test the name column is unique
		it("name is unique", async () => {
			await testPool.query(`
				INSERT INTO categories (name) VALUES ('breakfast')
			`);
			let error;
			try {
				await testPool.query(`
					INSERT INTO categories (name) VALUES ('breakfast')
				`);
			} catch (e) {
				error = e;
			}
			// TODO better error check to ensure it's a unique constraint error
			expect(error).to.exist;
		});
	});
});