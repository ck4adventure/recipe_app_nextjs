// sql table: authors
// table should exist with the following columns:
// first: string
// last: string
// is_profi: bool 
// full_name: virtual of first+last, at least one of first or last must be present
import { testPool } from '../../db/db.mjs';
import { expect } from 'chai';

describe('authors table attributes', () => {
	context('columns', () => {
		it('has a first_name column', async () => {
			const result = await testPool.query(`
				SELECT column_name
				FROM information_schema.columns
				WHERE table_name = 'authors'
			`);
			const columnNames = result.rows.map((row) => row.column_name);
			expect(columnNames).to.include('first_name');
		});
		it('has a last_name column', async () => {
			const result = await testPool.query(`
				SELECT column_name
				FROM information_schema.columns
				WHERE table_name = 'authors'
			`);
			const columnNames = result.rows.map((row) => row.column_name);
			expect(columnNames).to.include('last_name');
		});
		it('has a is_profi column', async () => {
			const result = await testPool.query(`
				SELECT column_name
				FROM information_schema.columns
				WHERE table_name = 'authors'
			`);
			const columnNames = result.rows.map((row) => row.column_name);
			expect(columnNames).to.include('is_profi');
		});
		it('has a full_name column', async () => {
			const result = await testPool.query(`
				SELECT column_name
				FROM information_schema.columns
				WHERE table_name = 'authors'
			`);
			const columnNames = result.rows.map((row) => row.column_name);
			expect(columnNames).to.include('full_name');
		});
	});
	context('constraints', () => {
		it('full_name is a virtual column of first+last', async () => {
			const result = await testPool.query(`
				INSERT INTO authors (first_name, last_name) VALUES ('test', 'test')
				RETURNING full_name
			`);
			expect(result.rows[0].full_name).to.equal('test test');
		});
		it('full_name can be first only', async () => {
			const result = await testPool.query(`
				INSERT INTO authors (first_name) VALUES ('test')
				RETURNING full_name
			`);
			expect(result.rows[0].full_name).to.equal('test');
		});
		it('full_name can be last only', async () => {
			const result = await testPool.query(`
				INSERT INTO authors (last_name) VALUES ('test')
				RETURNING full_name
			`);
			expect(result.rows[0].full_name).to.equal('test');
		});
		it('should not allow full_name to be an empty string', async () => {
			let error;
			try {
				await testPool.query('INSERT INTO authors (first_name, last_name) VALUES ($1, $2)', ['', '']);
			} catch (e) {
				error = e;
			}
			expect(error).to.exist;
		});
	
	});
});
