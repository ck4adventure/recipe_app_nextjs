// recipes tests
// table should exist
// columns: id, title, slug
// title is required, and unique
// slug is generated from title and is unique
import { testPool } from '../../db/db.mjs';
import { expect } from 'chai';

describe('recipes model', () => {
	afterEach(async () => {
		await testPool.query('DELETE FROM recipes');
	});
	context('title', () => {
		it('has a title column', async () => {
			const result = await testPool.query(`
				SELECT column_name
				FROM information_schema.columns
				WHERE table_name = 'recipes'
			`);
			const columnNames = result.rows.map((row) => row.column_name);
			expect(columnNames).to.include('title');
		});

		it('title is required', async () => {
			let error;
			try {
				await testPool.query(`
					INSERT INTO recipes (title) VALUES (null)
				`);
			} catch (e) {
				error = e;
			}
			expect(error).to.exist;
		});
		it('title must be unique', async () => {
			let error;
			try {
				await testPool.query(`
					INSERT INTO recipes (title) VALUES ('test')
				`);
				await testPool.query(`
					INSERT INTO recipes (title) VALUES ('test')
				`);
			} catch (e) {
				error = e;
			}
			expect(error).to.exist;
		});
	});
	context('slug', async () => {
		it('has a slug column', async () => {
			const result = await testPool.query(`
				SELECT column_name
				FROM information_schema.columns
				WHERE table_name = 'recipes'
			`);
			const columnNames = result.rows.map((row) => row.column_name);
			expect(columnNames).to.include('slug');
		});
		it('slug is generated from title', async () => {
			const result = await testPool.query(`
				INSERT INTO recipes (title) VALUES ('testing 123')
				RETURNING slug
			`);
			expect(result.rows[0].slug).to.equal('testing-123');
		});
		it('slug should remove commas before joining together', async () => {
			const result = await testPool.query(`
				INSERT INTO recipes (title) VALUES ('testing, 123')
				RETURNING slug
			`);
			expect(result.rows[0].slug).to.equal('testing-123');
		});
		it('slug should also be unique', async () => {
			let error;
			try {
				await testPool.query(`
					INSERT INTO recipes (title) VALUES ('testing 123')
				`);
				await testPool.query(`
					INSERT INTO recipes (title) VALUES ('testing, 123')
				`);
			} catch (e) {
				error = e;
			}
			expect(error).to.exist;
		});

	});

});