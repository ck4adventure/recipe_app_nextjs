// recipes tests
// table should exist
// columns: id, title
// title is required
import { testPool } from '../../db/db.mjs';

describe('recipes model', () => {
	context('columns', () => {
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
	});

});