import { testPool } from "../../db/db.mjs";
import { expect } from "chai";

// CREATE TYPE measure_type AS ENUM ('drop', 'g', 'ml', 'liter', 'tsp', 'Tbsp', 'whole',
//   'pinch', 'percent', 'piece', 'cup', 'ounce');

// CREATE TABLE if NOT EXISTS chefs_recipe_ingrs (
// 		id SERIAL PRIMARY KEY,
// 		created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
// 		updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
// 		recipe_id INT REFERENCES chefs_recipes(id),
// 		ingr_id INT REFERENCES ingrs(id),
// 		measure measure_type NOT NULL,
// 		qty NUMERIC NOT NULL,
// 		note TEXT
// );

// -- Create a trigger to automatically update the updated_at column on update
// CREATE TRIGGER update_chefs_recipes_ingrs_updated_at
// BEFORE UPDATE ON chefs_recipe_ingrs
// FOR EACH ROW
// EXECUTE FUNCTION update_updated_at_column();

describe('chefs_recipe_ingrs table', () => {

	it('table exists', async () => {
		const result = await testPool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'chefs_recipe_ingrs'
      );
    `);
		expect(result.rows[0].exists).to.be.true;
	});

	it('columns have correct data types and constraints', async () => {
		const result = await testPool.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'chefs_recipe_ingrs';
    `);
		const columns = result.rows;

		expect(columns).to.deep.include.members([
			{ column_name: 'id', data_type: 'integer', is_nullable: 'NO' },
			{ column_name: 'created_at', data_type: 'timestamp with time zone', is_nullable: 'NO' },
			{ column_name: 'updated_at', data_type: 'timestamp with time zone', is_nullable: 'NO' },
			{ column_name: 'recipe_id', data_type: 'integer', is_nullable: 'YES' },
			{ column_name: 'ingr_id', data_type: 'integer', is_nullable: 'YES' },
			{ column_name: 'measure', data_type: 'USER-DEFINED', is_nullable: 'NO' },
			{ column_name: 'qty', data_type: 'numeric', is_nullable: 'NO' },
			{ column_name: 'note', data_type: 'text', is_nullable: 'YES' },
		]);
	});

	it('measure_type enum exists and has correct values', async () => {
		const result = await testPool.query(`
      SELECT unnest(enum_range(NULL::measure_type)) AS value;
    `);
		const values = result.rows.map(row => row.value);

		expect(values).to.have.members([
			'drop', 'g', 'ml', 'liter', 'tsp', 'Tbsp', 'whole',
			'pinch', 'percent', 'piece', 'cup', 'ounce'
		]);
	});

	it('trigger exists', async () => {
		const result = await testPool.query(`
      SELECT tgname
      FROM pg_trigger
      WHERE tgname = 'update_chefs_recipes_ingrs_updated_at';
    `);
		expect(result.rows.length).to.equal(1);
	});

	it('foreign key constraints enforce valid recipe_id and ingr_id', async () => {
		try {
			await testPool.query(`
        INSERT INTO chefs_recipe_ingrs (recipe_id, ingr_id, measure, qty)
        VALUES (9999, 9999, 'g', 10);
      `);
			throw new Error('Expected query to fail, but it succeeded.');
		} catch (error) {
			expect(error.message).to.match(/violates foreign key constraint/);
		}
	});

	it('default values are set correctly', async () => {
		// Step 1: Insert a dummy recipe (if not exists)
		const recipeResult = await testPool.query(`
    INSERT INTO chefs_recipes (title, label, slug)
    VALUES ('Test Recipe', 'test-label', 'test-recipe')
    ON CONFLICT (slug) DO NOTHING
    RETURNING id;
  `);
		const recipeId = recipeResult.rows[0]?.id || (
			await testPool.query(`SELECT id FROM chefs_recipes WHERE slug = 'test-recipe'`)
		).rows[0].id;

		// Step 2: Insert a dummy ingredient (if not exists)
		const ingrResult = await testPool.query(`
    INSERT INTO ingrs (label_name, packaged_name, slug, ingredients)
    VALUES ('Test Ingredient', 'Test', 'test', $1)
    ON CONFLICT (slug) DO NOTHING
    RETURNING id;
  `, [["test"]]);
		const ingrId = ingrResult.rows[0]?.id || (
			await testPool.query(`SELECT id FROM ingrs WHERE name = 'Test Ingredient'`)
		).rows[0].id;

		// Step 3: Insert into `chefs_recipe_ingrs` using valid foreign keys
		const result = await testPool.query(`
    INSERT INTO chefs_recipe_ingrs (recipe_id, ingr_id, measure, qty)
    VALUES ($1, $2, 'tsp', 1.5)
    RETURNING created_at, updated_at;
  `, [recipeId, ingrId]);

		// Step 4: Validate default timestamps are set
		expect(result.rows[0].created_at).to.exist;
		expect(result.rows[0].updated_at).to.exist;
	});


	it('updated_at updates correctly on row update', async () => {
		// Step 1: Ensure a valid recipe exists
		const recipeResult = await testPool.query(`
    INSERT INTO chefs_recipes (title, label, slug)
    VALUES ('Test Recipe', 'test-label', 'test-recipe')
    ON CONFLICT (slug) DO NOTHING
    RETURNING id;
  `);
		const recipeId = recipeResult.rows[0]?.id || (
			await testPool.query(`SELECT id FROM chefs_recipes WHERE slug = 'test-recipe'`)
		).rows[0].id;

		// Step 2: Ensure a valid ingredient exists
		const ingrResult = await testPool.query(`
    INSERT INTO ingrs (slug, category, label_name, ingredients)
    VALUES ('test-ingr', 'misc.', 'Test Ingredient', ARRAY['salt'])
    ON CONFLICT (slug) DO NOTHING
    RETURNING id;
  `);
		const ingrId = ingrResult.rows[0]?.id || (
			await testPool.query(`SELECT id FROM ingrs WHERE slug = 'test-ingr'`)
		).rows[0].id;

		// Step 3: Insert into chefs_recipe_ingrs with valid foreign keys
		const insertResult = await testPool.query(`
    INSERT INTO chefs_recipe_ingrs (recipe_id, ingr_id, measure, qty)
    VALUES ($1, $2, 'tsp', 1.5)
    RETURNING id, updated_at;
  `, [recipeId, ingrId]);

		const { id, updated_at: initialUpdatedAt } = insertResult.rows[0];

		// Wait a short time to ensure updated_at will change
		await new Promise(resolve => setTimeout(resolve, 1000));

		// Step 4: Update the row to trigger updated_at change
		const updateResult = await testPool.query(`
    UPDATE chefs_recipe_ingrs
    SET qty = 2
    WHERE id = $1
    RETURNING updated_at;
  `, [id]);

		const { updated_at: updatedUpdatedAt } = updateResult.rows[0];

		// Step 5: Ensure updated_at changed
		expect(new Date(updatedUpdatedAt).getTime()).to.be.greaterThan(new Date(initialUpdatedAt).getTime());
	});


	it('qty must be positive', async () => {
		try {
			await testPool.query(`
        INSERT INTO chefs_recipe_ingrs (recipe_id, ingr_id, measure, qty)
        VALUES (1, 1, 'ml', -5);
      `);
			throw new Error('Expected query to fail, but it succeeded.');
		} catch (error) {
			expect(error.message).to.match(/violates check constraint/);
		}
	});

	it('measure column only allows valid ENUM values', async () => {
		try {
			await testPool.query(`
        INSERT INTO chefs_recipe_ingrs (recipe_id, ingr_id, measure, qty)
        VALUES (1, 1, 'invalid_unit', 5);
      `);
			throw new Error('Expected query to fail, but it succeeded.');
		} catch (error) {
			expect(error.message).to.match(/invalid input value for enum/);
		}
	});

});
