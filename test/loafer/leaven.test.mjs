// /leaven/new page has a form for entering the leaven amounts
// and it loads the current time into the display with a button to edit that as needed
// at the bottom a button to Create or Start Tracking
// action parses form by the schema, then awaits a sql query for the leaven ID
// sql table: leaven
// table should exist with the following columns:
// leaven_ water_amt
// leaven_ water_temp
// leaven_ starter_amt
// leaven_ flour_amt
// leaven_ start_time
// leaven_ start_temp
// leaven_ end_time
// leaven_ end_temp

import { testPool } from '../../db/db.mjs';
import { expect } from 'chai';

const newValidInitLeaven = {
	water_amt: 200,
	water_temp: 80,
	starter_amt: 30,
	flour_amt: 200,
}

const newValidStartedLeaven = {
	...newValidInitLeaven,
	start_time: '2024-10-01 08:00:00-07',
	start_temp: 72,
}

const newValidCompleteLeaven = {
	...newValidStartedLeaven,
	end_time: '2024-10-01 15:00:00-07',
	end_temp: 78,
}

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
				const newItem = Object.assign({}, newValidInitLeaven)
				const insertResult = await testPool.query(`
					INSERT INTO leaven (water_amt, water_temp, starter_amt, flour_amt)
					VALUES ($1, $2, $3, $4)
					RETURNING created_at, updated_at
   		 `, [newItem.water_amt, newItem.water_temp, newItem.starter_amt, newItem.flour_amt]);
				const { created_at, updated_at } = insertResult.rows[0];
				expect(created_at).to.be.a('date');
				expect(updated_at).to.be.a('date');
				expect(new Date(created_at).getTime()).to.equal(new Date(updated_at).getTime());
			});
			it('updates updated_at on update', async () => {
				const insertResult = await testPool.query(`
					INSERT INTO leaven (start_time)
					VALUES (NOW())
					RETURNING id, updated_at
    	`);
				const { id, updated_at } = insertResult.rows[0];
				// Wait for a second to ensure the updatedat timestamp will be different
				await new Promise((resolve) => setTimeout(resolve, 1000));
				const updateResult = await testPool.query(`
					UPDATE leaven
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
					WHERE table_name = 'leaven'
			`);
				const columnNames = result.rows.map((row) => row.column_name);
				expect(columnNames).to.include('water_amt');
			});
			it('has data type number for water_amt', async () => {
				const result = await testPool.query(`
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_name = 'leaven' AND column_name = 'water_amt'
      `);
				const { data_type } = result.rows[0];
				expect(data_type).to.equal('integer'); // Adjust based on your column definition
			});
			it('sets water_amt on insert', async () => {
				const newItem = Object.assign({}, newValidInitLeaven);
				const insertResult = await testPool.query(`
					INSERT INTO leaven (water_amt, water_temp, starter_amt, flour_amt)
					VALUES ($1, $2, $3, $4)
					RETURNING water_amt
   		 `, [newItem.water_amt, newItem.water_temp, newItem.starter_amt, newItem.flour_amt]);
				const { water_amt } = insertResult.rows[0];
				expect(water_amt).to.be.a('number');
			});
			it('updates water_amt on update', async () => {
				const newItem = Object.assign({}, newValidInitLeaven);
				const insertResult = await testPool.query(`
					INSERT INTO leaven (water_amt, water_temp, starter_amt, flour_amt)
					VALUES ($1, $2, $3, $4)
					RETURNING id, water_amt
   		 `, [newItem.water_amt, newItem.water_temp, newItem.starter_amt, newItem.flour_amt]);
				const { id, water_amt: initialValue } = insertResult.rows[0];

				// Wait for a second to ensure the timestamp will be different
				await new Promise((resolve) => setTimeout(resolve, 1000));

				const updateResult = await testPool.query(`
					UPDATE leaven
					SET water_amt = 208
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
					WHERE table_name = 'leaven'
			`);
				const columnNames = result.rows.map((row) => row.column_name);
				expect(columnNames).to.include('water_temp');
			});
			it('has data type number for water_temp', async () => {
				const result = await testPool.query(`
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_name = 'leaven' AND column_name = 'water_temp'
      `);
				const { data_type } = result.rows[0];
				expect(data_type).to.equal('integer'); // Adjust based on your column definition
			});
			it('sets water_temp on insert', async () => {
				const newItem = Object.assign({}, newValidInitLeaven);
				const insertResult = await testPool.query(`
					INSERT INTO leaven (water_amt, water_temp, starter_amt, flour_amt)
					VALUES ($1, $2, $3, $4)
					RETURNING water_temp
   		 `, [newItem.water_amt, newItem.water_temp, newItem.starter_amt, newItem.flour_amt]);
				const { water_temp } = insertResult.rows[0];
				expect(water_temp).to.be.a('number');
			});
			it('updates water_temp on update', async () => {
				const newItem = Object.assign({}, newValidInitLeaven)
				const insertResult = await testPool.query(`
					INSERT INTO leaven (water_amt, water_temp, starter_amt, flour_amt)
					VALUES ($1, $2, $3, $4)
					RETURNING id, water_temp
   		 `, [newItem.water_amt, newItem.water_temp, newItem.starter_amt, newItem.flour_amt]);
				const { id, water_temp: initialValue } = insertResult.rows[0];

				// Wait for a second to ensure the timestamp will be different
				await new Promise((resolve) => setTimeout(resolve, 1000));

				const updateResult = await testPool.query(`
					UPDATE leaven
					SET water_temp = 208
					WHERE id = $1
					RETURNING water_temp
      `, [id]);
				const updatedValue = updateResult.rows[0].water_temp;

				expect(updatedValue).to.be.a('number');
				expect(updatedValue).to.be.greaterThan(initialValue);
			});
		});
		context('starter_amt', () => {
			it('has a column called starter_amt', async () => {
				const result = await testPool.query(`
					SELECT column_name
					FROM information_schema.columns
					WHERE table_name = 'leaven'
			`);
				const columnNames = result.rows.map((row) => row.column_name);
				expect(columnNames).to.include('starter_amt');
			});
			it('has data type number for starter_amt', async () => {
				const result = await testPool.query(`
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_name = 'leaven' AND column_name = 'starter_amt'
      `);
				const { data_type } = result.rows[0];
				expect(data_type).to.equal('integer'); // Adjust based on your column definition
			});
			it('sets starter_amt on insert', async () => {
				const newItem = Object.assign({}, newValidInitLeaven);
				const insertResult = await testPool.query(`
					INSERT INTO leaven (water_amt, water_temp, starter_amt, flour_amt)
					VALUES ($1, $2, $3, $4)
					RETURNING starter_amt
   		 `, [newItem.water_amt, newItem.water_temp, newItem.starter_amt, newItem.flour_amt]);
				const { starter_amt } = insertResult.rows[0];
				expect(starter_amt).to.be.a('number');
			});
			it('updates starter_amt on update', async () => {
				const insertResult = await testPool.query(`
        INSERT INTO leaven (starter_amt)
        VALUES (204)
        RETURNING id, starter_amt
      `);
				const { id, starter_amt: initialValue } = insertResult.rows[0];

				// Wait for a second to ensure the timestamp will be different
				await new Promise((resolve) => setTimeout(resolve, 1000));

				const updateResult = await testPool.query(`
					UPDATE leaven
					SET starter_amt = 208
					WHERE id = $1
					RETURNING starter_amt
      `, [id]);
				const updatedValue = updateResult.rows[0].starter_amt;

				expect(updatedValue).to.be.a('number');
				expect(updatedValue).to.be.greaterThan(initialValue);
			});
		});
		context('flour_amt', () => {
			it('has a column called flour_amt', async () => {
				const result = await testPool.query(`
					SELECT column_name
					FROM information_schema.columns
					WHERE table_name = 'leaven'
			`);
				const columnNames = result.rows.map((row) => row.column_name);
				expect(columnNames).to.include('flour_amt');
			});
			it('has data type number for flour_amt', async () => {
				const result = await testPool.query(`
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_name = 'leaven' AND column_name = 'flour_amt'
      `);
				const { data_type } = result.rows[0];
				expect(data_type).to.equal('integer'); // Adjust based on your column definition
			});
			it('sets flour_amt on insert', async () => {
				const newItem = Object.assign({}, newValidInitLeaven);
				const insertResult = await testPool.query(`
					INSERT INTO leaven (water_amt, water_temp, starter_amt, flour_amt)
					VALUES ($1, $2, $3, $4)
					RETURNING flour_amt
   		 `, [newItem.water_amt, newItem.water_temp, newItem.starter_amt, newItem.flour_amt]);
				const { flour_amt } = insertResult.rows[0];
				expect(flour_amt).to.be.a('number');
			});
			it('updates flour_amt on update', async () => {
				const insertResult = await testPool.query(`
        INSERT INTO leaven (flour_amt)
        VALUES (204)
        RETURNING id, flour_amt
      `);
				const { id, flour_amt: initialValue } = insertResult.rows[0];

				// Wait for a second to ensure the timestamp will be different
				await new Promise((resolve) => setTimeout(resolve, 1000));

				const updateResult = await testPool.query(`
					UPDATE leaven
					SET flour_amt = 208
					WHERE id = $1
					RETURNING flour_amt
      `, [id]);
				const updatedValue = updateResult.rows[0].flour_amt;

				expect(updatedValue).to.be.a('number');
				expect(updatedValue).to.be.greaterThan(initialValue);
			});
		});
		context('start_time', () => {
			it('has a column called start_time', async () => {
				const result = await testPool.query(`
					SELECT column_name
					FROM information_schema.columns
					WHERE table_name = 'leaven'
			`);
				const columnNames = result.rows.map((row) => row.column_name);
				expect(columnNames).to.include('start_time');
			});
			it('has the correct data type for start_time', async () => {
				const result = await testPool.query(`
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_name = 'leaven' AND column_name = 'start_time'
      `);
				const { data_type } = result.rows[0];
				expect(data_type).to.equal('timestamp with time zone'); // Adjust based on your column definition
			});
			it('sets start_time on insert', async () => {
				const newItem = Object.assign({}, newValidStartedLeaven)
				const insertResult = await testPool.query(`
					INSERT INTO leaven (water_amt, water_temp, starter_amt, flour_amt, start_time, start_temp)
					VALUES ($1, $2, $3, $4, $5, $6)
					RETURNING start_time
   		 `, [newItem.water_amt, newItem.water_temp, newItem.starter_amt, newItem.flour_amt, newItem.start_time, newItem.start_temp]);
				const { start_time } = insertResult.rows[0];
				expect(start_time).to.be.a('date');
			});
			it('updates start_time on update', async () => {
				const newItem = Object.assign({}, newValidStartedLeaven)
				const insertResult = await testPool.query(`
					INSERT INTO leaven (water_amt, water_temp, starter_amt, flour_amt, start_time)
					VALUES ($1, $2, $3, $4, $5)
					RETURNING id, start_time
   		 `, [newItem.water_amt, newItem.water_temp, newItem.starter_amt, newItem.flour_amt, newItem.start_time]);
				const { id, start_time: initialLeavenCreationTime } = insertResult.rows[0];

				// Wait for a second to ensure the timestamp will be different
				await new Promise((resolve) => setTimeout(resolve, 1000));

				const updateResult = await testPool.query(`
					UPDATE leaven
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
					WHERE table_name = 'leaven'
			`);
				const columnNames = result.rows.map((row) => row.column_name);
				expect(columnNames).to.include('start_temp');
			});
			it('has data type number for start_temp', async () => {
				const result = await testPool.query(`
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_name = 'leaven' AND column_name = 'start_temp'
      `);
				const { data_type } = result.rows[0];
				expect(data_type).to.equal('integer'); // Adjust based on your column definition
			});
			it('sets start_temp on insert', async () => {
				const newItem = Object.assign({}, newValidStartedLeaven);
				const insertResult = await testPool.query(`
					INSERT INTO leaven (water_amt, water_temp, starter_amt, flour_amt, start_time, start_temp)
					VALUES ($1, $2, $3, $4, $5, $6)
					RETURNING start_temp
   		 `, [newItem.water_amt, newItem.water_temp, newItem.starter_amt, newItem.flour_amt, newItem.start_time, newItem.start_temp]);
				const { start_temp } = insertResult.rows[0];
				expect(start_temp).to.be.a('number');
			});
			it('updates start_temp on update', async () => {
				const newItem = Object.assign({}, newValidStartedLeaven);
				const insertResult = await testPool.query(`
					INSERT INTO leaven (water_amt, water_temp, starter_amt, flour_amt, start_time, start_temp)
					VALUES ($1, $2, $3, $4, $5, $6)
					RETURNING id, start_temp
   		 `, [newItem.water_amt, newItem.water_temp, newItem.starter_amt, newItem.flour_amt, newItem.start_time, newItem.start_temp]);
				const { id, start_temp: initialValue } = insertResult.rows[0];

				// Wait for a second to ensure the timestamp will be different
				await new Promise((resolve) => setTimeout(resolve, 1000));

				const updateResult = await testPool.query(`
					UPDATE leaven
					SET start_temp = 90
					WHERE id = $1
					RETURNING start_temp
      `, [id]);

				const updatedValue = updateResult.rows[0].start_temp;

				expect(updatedValue).to.be.a('number');
				expect(updatedValue).to.be.greaterThan(initialValue);
			});
		});
		context('end_time', () => {
			it('has a column called end_time', async () => {
				const result = await testPool.query(`
					SELECT column_name
					FROM information_schema.columns
					WHERE table_name = 'leaven'
			`);
				const columnNames = result.rows.map((row) => row.column_name);
				expect(columnNames).to.include('end_time');
			});
			it('has the timestamp with tz data type for end_time', async () => {
				const result = await testPool.query(`
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_name = 'leaven' AND column_name = 'end_time'
      `);
				const { data_type } = result.rows[0];
				expect(data_type).to.equal('timestamp with time zone'); // Adjust based on your column definition
			});
			it('sets end_time on insert', async () => {
				const newItem = Object.assign({}, newValidCompleteLeaven)
				const insertResult = await testPool.query(`
					INSERT INTO leaven (water_amt, water_temp, starter_amt, flour_amt, start_time, end_time)
					VALUES ($1, $2, $3, $4, $5, $6)
					RETURNING end_time
   		 `, [newItem.water_amt, newItem.water_temp, newItem.starter_amt, newItem.flour_amt, newItem.start_time, newItem.end_time]);
				const { end_time } = insertResult.rows[0];
				expect(end_time).to.be.a('date');
			});
			it('updates end_time on update', async () => {
				const newItem = Object.assign({}, newValidCompleteLeaven)
				const insertResult = await testPool.query(`
					INSERT INTO leaven (water_amt, water_temp, starter_amt, flour_amt, start_time, end_time)
					VALUES ($1, $2, $3, $4, $5, $6)
					RETURNING id, end_time
   		 `, [newItem.water_amt, newItem.water_temp, newItem.starter_amt, newItem.flour_amt, newItem.start_time, newItem.end_time]);
				const { id, end_time: initialValue } = insertResult.rows[0];

				// Wait for a second to ensure the timestamp will be different
				await new Promise((resolve) => setTimeout(resolve, 1000));

				const updateResult = await testPool.query(`
					UPDATE leaven
					SET end_time = NOW()
					WHERE id = $1
					RETURNING end_time
      `, [id]);
				const updatedValue = updateResult.rows[0].end_time;

				expect(updatedValue).to.be.a('date');
				expect(new Date(updatedValue).getTime()).to.be.greaterThan(new Date(initialValue).getTime());
			});
		});

	});
});
