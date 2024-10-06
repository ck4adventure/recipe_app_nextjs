// sql table: loaflog
// table should exist with the following columns:
// START WITH JUST TIMES
import { testPool } from '../../db/db.mjs';
import { expect } from 'chai';

describe('leaven table attributes', () => {
	context("it should exist", () => {
		it("has a table named leaven", async () => {
			const result = await testPool.query(`
			SELECT *
			FROM information_schema.tables
			WHERE table_name = 'leaven'
			`)
			const tableNames = result.rows.map((row) => row.table_name);
			expect(tableNames).to.include('leaven');
		})
	})
	context('columns', () => {
		context('column basics', () => {
			it('has an id column', async () => {
				const result = await testPool.query(`
				SELECT column_name
				FROM information_schema.columns
				WHERE table_name = 'leaven'
			`);
				const columnNames = result.rows.map((row) => row.column_name);
				expect(columnNames).to.include('id');
			});
			it('has a column called created_at', async () => {
				const result = await testPool.query(`
				SELECT column_name
				FROM information_schema.columns
				WHERE table_name = 'leaven'
			`);
				const columnNames = result.rows.map((row) => row.column_name);
				expect(columnNames).to.include('created_at');
			});
			it('has a column called updated_at', async () => {
				const result = await testPool.query(`
				SELECT column_name
				FROM information_schema.columns
				WHERE table_name = 'leaven'
			`);
				const columnNames = result.rows.map((row) => row.column_name);
				expect(columnNames).to.include('updated_at');
			});
			// it would be cool to test the created_at and updated_at timestamps to be set as expected
			it('sets created_at and updated_at on insert', async () => {
				const insertResult = await testPool.query(`
					INSERT INTO leaven (leaven_start_time)
					VALUES (NOW())
					RETURNING created_at, updated_at
   		 `);
				const { created_at, updated_at } = insertResult.rows[0];
				expect(created_at).to.be.a('date');
				expect(updated_at).to.be.a('date');
				expect(new Date(created_at).getTime()).to.equal(new Date(updated_at).getTime());
			});
			it('updates updated_at on update', async () => {
				const insertResult = await testPool.query(`
					INSERT INTO leaven (leaven_start_time)
					VALUES (NOW())
					RETURNING id, updated_at
    	`);
				const { id, updated_at } = insertResult.rows[0];
				// Wait for a second to ensure the updatedat timestamp will be different
				await new Promise((resolve) => setTimeout(resolve, 1000));
				const updateResult = await testPool.query(`
					UPDATE leaven
					SET leaven_start_time = '2024-09-09'
					WHERE id = $1
					RETURNING id, updated_at
    	`, [id]);
				const updatedAtAfterUpdate = updateResult.rows[0].updated_at;
				expect(updatedAtAfterUpdate).to.be.a('date');
				expect(updatedAtAfterUpdate).to.not.equal(updated_at);
				expect(new Date(updatedAtAfterUpdate).getTime()).to.be.greaterThan(new Date(updated_at).getTime());
			});
		});
		context('leaven_start_time', () => {
			it('has a column called leaven_start_time', async () => {
				const result = await testPool.query(`
					SELECT column_name
					FROM information_schema.columns
					WHERE table_name = 'leaven'
			`);
				const columnNames = result.rows.map((row) => row.column_name);
				expect(columnNames).to.include('leaven_start_time');
			});
			it('has the correct data type for leaven_start_time', async () => {
				const result = await testPool.query(`
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_name = 'leaven' AND column_name = 'leaven_start_time'
      `);
				const { data_type } = result.rows[0];
				expect(data_type).to.equal('timestamp with time zone'); // Adjust based on your column definition
			});
			it('sets leaven_start_time on insert', async () => {
				const insertResult = await testPool.query(`
        INSERT INTO leaven (leaven_start_time)
        VALUES (NOW())
        RETURNING leaven_start_time
      `);
				const { leaven_start_time } = insertResult.rows[0];
				expect(leaven_start_time).to.be.a('date');
			});
			it('updates leaven_start_time on update', async () => {
				const insertResult = await testPool.query(`
        INSERT INTO leaven (leaven_start_time)
        VALUES (NOW())
        RETURNING id, leaven_start_time
      `);
				const { id, leaven_start_time: initialLeavenCreationTime } = insertResult.rows[0];

				// Wait for a second to ensure the timestamp will be different
				await new Promise((resolve) => setTimeout(resolve, 1000));

				const updateResult = await testPool.query(`
					UPDATE leaven
					SET leaven_start_time = NOW()
					WHERE id = $1
					RETURNING leaven_start_time
      `, [id]);
				const updatedLeavenCreationTime = updateResult.rows[0].leaven_start_time;

				expect(updatedLeavenCreationTime).to.be.a('date');
				expect(new Date(updatedLeavenCreationTime).getTime()).to.be.greaterThan(new Date(initialLeavenCreationTime).getTime());
			});
		});

	});
});
