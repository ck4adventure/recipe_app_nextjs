// sql table: loaflog
// table should exist with the following columns:
// id: ID
// leaven_temp: number, min 45
// leaven_start_time: date
// created
// updated
import { testPool } from '../../db/db.mjs';
import { expect } from 'chai';

describe('loafer table attributes', () => {
	context("it should exist", () => {
		it("has a table named loafer", async () => {
			const result = await testPool.query(`
			SELECT *
			FROM information_schema.tables
			WHERE table_name = 'loafer'
			`)
			const tableNames = result.rows.map((row) => row.table_name);
			expect(tableNames).to.include('loafer');
		})
	})
	context('columns', () => {
		it('has an id column', async () => {
			const result = await testPool.query(`
				SELECT column_name
				FROM information_schema.columns
				WHERE table_name = 'loafer'
			`);
			const columnNames = result.rows.map((row) => row.column_name);
			expect(columnNames).to.include('id');
		});
		it('has a column called leaven_temp', async () => {
			const result = await testPool.query(`
				SELECT column_name
				FROM information_schema.columns
				WHERE table_name = 'loafer'
			`);
			const columnNames = result.rows.map((row) => row.column_name);
			expect(columnNames).to.include('leaven_temp');
		});
		it('has a column called leaven_start_time', async () => {
			const result = await testPool.query(`
				SELECT column_name
				FROM information_schema.columns
				WHERE table_name = 'loafer'
			`);
			const columnNames = result.rows.map((row) => row.column_name);
			expect(columnNames).to.include('leaven_start_time');
		});
		it('has a column called createdat', async () => {
			const result = await testPool.query(`
				SELECT column_name
				FROM information_schema.columns
				WHERE table_name = 'loafer'
			`);
			const columnNames = result.rows.map((row) => row.column_name);
			expect(columnNames).to.include('createdat');
		});
		it('has a column called updatedat', async () => {
			const result = await testPool.query(`
				SELECT column_name
				FROM information_schema.columns
				WHERE table_name = 'loafer'
			`);
			const columnNames = result.rows.map((row) => row.column_name);
			expect(columnNames).to.include('updatedat');
		});
		// it would be cool to test the createdat and updatedat timestamps to be set as expected
		it('sets createdat and updatedat on insert', async () => {
			const insertResult = await testPool.query(`
      INSERT INTO loafer (leaven_temp, leaven_start_time)
      VALUES (25, NOW())
      RETURNING createdat, updatedat
    `);
			const { createdat, updatedat } = insertResult.rows[0];
			expect(createdat).to.be.a('date');
			expect(updatedat).to.be.a('date');
			expect(new Date(createdat).getTime()).to.equal(new Date(updatedat).getTime());
		});

		it('updates updatedat on update', async () => {
			const insertResult = await testPool.query(`
      INSERT INTO loafer (leaven_temp, leaven_start_time)
      VALUES (25, NOW())
      RETURNING id, createdat, updatedat
    `);
			const { id, createdat, updatedat } = insertResult.rows[0];

			// Wait for a second to ensure the updatedat timestamp will be different
			await new Promise((resolve) => setTimeout(resolve, 1000));

			const updateResult = await testPool.query(`
      UPDATE loafer
      SET leaven_temp = 30
      WHERE id = $1
      RETURNING updatedat
    `, [id]);
			const updatedAtAfterUpdate = updateResult.rows[0].updatedat;

			expect(updatedAtAfterUpdate).to.be.a('date');
			expect(updatedAtAfterUpdate).to.not.equal(updatedat);
			expect(new Date(updatedAtAfterUpdate).getTime()).to.be.greaterThan(new Date(updatedat).getTime());
		});

		// taken from another file for reference, still needs updating to loafer table
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

	});
});
