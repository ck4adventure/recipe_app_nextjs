// // sql table: loaflog
// // table should exist with the following columns:
// // START WITH JUST TIMES
// import { testPool } from '../../db/db.mjs';
// import { expect } from 'chai';

// describe('loafer table attributes', () => {
// 	context("it should exist", () => {
// 		it("has a table named loafer", async () => {
// 			const result = await testPool.query(`
// 			SELECT *
// 			FROM information_schema.tables
// 			WHERE table_name = 'loafer'
// 			`)
// 			const tableNames = result.rows.map((row) => row.table_name);
// 			expect(tableNames).to.include('loafer');
// 		})
// 	})
// 	context('columns', () => {
// 		context('column basics', () => {
// 			it('has an id column', async () => {
// 				const result = await testPool.query(`
// 				SELECT column_name
// 				FROM information_schema.columns
// 				WHERE table_name = 'loafer'
// 			`);
// 				const columnNames = result.rows.map((row) => row.column_name);
// 				expect(columnNames).to.include('id');
// 			});
// 			it('has a column called created_at', async () => {
// 				const result = await testPool.query(`
// 				SELECT column_name
// 				FROM information_schema.columns
// 				WHERE table_name = 'loafer'
// 			`);
// 				const columnNames = result.rows.map((row) => row.column_name);
// 				expect(columnNames).to.include('created_at');
// 			});
// 			it('has a column called updated_at', async () => {
// 				const result = await testPool.query(`
// 				SELECT column_name
// 				FROM information_schema.columns
// 				WHERE table_name = 'loafer'
// 			`);
// 				const columnNames = result.rows.map((row) => row.column_name);
// 				expect(columnNames).to.include('updated_at');
// 			});
// 			// it would be cool to test the created_at and updated_at timestamps to be set as expected
// 			it('sets created_at and updated_at on insert', async () => {
// 				const insertResult = await testPool.query(`
// 					INSERT INTO loafer (leaven_start_time)
// 					VALUES (NOW())
// 					RETURNING created_at, updated_at
//    		 `);
// 				const { created_at, updated_at } = insertResult.rows[0];
// 				expect(created_at).to.be.a('date');
// 				expect(updated_at).to.be.a('date');
// 				expect(new Date(created_at).getTime()).to.equal(new Date(updated_at).getTime());
// 			});
// 			it('updates updated_at on update', async () => {
// 				const insertResult = await testPool.query(`
// 					INSERT INTO loafer (leaven_start_time)
// 					VALUES (NOW())
// 					RETURNING id, updated_at
//     	`);
// 				const { id, updated_at } = insertResult.rows[0];
// 				// Wait for a second to ensure the updated_at timestamp will be different
// 				await new Promise((resolve) => setTimeout(resolve, 1000));
// 				const updateResult = await testPool.query(`
// 					UPDATE loafer
// 					SET leaven_start_time = '2024-09-09'
// 					WHERE id = $1
// 					RETURNING id, updated_at
//     	`, [id]);
// 				const updatedAtAfterUpdate = updateResult.rows[0].updated_at;
// 				expect(updatedAtAfterUpdate).to.be.a('date');
// 				expect(updatedAtAfterUpdate).to.not.equal(updated_at);
// 				expect(new Date(updatedAtAfterUpdate).getTime()).to.be.greaterThan(new Date(updated_at).getTime());
// 			});
// 		});
// 		context('leaven_start_time', () => {
// 			it('has a column called leaven_start_time', async () => {
// 				const result = await testPool.query(`
// 					SELECT column_name
// 					FROM information_schema.columns
// 					WHERE table_name = 'loafer'
// 			`);
// 				const columnNames = result.rows.map((row) => row.column_name);
// 				expect(columnNames).to.include('leaven_start_time');
// 			});
// 			it('has the correct data type for leaven_start_time', async () => {
// 				const result = await testPool.query(`
//         SELECT column_name, data_type
//         FROM information_schema.columns
//         WHERE table_name = 'loafer' AND column_name = 'leaven_start_time'
//       `);
// 				const { data_type } = result.rows[0];
// 				expect(data_type).to.equal('timestamp with time zone'); // Adjust based on your column definition
// 			});
// 			it('sets leaven_start_time on insert', async () => {
// 				const insertResult = await testPool.query(`
//         INSERT INTO loafer (leaven_start_time)
//         VALUES (NOW())
//         RETURNING leaven_start_time
//       `);
// 				const { leaven_start_time } = insertResult.rows[0];
// 				expect(leaven_start_time).to.be.a('date');
// 			});
// 			it('updates leaven_start_time on update', async () => {
// 				const insertResult = await testPool.query(`
//         INSERT INTO loafer (leaven_start_time)
//         VALUES (NOW())
//         RETURNING id, leaven_start_time
//       `);
// 				const { id, leaven_start_time: initialLeavenCreationTime } = insertResult.rows[0];

