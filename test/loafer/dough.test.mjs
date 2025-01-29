// export interface DoughFormData {
//   water_amt: number;
//   water_temp: number;
//   leaven_amt: number;
// 	leaven_id?: number;
//   flour_amt: number;
// 	flour_blend: string;
// 	start_time: string;
// 	start_temp?: number;
// salt_time
// salt amout
// salt water amt
// end_time
// end_temp
// TODO TURNS data
// }

import { testPool } from '../../db/db.mjs';
import { expect } from 'chai';

const newValidStartedDough = {
	water_amt: 700,
	water_temp: 80,
	leaven_amt: 200,
	flour_amt: 1000,
	flour_blend: "cottage",
	start_time: '2024-09-01 15:00:00-07',
	start_temp: 80,
}

const newValidSaltedDough = {
	...newValidStartedDough,
	salt_time: '2024-10-02 08:00:00-07',
	salt_amt: 22,
	salt_water_amt: 50,
}

const newValidCompleteDough = {
	...newValidSaltedDough,
	end_time: '2024-10-02 15:00:00-07',
	end_temp: 78,
}

describe('dough table attributes', () => {
	context("it should exist", () => {
		it("has a table named dough", async () => {
			const result = await testPool.query(`
			SELECT *
			FROM information_schema.tables
			WHERE table_name = 'dough'
			`)
			const tableNames = result.rows.map((row) => row.table_name);
			expect(tableNames).to.include('dough');
		})
	})
	context('columns', () => {
		context('column basics', () => {
			it('has an id column', async () => {
				const result = await testPool.query(`
				SELECT column_name
				FROM information_schema.columns
				WHERE table_name = 'dough'
			`);
				const columnNames = result.rows.map((row) => row.column_name);
				expect(columnNames).to.include('id');
			});
			it('has a column called created_at', async () => {
				const result = await testPool.query(`
				SELECT column_name
				FROM information_schema.columns
				WHERE table_name = 'dough'
			`);
				const columnNames = result.rows.map((row) => row.column_name);
				expect(columnNames).to.include('created_at');
			});
			it('has a column called updated_at', async () => {
				const result = await testPool.query(`
				SELECT column_name
				FROM information_schema.columns
				WHERE table_name = 'dough'
			`);
				const columnNames = result.rows.map((row) => row.column_name);
				expect(columnNames).to.include('updated_at');
			});
			// it would be cool to test the created_at and updated_at timestamps to be set as expected
			it('sets created_at and updated_at on insert', async () => {
				const newItem = Object.assign({}, newValidStartedDough)
				const insertResult = await testPool.query(`
					INSERT INTO dough (water_amt, water_temp, leaven_amt, flour_amt, flour_blend, start_time, start_temp)
					VALUES ($1, $2, $3, $4, $5, $6, $7)
					RETURNING created_at, updated_at
   		 `, [newItem.water_amt, newItem.water_temp, newItem.leaven_amt, newItem.flour_amt, newItem.flour_blend, newItem.start_time, newItem.start_temp]);

				const { created_at, updated_at } = insertResult.rows[0];
				expect(created_at).to.be.a('date');
				expect(updated_at).to.be.a('date');
				expect(new Date(created_at).getTime()).to.equal(new Date(updated_at).getTime());
			});
			it('updates updated_at on update', async () => {
				const insertResult = await testPool.query(`
					INSERT INTO dough (start_time)
					VALUES (NOW())
					RETURNING id, updated_at
    	`);
				const { id, updated_at } = insertResult.rows[0];
				// Wait for a second to ensure the updated_at timestamp will be different
				await new Promise((resolve) => setTimeout(resolve, 1000));
				const updateResult = await testPool.query(`
					UPDATE dough
					SET start_time = '2024-09-09'
					WHERE id = $1
					RETURNING id, updated_at
    	`, [id]);
				const updatedAtAfterUpdate = updateResult.rows[0].updated_at;
				expect(updatedAtAfterUpdate).to.be.a('date');
				expect(updatedAtAfterUpdate).to.not.equal(updated_at);
				expect(new Date(updatedAtAfterUpdate).getTime()).to.be.greaterThan(new Date(updated_at).getTime());
			});
		});
		context('water_amt', () => {
			it('has a column called water_amt', async () => {
				const result = await testPool.query(`
					SELECT column_name
					FROM information_schema.columns
					WHERE table_name = 'dough'
			`);
				const columnNames = result.rows.map((row) => row.column_name);
				expect(columnNames).to.include('water_amt');
			});
			it('has data type number for water_amt', async () => {
				const result = await testPool.query(`
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_name = 'dough' AND column_name = 'water_amt'
      `);
				const { data_type } = result.rows[0];
				expect(data_type).to.equal('integer'); // Adjust based on your column definition
			});
			it('sets water_amt on insert', async () => {
				const newItem = Object.assign({}, newValidStartedDough)
				const insertResult = await testPool.query(`
					INSERT INTO dough (water_amt, water_temp, leaven_amt, flour_amt, flour_blend, start_time, start_temp)
					VALUES ($1, $2, $3, $4, $5, $6, $7)
					RETURNING water_amt
   		 `, [newItem.water_amt, newItem.water_temp, newItem.leaven_amt, newItem.flour_amt, newItem.flour_blend, newItem.start_time, newItem.start_temp]);
								
				const { water_amt } = insertResult.rows[0];
				expect(water_amt).to.be.a('number');
			});
			it('updates water_amt on update', async () => {
				const newItem = Object.assign({}, newValidStartedDough)
				const insertResult = await testPool.query(`
					INSERT INTO dough (water_amt, water_temp, leaven_amt, flour_amt, flour_blend, start_time, start_temp)
					VALUES ($1, $2, $3, $4, $5, $6, $7)
					RETURNING id, water_amt
   		 `, [newItem.water_amt, newItem.water_temp, newItem.leaven_amt, newItem.flour_amt, newItem.flour_blend, newItem.start_time, newItem.start_temp]);
				const { id, water_amt: initialValue } = insertResult.rows[0];

				// Wait for a second to ensure the timestamp will be different
				await new Promise((resolve) => setTimeout(resolve, 1000));

				const updateResult = await testPool.query(`
					UPDATE dough
					SET water_amt = 800
					WHERE id = $1
					RETURNING water_amt
      `, [id]);
				const updatedValue = updateResult.rows[0].water_amt;

				expect(updatedValue).to.be.a('number');
				expect(updatedValue).to.be.greaterThan(initialValue);
			});
		});
		context('water_temp', () => {
			it('has a column called water_temp', async () => {
				const result = await testPool.query(`
					SELECT column_name
					FROM information_schema.columns
					WHERE table_name = 'dough'
			`);
				const columnNames = result.rows.map((row) => row.column_name);
				expect(columnNames).to.include('water_temp');
			});
			it('has data type number for water_temp', async () => {
				const result = await testPool.query(`
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_name = 'dough' AND column_name = 'water_temp'
      `);
				const { data_type } = result.rows[0];
				expect(data_type).to.equal('integer'); // Adjust based on your column definition
			});
			it('sets water_temp on insert', async () => {
				const newItem = Object.assign({}, newValidStartedDough)
				const insertResult = await testPool.query(`
					INSERT INTO dough (water_amt, water_temp, leaven_amt, flour_amt, flour_blend, start_time, start_temp)
					VALUES ($1, $2, $3, $4, $5, $6, $7)
					RETURNING water_temp
   		 `, [newItem.water_amt, newItem.water_temp, newItem.leaven_amt, newItem.flour_amt, newItem.flour_blend, newItem.start_time, newItem.start_temp]);
				const { water_temp } = insertResult.rows[0];
				expect(water_temp).to.be.a('number');
			});
			it('updates water_temp on update', async () => {
				const newItem = Object.assign({}, newValidStartedDough)
				const insertResult = await testPool.query(`
					INSERT INTO dough (water_amt, water_temp, leaven_amt, flour_amt, flour_blend, start_time, start_temp)
					VALUES ($1, $2, $3, $4, $5, $6, $7)
					RETURNING id, water_temp
   		 `, [newItem.water_amt, newItem.water_temp, newItem.leaven_amt, newItem.flour_amt, newItem.flour_blend, newItem.start_time, newItem.start_temp]);
				const { id, water_temp: initialValue } = insertResult.rows[0];

				// Wait for a second to ensure the timestamp will be different
				await new Promise((resolve) => setTimeout(resolve, 1000));

				const updateResult = await testPool.query(`
					UPDATE dough
					SET water_temp = 90
					WHERE id = $1
					RETURNING water_temp
      `, [id]);
				const updatedValue = updateResult.rows[0].water_temp;

				expect(updatedValue).to.be.a('number');
				expect(updatedValue).to.be.greaterThan(initialValue);
			});
		});
		context('leaven_amt', () => {
			it('has a column called leaven_amt', async () => {
				const result = await testPool.query(`
					SELECT column_name
					FROM information_schema.columns
					WHERE table_name = 'dough'
			`);
				const columnNames = result.rows.map((row) => row.column_name);
				expect(columnNames).to.include('leaven_amt');
			});
			it('has data type number for leaven_amt', async () => {
				const result = await testPool.query(`
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_name = 'dough' AND column_name = 'leaven_amt'
      `);
				const { data_type } = result.rows[0];
				expect(data_type).to.equal('integer'); // Adjust based on your column definition
			});
			it('sets leaven_amt on insert', async () => {
				const newItem = Object.assign({}, newValidStartedDough)
				const insertResult = await testPool.query(`
					INSERT INTO dough (water_amt, water_temp, leaven_amt, flour_amt, flour_blend, start_time, start_temp)
					VALUES ($1, $2, $3, $4, $5, $6, $7)
					RETURNING leaven_amt
   		 `, [newItem.water_amt, newItem.water_temp, newItem.leaven_amt, newItem.flour_amt, newItem.flour_blend, newItem.start_time, newItem.start_temp]);
				const { leaven_amt } = insertResult.rows[0];
				expect(leaven_amt).to.be.a('number');
			});
			it('updates leaven_amt on update', async () => {
				const newItem = Object.assign({}, newValidStartedDough)
				const insertResult = await testPool.query(`
					INSERT INTO dough (water_amt, water_temp, leaven_amt, flour_amt, flour_blend, start_time, start_temp)
					VALUES ($1, $2, $3, $4, $5, $6, $7)
					RETURNING id, leaven_amt
   		 `, [newItem.water_amt, newItem.water_temp, newItem.leaven_amt, newItem.flour_amt, newItem.flour_blend, newItem.start_time, newItem.start_temp]);
				const { id, leaven_amt: initialValue } = insertResult.rows[0];

				// Wait for a second to ensure the timestamp will be different
				await new Promise((resolve) => setTimeout(resolve, 1000));

				const updateResult = await testPool.query(`
					UPDATE dough
					SET leaven_amt = 208
					WHERE id = $1
					RETURNING leaven_amt
      `, [id]);
				const updatedValue = updateResult.rows[0].leaven_amt;

				expect(updatedValue).to.be.a('number');
				expect(updatedValue).to.be.greaterThan(initialValue);
			});
		});
		context('flour_amt', () => {
			it('has a column called flour_amt', async () => {
				const result = await testPool.query(`
					SELECT column_name
					FROM information_schema.columns
					WHERE table_name = 'dough'
			`);
				const columnNames = result.rows.map((row) => row.column_name);
				expect(columnNames).to.include('flour_amt');
			});
			it('has data type number for flour_amt', async () => {
				const result = await testPool.query(`
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_name = 'dough' AND column_name = 'flour_amt'
      `);
				const { data_type } = result.rows[0];
				expect(data_type).to.equal('integer'); // Adjust based on your column definition
			});
			it('sets flour_amt on insert', async () => {
				const newItem = Object.assign({}, newValidStartedDough)
				const insertResult = await testPool.query(`
					INSERT INTO dough (water_amt, water_temp, leaven_amt, flour_amt, flour_blend, start_time, start_temp)
					VALUES ($1, $2, $3, $4, $5, $6, $7)
					RETURNING flour_amt
   		 `, [newItem.water_amt, newItem.water_temp, newItem.leaven_amt, newItem.flour_amt, newItem.flour_blend, newItem.start_time, newItem.start_temp]);
				const { flour_amt } = insertResult.rows[0];
				expect(flour_amt).to.be.a('number');
			});
			it('updates flour_amt on update', async () => {
				const newItem = Object.assign({}, newValidStartedDough)
				const insertResult = await testPool.query(`
					INSERT INTO dough (water_amt, water_temp, leaven_amt, flour_amt, flour_blend, start_time, start_temp)
					VALUES ($1, $2, $3, $4, $5, $6, $7)
					RETURNING id, flour_amt
   		 `, [newItem.water_amt, newItem.water_temp, newItem.leaven_amt, newItem.flour_amt, newItem.flour_blend, newItem.start_time, newItem.start_temp]);
				const { id, flour_amt: initialValue } = insertResult.rows[0];

				// Wait for a second to ensure the timestamp will be different
				await new Promise((resolve) => setTimeout(resolve, 1000));

				const updateResult = await testPool.query(`
					UPDATE dough
					SET flour_amt = 1200
					WHERE id = $1
					RETURNING flour_amt
      `, [id]);
				const updatedValue = updateResult.rows[0].flour_amt;

				expect(updatedValue).to.be.a('number');
				expect(updatedValue).to.be.greaterThan(initialValue);
			});
		});
		context('flour_blend', () => {
			it('has a column called flour_blend', async () => {
				const result = await testPool.query(`
					SELECT column_name
					FROM information_schema.columns
					WHERE table_name = 'dough'
				`);
				const columnNames = result.rows.map((row) => row.column_name);
				expect(columnNames).to.include('flour_blend');
			});
			it('flour_blend is an enum with a defined set of values', async () => {
				const result = await testPool.query(`
					SELECT udt_name
					FROM information_schema.columns
					WHERE table_name = 'dough' AND column_name = 'flour_blend'
      `);
				const { udt_name } = result.rows[0];
				expect(udt_name).to.equal('flour_blend_type');
			});
			it('inserts a valid flour_blend value', async () => {
				const newItem = Object.assign({}, newValidStartedDough)
				const insertResult = await testPool.query(`
					INSERT INTO dough (water_amt, water_temp, leaven_amt, flour_amt, flour_blend, start_time, start_temp)
					VALUES ($1, $2, $3, $4, $5, $6, $7)
					RETURNING flour_blend
   		 `, [newItem.water_amt, newItem.water_temp, newItem.leaven_amt, newItem.flour_amt, newItem.flour_blend, newItem.start_time, newItem.start_temp]);
				expect(insertResult.rows[0].flour_blend).to.equal('cottage');
			});

			it('fails to insert an invalid flour_blend value', async () => {
				try {
				const newItem = Object.assign({}, newValidStartedDough)
				newItem["flour_blend"] = "invalid"
				await testPool.query(`
					INSERT INTO dough (water_amt, water_temp, leaven_amt, flour_amt, flour_blend, start_time, start_temp)
					VALUES ($1, $2, $3, $4, $5, $6, $7)
					RETURNING start_temp
   		 `, [newItem.water_amt, newItem.water_temp, newItem.leaven_amt, newItem.flour_amt, newItem.flour_blend, newItem.start_time, newItem.start_temp]);
					
					throw new Error('Insert should have failed but did not');
				} catch (error) {
					expect(error.message).to.include('invalid input value for enum');
				}
			});
		})
		context('start_time', () => {
			it('has a column called start_time', async () => {
				const result = await testPool.query(`
					SELECT column_name
					FROM information_schema.columns
					WHERE table_name = 'dough'
			`);
				const columnNames = result.rows.map((row) => row.column_name);
				expect(columnNames).to.include('start_time');
			});
			it('has the correct data type for start_time', async () => {
				const result = await testPool.query(`
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_name = 'dough' AND column_name = 'start_time'
      `);
				const { data_type } = result.rows[0];
				expect(data_type).to.equal('timestamp with time zone'); // Adjust based on your column definition
			});
			it('sets start_time on insert', async () => {
				const newItem = Object.assign({}, newValidStartedDough)
				const insertResult = await testPool.query(`
					INSERT INTO dough (water_amt, water_temp, leaven_amt, flour_amt, flour_blend, start_time, start_temp)
					VALUES ($1, $2, $3, $4, $5, $6, $7)
					RETURNING start_time
   		 `, [newItem.water_amt, newItem.water_temp, newItem.leaven_amt, newItem.flour_amt, newItem.flour_blend, newItem.start_time, newItem.start_temp]);
				const { start_time } = insertResult.rows[0];
				expect(start_time).to.be.a('date');
			});
			it('updates start_time on update', async () => {
				const newItem = Object.assign({}, newValidStartedDough)
				const insertResult = await testPool.query(`
					INSERT INTO dough (water_amt, water_temp, leaven_amt, flour_amt, flour_blend, start_time, start_temp)
					VALUES ($1, $2, $3, $4, $5, $6, $7)
					RETURNING id, start_time
   		 `, [newItem.water_amt, newItem.water_temp, newItem.leaven_amt, newItem.flour_amt, newItem.flour_blend, newItem.start_time, newItem.start_temp]);
				const { id, start_time: initialLeavenCreationTime } = insertResult.rows[0];

				// Wait for a second to ensure the timestamp will be different
				await new Promise((resolve) => setTimeout(resolve, 1000));

				const updateResult = await testPool.query(`
					UPDATE dough
					SET start_time = NOW()
					WHERE id = $1
					RETURNING start_time
      `, [id]);
				const updatedValue = updateResult.rows[0].start_time;

				expect(updatedValue).to.be.a('date');
				expect(new Date(updatedValue).getTime()).to.be.greaterThan(new Date(initialLeavenCreationTime).getTime());
			});
		});
		context('start_temp', () => {
			it('has a column called start_temp', async () => {
				const result = await testPool.query(`
					SELECT column_name
					FROM information_schema.columns
					WHERE table_name = 'dough'
			`);
				const columnNames = result.rows.map((row) => row.column_name);
				expect(columnNames).to.include('start_temp');
			});
			it('has data type number for start_temp', async () => {
				const result = await testPool.query(`
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_name = 'dough' AND column_name = 'start_temp'
      `);
				const { data_type } = result.rows[0];
				expect(data_type).to.equal('integer'); // Adjust based on your column definition
			});
			it('sets start_temp on insert', async () => {
				const newItem = Object.assign({}, newValidStartedDough)
				const insertResult = await testPool.query(`
					INSERT INTO dough (water_amt, water_temp, leaven_amt, flour_amt, flour_blend, start_time, start_temp)
					VALUES ($1, $2, $3, $4, $5, $6, $7)
					RETURNING start_temp
   		 `, [newItem.water_amt, newItem.water_temp, newItem.leaven_amt, newItem.flour_amt, newItem.flour_blend, newItem.start_time, newItem.start_temp]);
				const { start_temp } = insertResult.rows[0];
				expect(start_temp).to.be.a('number');
			});
			it('updates start_temp on update', async () => {
				const newItem = Object.assign({}, newValidStartedDough)
				const insertResult = await testPool.query(`
					INSERT INTO dough (water_amt, water_temp, leaven_amt, flour_amt, flour_blend, start_time, start_temp)
					VALUES ($1, $2, $3, $4, $5, $6, $7)
					RETURNING id, start_temp
   		 `, [newItem.water_amt, newItem.water_temp, newItem.leaven_amt, newItem.flour_amt, newItem.flour_blend, newItem.start_time, newItem.start_temp]);
				const { id, start_temp: initialValue } = insertResult.rows[0];

				// Wait for a second to ensure the timestamp will be different
				await new Promise((resolve) => setTimeout(resolve, 1000));

				const updateResult = await testPool.query(`
					UPDATE dough
					SET start_temp = 90
					WHERE id = $1
					RETURNING start_temp
      `, [id]);

				const updatedValue = updateResult.rows[0].start_temp;

				expect(updatedValue).to.be.a('number');
				expect(updatedValue).to.be.greaterThan(initialValue);
			});
		});
		context('salt_time', () => {
			it('has a column called salt_time', async () => {
				const result = await testPool.query(`
					SELECT column_name
					FROM information_schema.columns
					WHERE table_name = 'dough'
			`);
				const columnNames = result.rows.map((row) => row.column_name);
				expect(columnNames).to.include('salt_time');
			});
			it('has the correct data type for salt_time', async () => {
				const result = await testPool.query(`
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_name = 'dough' AND column_name = 'salt_time'
      `);
				const { data_type } = result.rows[0];
				expect(data_type).to.equal('timestamp with time zone'); // Adjust based on your column definition
			});
			it('sets salt_time on insert', async () => {
				const newItem = Object.assign({}, newValidSaltedDough)
				const insertResult = await testPool.query(`
					INSERT INTO dough (water_amt, water_temp, leaven_amt, flour_amt, flour_blend, start_time, start_temp, salt_time)
					VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
					RETURNING salt_time
   		 `, [newItem.water_amt, newItem.water_temp, newItem.leaven_amt, newItem.flour_amt, newItem.flour_blend, newItem.start_time, newItem.start_temp, newItem.salt_time]);
				const { salt_time } = insertResult.rows[0];
				expect(salt_time).to.be.a('date');
			});
			it('updates salt_time on update', async () => {
				const newItem = Object.assign({}, newValidSaltedDough)
				const insertResult = await testPool.query(`
					INSERT INTO dough (water_amt, water_temp, leaven_amt, flour_amt, flour_blend, start_time, start_temp, salt_time)
					VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
					RETURNING id, salt_time
   		 `, [newItem.water_amt, newItem.water_temp, newItem.leaven_amt, newItem.flour_amt, newItem.flour_blend, newItem.start_time, newItem.start_temp, newItem.salt_time]);
				const { id, salt_time: initialValue } = insertResult.rows[0];

				// Wait for a second to ensure the timestamp will be different
				await new Promise((resolve) => setTimeout(resolve, 1000));

				const updateResult = await testPool.query(`
					UPDATE dough
					SET salt_time = NOW()
					WHERE id = $1
					RETURNING salt_time
      `, [id]);
				const updatedValue = updateResult.rows[0].salt_time;

				expect(updatedValue).to.be.a('date');
				expect(new Date(updatedValue).getTime()).to.be.greaterThan(new Date(initialValue).getTime());
			});
		});
		context('end_time', () => {
			it('has a column called end_time', async () => {
				const result = await testPool.query(`
					SELECT column_name
					FROM information_schema.columns
					WHERE table_name = 'dough'
			`);
				const columnNames = result.rows.map((row) => row.column_name);
				expect(columnNames).to.include('end_time');
			});
			it('has the timestamp with tz data type for end_time', async () => {
				const result = await testPool.query(`
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_name = 'dough' AND column_name = 'end_time'
      `);
				const { data_type } = result.rows[0];
				expect(data_type).to.equal('timestamp with time zone'); // Adjust based on your column definition
			});
			it('sets end_time on insert', async () => {
				const newItem = Object.assign({}, newValidCompleteDough)
				const insertResult = await testPool.query(`
					INSERT INTO dough (water_amt, water_temp, leaven_amt, flour_amt, flour_blend, start_time, start_temp, salt_time, end_time, end_temp)
					VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
					RETURNING end_time
   		 `, [newItem.water_amt, newItem.water_temp, newItem.leaven_amt, newItem.flour_amt, newItem.flour_blend, newItem.start_time, newItem.start_temp, newItem.salt_time, newItem.end_time, newItem.end_temp]);
				const { end_time } = insertResult.rows[0];
				expect(end_time).to.be.a('date');
			});
			it('updates end_time on update', async () => {
				const newItem = Object.assign({}, newValidCompleteDough)
				const insertResult = await testPool.query(`
					INSERT INTO dough (water_amt, water_temp, leaven_amt, flour_amt, flour_blend, start_time, start_temp, salt_time, end_time, end_temp)
					VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
					RETURNING id, end_time
   		 `, [newItem.water_amt, newItem.water_temp, newItem.leaven_amt, newItem.flour_amt, newItem.flour_blend, newItem.start_time, newItem.start_temp, newItem.salt_time, newItem.end_time, newItem.end_temp]);
				const { id, end_time: initialValue } = insertResult.rows[0];

				// Wait for a second to ensure the timestamp will be different
				await new Promise((resolve) => setTimeout(resolve, 1000));

				const updateResult = await testPool.query(`
					UPDATE dough
					SET end_time = NOW()
					WHERE id = $1
					RETURNING end_time
      `, [id]);
				const updatedValue = updateResult.rows[0].end_time;

				expect(updatedValue).to.be.a('date');
				expect(new Date(updatedValue).getTime()).to.be.greaterThan(new Date(initialValue).getTime());
			});
		});
		context('end_temp', () => {
			it('has a column called end_temp', async () => {
				const result = await testPool.query(`
					SELECT column_name
					FROM information_schema.columns
					WHERE table_name = 'dough'
			`);
				const columnNames = result.rows.map((row) => row.column_name);
				expect(columnNames).to.include('end_temp');
			});
			it('has data type number for end_temp', async () => {
				const result = await testPool.query(`
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_name = 'dough' AND column_name = 'end_temp'
      `);
				const { data_type } = result.rows[0];
				expect(data_type).to.equal('integer'); // Adjust based on your column definition
			});
			it('sets end_temp on insert', async () => {
				const newItem = Object.assign({}, newValidCompleteDough)
				const insertResult = await testPool.query(`
					INSERT INTO dough (water_amt, water_temp, leaven_amt, flour_amt, flour_blend, start_time, start_temp, salt_time, end_time, end_temp)
					VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
					RETURNING end_temp
   		 `, [newItem.water_amt, newItem.water_temp, newItem.leaven_amt, newItem.flour_amt, newItem.flour_blend, newItem.start_time, newItem.start_temp, newItem.salt_time, newItem.end_time, newItem.end_temp]);
				const { end_temp } = insertResult.rows[0];
				expect(end_temp).to.be.a('number');
			});
			it('updates end_temp on update', async () => {
				const newItem = Object.assign({}, newValidCompleteDough)
				const insertResult = await testPool.query(`
					INSERT INTO dough (water_amt, water_temp, leaven_amt, flour_amt, flour_blend, start_time, start_temp, salt_time, end_time, end_temp)
					VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
					RETURNING id, end_temp
   		 `, [newItem.water_amt, newItem.water_temp, newItem.leaven_amt, newItem.flour_amt, newItem.flour_blend, newItem.start_time, newItem.start_temp, newItem.salt_time, newItem.end_time, newItem.end_temp]);
				const { id, end_temp: initialValue } = insertResult.rows[0];

				// Wait for a second to ensure the timestamp will be different
				await new Promise((resolve) => setTimeout(resolve, 1000));

				const updateResult = await testPool.query(`
					UPDATE dough
					SET end_temp = 90
					WHERE id = $1
					RETURNING end_temp
      `, [id]);

				const updatedValue = updateResult.rows[0].end_temp;

				expect(updatedValue).to.be.a('number');
				expect(updatedValue).to.be.greaterThan(initialValue);
			});
		});

	});
});
