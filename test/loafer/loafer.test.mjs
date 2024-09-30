// sql table: loaflog
// table should exist with the following columns:
// 1: Leaven Create
// Leaven Start Time 2024-09-29 08:45
// Leaven Water Temp 70F
// Addtl ID, created, updated
// 2: Dough Create
// Dough Create Start Time 2024-09-29 16:00
// Water 700ML
// Water Temp 88F
// Starter Amount 200g
// Flour Weight 1000g
// Flour Blend "Cottage"
// Ambient Temp at Start 78F
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
		context('column basics', () => {
			it('has an id column', async () => {
				const result = await testPool.query(`
				SELECT column_name
				FROM information_schema.columns
				WHERE table_name = 'loafer'
			`);
				const columnNames = result.rows.map((row) => row.column_name);
				expect(columnNames).to.include('id');
			});
			it('has a column called created_at', async () => {
				const result = await testPool.query(`
				SELECT column_name
				FROM information_schema.columns
				WHERE table_name = 'loafer'
			`);
				const columnNames = result.rows.map((row) => row.column_name);
				expect(columnNames).to.include('created_at');
			});
			it('has a column called updated_at', async () => {
				const result = await testPool.query(`
				SELECT column_name
				FROM information_schema.columns
				WHERE table_name = 'loafer'
			`);
				const columnNames = result.rows.map((row) => row.column_name);
				expect(columnNames).to.include('updated_at');
			});
			// it would be cool to test the created_at and updated_at timestamps to be set as expected
			it('sets created_at and updated_at on insert', async () => {
				const insertResult = await testPool.query(`
					INSERT INTO loafer (leaven_temp, leaven_start_time)
					VALUES (75, NOW())
					RETURNING created_at, updated_at
   		 `);
				const { created_at, updated_at } = insertResult.rows[0];
				expect(created_at).to.be.a('date');
				expect(updated_at).to.be.a('date');
				expect(new Date(created_at).getTime()).to.equal(new Date(updated_at).getTime());
			});
			it('updates updated_at on update', async () => {
				const insertResult = await testPool.query(`
					INSERT INTO loafer (leaven_temp, leaven_start_time)
					VALUES (75, NOW())
					RETURNING id, updated_at
    	`);
				const { id, updated_at } = insertResult.rows[0];
				// Wait for a second to ensure the updatedat timestamp will be different
				await new Promise((resolve) => setTimeout(resolve, 1000));
				const updateResult = await testPool.query(`
					UPDATE loafer
					SET leaven_temp = 80
					WHERE id = $1
					RETURNING id, updated_at
    	`, [id]);
				const updatedAtAfterUpdate = updateResult.rows[0].updated_at;
				expect(updatedAtAfterUpdate).to.be.a('date');
				expect(updatedAtAfterUpdate).to.not.equal(updated_at);
				expect(new Date(updatedAtAfterUpdate).getTime()).to.be.greaterThan(new Date(updated_at).getTime());
			});
		})
		context('leaven_temp', () => {
			it('has a column called leaven_temp', async () => {
				const result = await testPool.query(`
					SELECT column_name
					FROM information_schema.columns
					WHERE table_name = 'loafer'
				`);
				const columnNames = result.rows.map((row) => row.column_name);
				expect(columnNames).to.include('leaven_temp');
			});
			it('has the correct data type for leaven_temp', async () => {
				const result = await testPool.query(`
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_name = 'loafer' AND column_name = 'leaven_temp'
      `);
				const { data_type } = result.rows[0];
				expect(data_type).to.equal('integer'); // Adjust based on your column definition
			});
			it("leaven_temp should be greater than 32", async () => {
				// Test inserting a valid value
				const validInsertResult = await testPool.query(`
					INSERT INTO loafer (leaven_temp, leaven_start_time)
					VALUES (33, NOW())
					RETURNING leaven_temp
    	`);
				expect(validInsertResult.rows[0].leaven_temp).to.equal(33);

				// Test inserting an invalid value
				try {
					await testPool.query(`
        INSERT INTO loafer (leaven_temp, leaven_start_time)
        VALUES (32, NOW())
      `);
					throw new Error('Insert should have failed but did not');
				} catch (error) {
					expect(error.message).to.include('violates check constraint');
				}

				try {
					await testPool.query(`
        INSERT INTO loafer (leaven_temp, leaven_start_time)
        VALUES (31, NOW())
      `);
					throw new Error('Insert should have failed but did not');
				} catch (error) {
					expect(error.message).to.include('violates check constraint');
				}
			});

		});
		context('leaven_start_time', () => {
			it('has a column called leaven_start_time', async () => {
				const result = await testPool.query(`
					SELECT column_name
					FROM information_schema.columns
					WHERE table_name = 'loafer'
			`);
				const columnNames = result.rows.map((row) => row.column_name);
				expect(columnNames).to.include('leaven_start_time');
			});
			it('has the correct data type for leaven_start_time', async () => {
				const result = await testPool.query(`
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_name = 'loafer' AND column_name = 'leaven_start_time'
      `);
				const { data_type } = result.rows[0];
				expect(data_type).to.equal('timestamp without time zone'); // Adjust based on your column definition
			});
		})
		context('dough_creation_time', () => {
			it('has a column called dough_creation_time', async () => {
				const result = await testPool.query(`
				SELECT column_name
				FROM information_schema.columns
				WHERE table_name = 'loafer'
			`);
				const columnNames = result.rows.map((row) => row.column_name);
				expect(columnNames).to.include('dough_creation_time');
			});
			it('has the correct data type for dough_creation_time', async () => {
				const result = await testPool.query(`
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_name = 'loafer' AND column_name = 'dough_creation_time'
      `);
				const { data_type } = result.rows[0];
				expect(data_type).to.equal('timestamp without time zone'); // Adjust based on your column definition
			});
			it('sets dough_creation_time on insert', async () => {
				const insertResult = await testPool.query(`
        INSERT INTO loafer (leaven_temp, leaven_start_time, dough_creation_time)
        VALUES (75, NOW(), NOW())
        RETURNING dough_creation_time
      `);
				const { dough_creation_time } = insertResult.rows[0];
				expect(dough_creation_time).to.be.a('date');
			});
			it('updates dough_creation_time on update', async () => {
				const insertResult = await testPool.query(`
        INSERT INTO loafer (leaven_temp, leaven_start_time, dough_creation_time)
        VALUES (75, NOW(), NOW())
        RETURNING id, dough_creation_time
      `);
				const { id, dough_creation_time: initialDoughCreationTime } = insertResult.rows[0];

				// Wait for a second to ensure the timestamp will be different
				await new Promise((resolve) => setTimeout(resolve, 1000));

				const updateResult = await testPool.query(`
        UPDATE loafer
        SET leaven_temp = 80, dough_creation_time = NOW()
        WHERE id = $1
        RETURNING dough_creation_time
      `, [id]);
				const updatedDoughCreationTime = updateResult.rows[0].dough_creation_time;

				expect(updatedDoughCreationTime).to.be.a('date');
				expect(new Date(updatedDoughCreationTime).getTime()).to.be.greaterThan(new Date(initialDoughCreationTime).getTime());
			});
		});
		context('water_ml', () => {
			it('has a column called water_ml', async () => {
				const result = await testPool.query(`
					SELECT column_name
					FROM information_schema.columns
					WHERE table_name = 'loafer'
				`);
				const columnNames = result.rows.map((row) => row.column_name);
				expect(columnNames).to.include('water_ml');
			});
			it('has the correct data type for water_ml', async () => {
				const result = await testPool.query(`
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_name = 'loafer' AND column_name = 'water_ml'
      `);
				const { data_type } = result.rows[0];
				expect(data_type).to.equal('integer'); // Adjust based on your column definition
			});
		});
		context('water_temp', () => {
			it('has a column called water_temp', async () => {
				const result = await testPool.query(`
				SELECT column_name
				FROM information_schema.columns
				WHERE table_name = 'loafer'
			`);
				const columnNames = result.rows.map((row) => row.column_name);
				expect(columnNames).to.include('water_temp');
			});
			it('has the correct data type for water_temp', async () => {
				const result = await testPool.query(`
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_name = 'loafer' AND column_name = 'water_temp'
      `);
				const { data_type } = result.rows[0];
				expect(data_type).to.equal('integer'); // Adjust based on your column definition
			});
			it("water_temp should be greater than 32", async () => {
				// Test inserting a valid value
				const validInsertResult = await testPool.query(`
				INSERT INTO loafer (leaven_temp, leaven_start_time, water_temp)
				VALUES (70, NOW(), 33)
				RETURNING water_temp
    		`);
				expect(validInsertResult.rows[0].water_temp).to.equal(33);

				// Test inserting an invalid value
				try {
					await testPool.query(`
        INSERT INTO loafer (leaven_temp, leaven_start_time, water_temp)
        VALUES (70, NOW(), 32)
      `);
					throw new Error('Insert should have failed but did not');
				} catch (error) {
					expect(error.message).to.include('violates check constraint');
				}

				try {
					await testPool.query(`
        INSERT INTO loafer (leaven_temp, leaven_start_time, water_temp)
        VALUES (70, NOW(), 31)
      `);
					throw new Error('Insert should have failed but did not');
				} catch (error) {
					expect(error.message).to.include('violates check constraint');
				}
			});
		});
		context('starter_g', () => {
			it('has a column called starter_g', async () => {
				const result = await testPool.query(`
				SELECT column_name
				FROM information_schema.columns
				WHERE table_name = 'loafer'
			`);
				const columnNames = result.rows.map((row) => row.column_name);
				expect(columnNames).to.include('starter_g');
			});
			it('has the correct data type for starter_g', async () => {
				const result = await testPool.query(`
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_name = 'loafer' AND column_name = 'starter_g'
      `);
				const { data_type } = result.rows[0];
				expect(data_type).to.equal('integer'); // Adjust based on your column definition
			});
			it("starter_g should be greater than 0", async () => {
				// Test inserting a valid value
				const validInsertResult = await testPool.query(`
				INSERT INTO loafer (leaven_temp, leaven_start_time, water_temp, starter_g)
				VALUES (70, NOW(), 70, 200)
				RETURNING starter_g
    		`);
				expect(validInsertResult.rows[0].starter_g).to.equal(200);

				// Test inserting an invalid value
				try {
					await testPool.query(`
        INSERT INTO loafer (leaven_temp, leaven_start_time, water_temp, starter_g)
        VALUES (70, NOW(), 70, 0)
      `);
					throw new Error('Insert should have failed but did not');
				} catch (error) {
					expect(error.message).to.include('violates check constraint');
				}

				try {
					await testPool.query(`
        INSERT INTO loafer (leaven_temp, leaven_start_time, water_temp, starter_g)
        VALUES (70, NOW(), 70, -1)
      `);
					throw new Error('Insert should have failed but did not');
				} catch (error) {
					expect(error.message).to.include('violates check constraint');
				}
			});
		});
		context('flour_g', () => {
			it('has a column called flour_g', async () => {
				const result = await testPool.query(`
				SELECT column_name
				FROM information_schema.columns
				WHERE table_name = 'loafer'
			`);
				const columnNames = result.rows.map((row) => row.column_name);
				expect(columnNames).to.include('flour_g');
			});
			it('has the correct data type for flour_g', async () => {
				const result = await testPool.query(`
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_name = 'loafer' AND column_name = 'flour_g'
      `);
				const { data_type } = result.rows[0];
				expect(data_type).to.equal('integer'); // Adjust based on your column definition
			});
			it("flour_g should be greater than 0", async () => {
				// Test inserting a valid value
				const validInsertResult = await testPool.query(`
				INSERT INTO loafer (leaven_temp, leaven_start_time, water_temp, flour_g)
				VALUES (70, NOW(), 70, 200)
				RETURNING flour_g
    		`);
				expect(validInsertResult.rows[0].flour_g).to.equal(200);

				// Test inserting an invalid value
				try {
					await testPool.query(`
        INSERT INTO loafer (leaven_temp, leaven_start_time, water_temp, flour_g)
        VALUES (70, NOW(), 70, 0)
      `);
					throw new Error('Insert should have failed but did not');
				} catch (error) {
					expect(error.message).to.include('violates check constraint');
				}

				try {
					await testPool.query(`
        INSERT INTO loafer (leaven_temp, leaven_start_time, water_temp, flour_g)
        VALUES (70, NOW(), 70, -1)
      `);
					throw new Error('Insert should have failed but did not');
				} catch (error) {
					expect(error.message).to.include('violates check constraint');
				}
			});
		});
		context('flour_blend', () => {
			it('has a column called flour_blend', async () => {
				const result = await testPool.query(`
					SELECT column_name
					FROM information_schema.columns
					WHERE table_name = 'loafer'
				`);
				const columnNames = result.rows.map((row) => row.column_name);
				expect(columnNames).to.include('flour_blend');
			});
			it('flour_blend is an enum with a defined set of values', async () => {
				const result = await testPool.query(`
					SELECT udt_name
					FROM information_schema.columns
					WHERE table_name = 'loafer' AND column_name = 'flour_blend'
      `);
				const { udt_name } = result.rows[0];
				expect(udt_name).to.equal('flour_blend_type');
			});
			    it('inserts a valid flour_blend value', async () => {
      const insertResult = await testPool.query(`
        INSERT INTO loafer (leaven_temp, leaven_start_time, flour_blend)
        VALUES (33, NOW(), 'cottage')
        RETURNING flour_blend
      `);
      expect(insertResult.rows[0].flour_blend).to.equal('cottage');
    });

    it('fails to insert an invalid flour_blend value', async () => {
      try {
        await testPool.query(`
          INSERT INTO loafer (leaven_temp, leaven_start_time, flour_blend)
          VALUES (33, NOW(), 'invalid_flour')
        `);
        throw new Error('Insert should have failed but did not');
      } catch (error) {
        expect(error.message).to.include('invalid input value for enum');
      }
    });
		})
		context('dough_creation_temp', () => {
			it('has a column called dough_creation_temp', async () => {
				const result = await testPool.query(`
					SELECT column_name
					FROM information_schema.columns
					WHERE table_name = 'loafer'
				`);
				const columnNames = result.rows.map((row) => row.column_name);
				expect(columnNames).to.include('dough_creation_temp');
			});
			it('has the correct data type for dough_creation_temp', async () => {
				const result = await testPool.query(`
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_name = 'loafer' AND column_name = 'dough_creation_temp'
      `);
				const { data_type } = result.rows[0];
				expect(data_type).to.equal('integer'); // Adjust based on your column definition
			});
			it("dough_creation_temp should be greater than 32", async () => {
				// Test inserting a valid value
				const validInsertResult = await testPool.query(`
					INSERT INTO loafer (leaven_temp, leaven_start_time, dough_creation_temp)
					VALUES (33, NOW(), 33)
					RETURNING dough_creation_temp
    	`);
				expect(validInsertResult.rows[0].dough_creation_temp).to.equal(33);

				// Test inserting an invalid value
				try {
					await testPool.query(`
        INSERT INTO loafer (dough_creation_temp, leaven_start_time)
        VALUES (32, NOW())
      `);
					throw new Error('Insert should have failed but did not');
				} catch (error) {
					expect(error.message).to.include('violates check constraint');
				}

				try {
					await testPool.query(`
        INSERT INTO loafer (dough_creation_temp, leaven_start_time)
        VALUES (31, NOW())
      `);
					throw new Error('Insert should have failed but did not');
				} catch (error) {
					expect(error.message).to.include('violates check constraint');
				}
			});

		})
	});
});