// 				// Wait for a second to ensure the timestamp will be different
// 				await new Promise((resolve) => setTimeout(resolve, 1000));

// 				const updateResult = await testPool.query(`
// 					UPDATE loafer
// 					SET leaven_start_time = NOW()
// 					WHERE id = $1
// 					RETURNING leaven_start_time
//       `, [id]);
// 				const updatedLeavenCreationTime = updateResult.rows[0].leaven_start_time;

// 				expect(updatedLeavenCreationTime).to.be.a('date');
// 				expect(new Date(updatedLeavenCreationTime).getTime()).to.be.greaterThan(new Date(initialLeavenCreationTime).getTime());
// 			});
// 		});
// 		context('dough_creation_time', () => {
// 			it('has a column called dough_creation_time', async () => {
// 				const result = await testPool.query(`
// 				SELECT column_name
// 				FROM information_schema.columns
// 				WHERE table_name = 'loafer'
// 			`);
// 				const columnNames = result.rows.map((row) => row.column_name);
// 				expect(columnNames).to.include('dough_creation_time');
// 			});
// 			it('has the correct data type for dough_creation_time', async () => {
// 				const result = await testPool.query(`
//         SELECT column_name, data_type
//         FROM information_schema.columns
//         WHERE table_name = 'loafer' AND column_name = 'dough_creation_time'
//       `);
// 				const { data_type } = result.rows[0];
// 				expect(data_type).to.equal('timestamp with time zone'); // Adjust based on your column definition
// 			});
// 			it('sets dough_creation_time on insert', async () => {
// 				const insertResult = await testPool.query(`
//         INSERT INTO loafer (leaven_start_time, dough_creation_time)
//         VALUES (NOW(), NOW())
//         RETURNING dough_creation_time
//       `);
// 				const { dough_creation_time } = insertResult.rows[0];
// 				expect(dough_creation_time).to.be.a('date');
// 			});
// 			it('updates dough_creation_time on update', async () => {
// 				const insertResult = await testPool.query(`
//         INSERT INTO loafer (leaven_start_time, dough_creation_time)
//         VALUES (NOW(), NOW())
//         RETURNING id, dough_creation_time
//       `);
// 				const { id, dough_creation_time: initialDoughCreationTime } = insertResult.rows[0];

// 				// Wait for a second to ensure the timestamp will be different
// 				await new Promise((resolve) => setTimeout(resolve, 1000));

// 				const updateResult = await testPool.query(`
//         UPDATE loafer
//         SET dough_creation_time = NOW()
//         WHERE id = $1
//         RETURNING dough_creation_time
//       `, [id]);
// 				const updatedDoughCreationTime = updateResult.rows[0].dough_creation_time;

