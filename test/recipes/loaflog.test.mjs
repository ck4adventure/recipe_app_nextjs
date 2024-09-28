// sql table: loaflog
// table should exist with the following columns:
// id: ID
// leaven_temp: number, min 45
// leaven_start_time: date
// created
// updated
import { testPool } from '../../db/db.mjs';
import { expect } from 'chai';

describe('loaflog table attributes', () => {
	context("it should exist", () => {
		it("has a table named loaflog", async () => {
			const result = await testPool.query(`
			SELECT *
			FROM information_schema.tables
			WHERE table_name = 'loaflog'
			`)
			const tableNames = result.rows.map((row) => row.table_name);
			expect(tableNames).to.include('loaflog');
		})
	})
	// context('columns', () => {
	// 	it('has a first_name column', async () => {
	// 		const result = await testPool.query(`
	// 			SELECT column_name
	// 			FROM information_schema.columns
	// 			WHERE table_name = 'authors'
	// 		`);
	// 		const columnNames = result.rows.map((row) => row.column_name);
	// 		expect(columnNames).to.include('first_name');
	// 	});
	// 	it('has a last_name column', async () => {
	// 		const result = await testPool.query(`
	// 			SELECT column_name
	// 			FROM information_schema.columns
	// 			WHERE table_name = 'authors'
	// 		`);
	// 		const columnNames = result.rows.map((row) => row.column_name);
	// 		expect(columnNames).to.include('last_name');
	// 	});
	// 	it('has a is_profi column', async () => {
	// 		const result = await testPool.query(`
	// 			SELECT column_name
	// 			FROM information_schema.columns
	// 			WHERE table_name = 'authors'
	// 		`);
	// 		const columnNames = result.rows.map((row) => row.column_name);
	// 		expect(columnNames).to.include('is_profi');
	// 	});
	// 	it('has a name column', async () => {
	// 		const result = await testPool.query(`
	// 			SELECT column_name
	// 			FROM information_schema.columns
	// 			WHERE table_name = 'authors'
	// 		`);
	// 		const columnNames = result.rows.map((row) => row.column_name);
	// 		expect(columnNames).to.include('name');
	// 	});
	// });
	// context('constraints', () => {
	// 	it('name is a virtual column of first+last', async () => {
	// 		const result = await testPool.query(`
	// 			INSERT INTO authors (first_name, last_name) VALUES ('test', 'test')
	// 			RETURNING name
	// 		`);
	// 		expect(result.rows[0].name).to.equal('test test');
	// 	});
	// 	it('name can be first only', async () => {
	// 		const result = await testPool.query(`
	// 			INSERT INTO authors (first_name) VALUES ('test')
	// 			RETURNING name
	// 		`);
	// 		expect(result.rows[0].name).to.equal('test');
	// 	});
	// 	it('name can be last only', async () => {
	// 		const result = await testPool.query(`
	// 			INSERT INTO authors (last_name) VALUES ('test')
	// 			RETURNING name
	// 		`);
	// 		expect(result.rows[0].name).to.equal('test');
	// 	});
	// 	it('should not allow name to be an empty string', async () => {
	// 		let error;
	// 		try {
	// 			await testPool.query('INSERT INTO authors (first_name, last_name) VALUES ($1, $2)', ['', '']);
	// 		} catch (e) {
	// 			error = e;
	// 		}
	// 		expect(error).to.exist;
	// 	});
	
	// });
});
