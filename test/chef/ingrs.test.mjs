import { testPool } from "../../db/db.mjs";
import { expect } from "chai";

// CREATE TABLE IF NOT EXISTS ingrs (
// 		id SERIAL PRIMARY KEY,
// 		created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
//     updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
// 		slug VARCHAR(255) NOT NULL CONSTRAINT ingr_slug_unique UNIQUE,
// 		category VARCHAR(255) NOT NULL DEFAULT 'misc.',
// 		brand VARCHAR(255) NULL,
// 		packaged_name VARCHAR(255) NULL,
// 		label_name VARCHAR(255) NOT NULL,
// 		ingredients TEXT[] NOT NULL,
// 		allergens TEXT[] NOT NULL DEFAULT '{}',
// 		CONSTRAINT check_valid_allergens CHECK (
// 				allergens <@ ARRAY[
// 						'milk', 'eggs', 'fish', 'shellfish', 'tree nuts', 
// 						'peanuts', 'wheat', 'soy', 'sesame'
// 				]::TEXT[]
//     )
// );

describe('ingrs table', () => {

	it('table exists', async () => {
		const result = await testPool.query(`
			SELECT EXISTS (
				SELECT FROM information_schema.tables 
				WHERE table_name = 'ingrs'
			);
		`);
		expect(result.rows[0].exists).to.equal(true);
	});

	it('columns have correct data types and constraints', async () => {
		const result = await testPool.query(`
            SELECT column_name, data_type, is_nullable
            FROM information_schema.columns
            WHERE table_name = 'ingrs';
        `);
		const columns = result.rows;
		expect(columns).to.deep.include.members([
			{ column_name: 'id', data_type: 'integer', is_nullable: 'NO' },
			{ column_name: 'created_at', data_type: 'timestamp with time zone', is_nullable: 'NO' },
			{ column_name: 'updated_at', data_type: 'timestamp with time zone', is_nullable: 'NO' },
			{ column_name: 'slug', data_type: 'character varying', is_nullable: 'NO' },
			{ column_name: 'category', data_type: 'character varying', is_nullable: 'NO' },
			{ column_name: 'brand', data_type: 'character varying', is_nullable: 'YES' },
			{ column_name: 'packaged_name', data_type: 'character varying', is_nullable: 'YES' },
			{ column_name: 'label_name', data_type: 'character varying', is_nullable: 'NO' },
			{ column_name: 'ingredients', data_type: 'ARRAY', is_nullable: 'NO' },
			{ column_name: 'allergens', data_type: 'ARRAY', is_nullable: 'NO' },
		]);
	});

	it('primary key uniqueness', async () => {
		const result = await testPool.query(`
    SELECT COUNT(*) - COUNT(DISTINCT id) AS duplicate_ids
    FROM ingrs;
  `);
		expect(parseInt(result.rows[0].duplicate_ids)).to.equal(0);
	});

	it('slug column enforces uniqueness', async () => {
		try {
			await testPool.query(`INSERT INTO ingrs (slug, category, label_name, ingredients) VALUES ('unique_slug', 'misc.', 'Test Label', ARRAY['sugar'])`);
			await testPool.query(`INSERT INTO ingrs (slug, category, label_name, ingredients) VALUES ('unique_slug', 'misc.', 'Another Label', ARRAY['flour'])`);
		} catch (error) {
			expect(error.message).to.match(/duplicate key value violates unique constraint "ingr_slug_unique"/);
		}
	});

	it('default values are set correctly', async () => {
		const result = await testPool.query(`
    INSERT INTO ingrs (slug, label_name, ingredients)
    VALUES ('test-defaults', 'Default Test', ARRAY['water'])
    RETURNING category, allergens;
  `);
		expect(result.rows[0].category).to.equal('misc.');
		expect(result.rows[0].allergens).to.deep.equal([]);
	});

	it('check_valid_allergens constraint exists', async () => {
		const result = await testPool.query(`
            SELECT conname
            FROM pg_constraint
            WHERE conname = 'check_valid_allergens';
        `);
		expect(result.rows.length).to.equal(1);
	});

	it('check_valid_allergens constraint rejects invalid allergens', async () => {
		try {
			await testPool.query(`
      INSERT INTO ingrs (slug, label_name, ingredients, allergens)
      VALUES ('bad-allergen', 'Invalid Test', ARRAY['flour'], ARRAY['not-a-real-allergen']);
    `);
			throw new Error('Expected query to fail, but it succeeded.');
		} catch (error) {
			expect(error.message).to.match(/violates check constraint "check_valid_allergens"/);
		}
	});

	it('trigger exists', async () => {
		const result = await testPool.query(`
      SELECT tgname
      FROM pg_trigger
      WHERE tgname = 'update_ingrs_updated_at';
    `);
		expect(result.rows.length).to.equal(1);
	});

	it('updated_at updates on row modification', async () => {
		const insertResult = await testPool.query(`
    INSERT INTO ingrs (slug, label_name, ingredients) 
    VALUES ('update-test', 'Update Test', ARRAY['honey']) 
    RETURNING id, updated_at;
  `);

		const ingrId = insertResult.rows[0].id;
		const initialUpdatedAt = insertResult.rows[0].updated_at;

		// Small delay to ensure timestamps change
		await new Promise(res => setTimeout(res, 1000));

		await testPool.query(`UPDATE ingrs SET label_name = 'Updated Label' WHERE id = $1`, [ingrId]);

		const updateResult = await testPool.query(`SELECT updated_at FROM ingrs WHERE id = $1`, [ingrId]);
		expect(new Date(updateResult.rows[0].updated_at)).to.be.greaterThan(new Date(initialUpdatedAt));
	});


});