// 				expect(updatedDoughCreationTime).to.be.a('date');
// 				expect(new Date(updatedDoughCreationTime).getTime()).to.be.greaterThan(new Date(initialDoughCreationTime).getTime());
// 			});
// 		});
// 		context('bench_rest_start_time', () => {
// 			it('has a column called bench_rest_start_time', async () => {
// 				const result = await testPool.query(`
// 				SELECT column_name
// 				FROM information_schema.columns
// 				WHERE table_name = 'loafer'
// 			`);
// 				const columnNames = result.rows.map((row) => row.column_name);
// 				expect(columnNames).to.include('bench_rest_start_time');
// 			});
// 			it('has the correct data type for bench_rest_start_time', async () => {
// 				const result = await testPool.query(`
//         SELECT column_name, data_type
//         FROM information_schema.columns
//         WHERE table_name = 'loafer' AND column_name = 'bench_rest_start_time'
//       `);
// 				const { data_type } = result.rows[0];
// 				expect(data_type).to.equal('timestamp with time zone'); // Adjust based on your column definition
// 			});
// 			it('sets bench_rest_start_time on insert', async () => {
// 				const insertResult = await testPool.query(`
//         INSERT INTO loafer (leaven_start_time, bench_rest_start_time)
//         VALUES (NOW(), NOW())
//         RETURNING bench_rest_start_time
//       `);
// 				const { bench_rest_start_time } = insertResult.rows[0];
// 				expect(bench_rest_start_time).to.be.a('date');
// 			});
// 			it('updates bench_rest_start_time on update', async () => {
// 				const insertResult = await testPool.query(`
//         INSERT INTO loafer (bench_rest_start_time, dough_creation_time)
//         VALUES (NOW(), NOW())
//         RETURNING id, bench_rest_start_time
//       `);
// 				const { id, bench_rest_start_time: initialTime } = insertResult.rows[0];

// 				// Wait for a second to ensure the timestamp will be different
// 				await new Promise((resolve) => setTimeout(resolve, 1000));

// 				const updateResult = await testPool.query(`
//         UPDATE loafer
//         SET bench_rest_start_time = NOW()
//         WHERE id = $1
//         RETURNING bench_rest_start_time
//       `, [id]);
// 				const updatedTime = updateResult.rows[0].bench_rest_start_time;

// 				expect(updatedTime).to.be.a('date');
// 				expect(new Date(updatedTime).getTime()).to.be.greaterThan(new Date(initialTime).getTime());
// 			});
// 		});
// 		context('shaped_prove_start_time', () => {
// 			it('has a column called shaped_prove_start_time', async () => {
// 				const result = await testPool.query(`
// 				SELECT column_name
// 				FROM information_schema.columns
// 				WHERE table_name = 'loafer'
// 			`);
// 				const columnNames = result.rows.map((row) => row.column_name);
// 				expect(columnNames).to.include('shaped_prove_start_time');
// 			});
// 			it('has the correct data type for shaped_prove_start_time', async () => {
// 				const result = await testPool.query(`
//         SELECT column_name, data_type
//         FROM information_schema.columns
//         WHERE table_name = 'loafer' AND column_name = 'shaped_prove_start_time'
//       `);
// 				const { data_type } = result.rows[0];
// 				expect(data_type).to.equal('timestamp with time zone'); // Adjust based on your column definition
// 			});
// 			it('sets shaped_prove_start_time on insert', async () => {
// 				const insertResult = await testPool.query(`
//         INSERT INTO loafer (leaven_start_time, shaped_prove_start_time)
//         VALUES (NOW(), NOW())
//         RETURNING shaped_prove_start_time
//       `);
// 				const { shaped_prove_start_time } = insertResult.rows[0];
// 				expect(shaped_prove_start_time).to.be.a('date');
// 			});
// 			it('updates shaped_prove_start_time on update', async () => {
// 				const insertResult = await testPool.query(`
//         INSERT INTO loafer (shaped_prove_start_time, dough_creation_time)
//         VALUES (NOW(), NOW())
//         RETURNING id, shaped_prove_start_time
//       `);
// 				const { id, shaped_prove_start_time: initialTime } = insertResult.rows[0];

// 				// Wait for a second to ensure the timestamp will be different
// 				await new Promise((resolve) => setTimeout(resolve, 1000));

// 				const updateResult = await testPool.query(`
//         UPDATE loafer
//         SET shaped_prove_start_time = NOW()
//         WHERE id = $1
//         RETURNING shaped_prove_start_time
//       `, [id]);
// 				const updatedTime = updateResult.rows[0].shaped_prove_start_time;

