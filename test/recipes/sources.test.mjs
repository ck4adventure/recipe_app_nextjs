// sources table
// id
// source: string (enum: 'BOOK', 'SITE', 'PERSONAL')
// title: string, required if book
// url: type url, required if website
import { testPool } from '../../db/db.mjs';
import { expect } from 'chai';

describe('sources table', () => {
	context('columns', () => {
		it('has an id column', async () => {
			const result = await testPool.query(`
				SELECT column_name
				FROM information_schema.columns
				WHERE table_name = 'sources'
			`);
			const columnNames = result.rows.map((row) => row.column_name);
			expect(columnNames).to.include('id');
		});
		it('has a source_type column', async () => {
			const result = await testPool.query(`
				SELECT column_name
				FROM information_schema.columns
				WHERE table_name = 'sources'
			`);
			const columnNames = result.rows.map((row) => row.column_name);
			expect(columnNames).to.include('source_type');
		});
		it('has a source_title column', async () => {
			const result = await testPool.query(`
				SELECT column_name
				FROM information_schema.columns
				WHERE table_name = 'sources'
			`);
			const columnNames = result.rows.map((row) => row.column_name);
			expect(columnNames).to.include('source_title');
		});
		it('has a source_url column', async () => {
			const result = await testPool.query(`
				SELECT column_name
				FROM information_schema.columns
				WHERE table_name = 'sources'
			`);
			const columnNames = result.rows.map((row) => row.column_name);
			expect(columnNames).to.include('source_url');
		});

	});
	context('constraints', () => {
		it('source_title is required if source is BOOK', async () => {
			let error;
			try {
				await testPool.query(`
					INSERT INTO sources (source_type) VALUES ('BOOK')
				`);
			} catch (e) {
				error = e;
			}
			expect(error).to.exist;
		});
		it('source_title is required if source_type is PERSONAL', async () => {
			let error;
			try {
				await testPool.query(`
					INSERT INTO sources (source_type) VALUES ('PERSONAL')
				`);
			} catch (e) {
				error = e;
			}
			expect(error).to.exist;
		});
		it('source_url is required if source is SITE', async () => {
			let error;
			try {
				await testPool.query(`
					INSERT INTO sources (source_type) VALUES ('SITE')
				`);
			} catch (e) {
				error = e;
			}
			expect(error).to.exist;
		});
	});
});