// 				expect(updatedTime).to.be.a('date');
// 				expect(new Date(updatedTime).getTime()).to.be.greaterThan(new Date(initialTime).getTime());
// 			});
// 		});
// 		context('bake_start_time', () => {
// 			it('has a column called bake_start_time', async () => {
// 				const result = await testPool.query(`
// 				SELECT column_name
// 				FROM information_schema.columns
// 				WHERE table_name = 'loafer'
// 			`);
// 				const columnNames = result.rows.map((row) => row.column_name);
// 				expect(columnNames).to.include('bake_start_time');
// 			});
// 			it('has the correct data type for bake_start_time', async () => {
// 				const result = await testPool.query(`
//         SELECT column_name, data_type
//         FROM information_schema.columns
//         WHERE table_name = 'loafer' AND column_name = 'bake_start_time'
//       `);
// 				const { data_type } = result.rows[0];
// 				expect(data_type).to.equal('timestamp with time zone'); // Adjust based on your column definition
// 			});
// 			it('sets bake_start_time on insert', async () => {
// 				const insertResult = await testPool.query(`
//         INSERT INTO loafer (bake_start_time, shaped_prove_start_time)
//         VALUES (NOW(), NOW())
//         RETURNING bake_start_time
//       `);
// 				const { bake_start_time } = insertResult.rows[0];
// 				expect(bake_start_time).to.be.a('date');
// 			});
// 			it('updates bake_start_time on update', async () => {
// 				const insertResult = await testPool.query(`
//         INSERT INTO loafer (bake_start_time, dough_creation_time)
//         VALUES (NOW(), NOW())
//         RETURNING id, bake_start_time
//       `);
// 				const { id, bake_start_time: initialTime } = insertResult.rows[0];

// 				// Wait for a second to ensure the timestamp will be different
// 				await new Promise((resolve) => setTimeout(resolve, 1000));

// 				const updateResult = await testPool.query(`
//         UPDATE loafer
//         SET bake_start_time = NOW()
//         WHERE id = $1
//         RETURNING bake_start_time
//       `, [id]);
// 				const updatedTime = updateResult.rows[0].bake_start_time;

// 				expect(updatedTime).to.be.a('date');
// 				expect(new Date(updatedTime).getTime()).to.be.greaterThan(new Date(initialTime).getTime());
// 			});
// 		});
// 		context('bake_end_time', () => {
// 			it('has a column called bake_end_time', async () => {
// 				const result = await testPool.query(`
// 				SELECT column_name
// 				FROM information_schema.columns
// 				WHERE table_name = 'loafer'
// 			`);
// 				const columnNames = result.rows.map((row) => row.column_name);
// 				expect(columnNames).to.include('bake_end_time');
// 			});
// 			it('has the correct data type for bake_end_time', async () => {
// 				const result = await testPool.query(`
//         SELECT column_name, data_type
//         FROM information_schema.columns
//         WHERE table_name = 'loafer' AND column_name = 'bake_end_time'
//       `);
// 				const { data_type } = result.rows[0];
// 				expect(data_type).to.equal('timestamp with time zone'); // Adjust based on your column definition
// 			});
// 			it('sets bake_end_time on insert', async () => {
// 				const insertResult = await testPool.query(`
//         INSERT INTO loafer (bake_end_time, shaped_prove_start_time)
//         VALUES (NOW(), NOW())
//         RETURNING bake_end_time
//       `);
// 				const { bake_end_time } = insertResult.rows[0];
// 				expect(bake_end_time).to.be.a('date');
// 			});
// 			it('updates bake_end_time on update', async () => {
// 				const insertResult = await testPool.query(`
//         INSERT INTO loafer (bake_end_time, dough_creation_time)
//         VALUES (NOW(), NOW())
//         RETURNING id, bake_end_time
//       `);
// 				const { id, bake_end_time: initialTime } = insertResult.rows[0];

// 				// Wait for a second to ensure the timestamp will be different
// 				await new Promise((resolve) => setTimeout(resolve, 1000));

// 				const updateResult = await testPool.query(`
//         UPDATE loafer
//         SET bake_end_time = NOW()
//         WHERE id = $1
//         RETURNING bake_end_time
//       `, [id]);
// 				const updatedTime = updateResult.rows[0].bake_end_time;

// 				expect(updatedTime).to.be.a('date');
// 				expect(new Date(updatedTime).getTime()).to.be.greaterThan(new Date(initialTime).getTime());
// 			});
// 		});
// 	});
// });
