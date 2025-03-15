import { testPool } from "../../db/db.mjs";
import { expect } from "chai";

// CREATE TABLE if NOT EXISTS chefs_recipes (
// 		id SERIAL PRIMARY KEY,
// 		created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
//     updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
// 		category VARCHAR(255) DEFAULT 'misc.' NOT NULL,
// 		title VARCHAR(255) NOT NULL,
// 		label VARCHAR(255) NOT NULL,
// 		slug VARCHAR(255) NOT NULL CONSTRAINT chefsrecipe_slug_unique UNIQUE,
// 		steps TEXT [] NOT NULL DEFAULT '{}',
// 		notes TEXT [] NOT NULL DEFAULT '{}'
// );

describe('chefs_recipes table', () => {

  it('table exists', async () => {
    const result = await testPool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'chefs_recipes'
      );
    `);
    expect(result.rows[0].exists).to.be.true;
  });

  it('columns have correct data types and constraints', async () => {
    const result = await testPool.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'chefs_recipes';
    `);
    const columns = result.rows;

    expect(columns).to.deep.include.members([
      { column_name: 'id', data_type: 'integer', is_nullable: 'NO' },
      { column_name: 'created_at', data_type: 'timestamp with time zone', is_nullable: 'NO' },
      { column_name: 'updated_at', data_type: 'timestamp with time zone', is_nullable: 'NO' },
      { column_name: 'category', data_type: 'character varying', is_nullable: 'NO' },
      { column_name: 'title', data_type: 'character varying', is_nullable: 'NO' },
      { column_name: 'label', data_type: 'character varying', is_nullable: 'NO' },
      { column_name: 'slug', data_type: 'character varying', is_nullable: 'NO' },
      { column_name: 'steps', data_type: 'ARRAY', is_nullable: 'NO' },
      { column_name: 'notes', data_type: 'ARRAY', is_nullable: 'NO' },
    ]);
  });

  it('slug column enforces uniqueness', async () => {
    await testPool.query(`
      INSERT INTO chefs_recipes (slug, category, title, label, steps)
      VALUES ('unique_slug', 'misc.', 'Test Recipe', 'Test Label', ARRAY['Step 1']);
    `);

    try {
      await testPool.query(`
        INSERT INTO chefs_recipes (slug, category, title, label, steps)
        VALUES ('unique_slug', 'misc.', 'Another Recipe', 'Another Label', ARRAY['Step A']);
      `);
      throw new Error('Expected query to fail, but it succeeded.');
    } catch (error) {
      expect(error.message).to.match(/duplicate key value violates unique constraint "chefsrecipe_slug_unique"/);
    }
  });

  it('default values are set correctly', async () => {
    const result = await testPool.query(`
      INSERT INTO chefs_recipes (slug, title, label, steps)
      VALUES ('test-defaults', 'Default Test', 'Default Label', ARRAY['Step 1'])
      RETURNING category, notes;
    `);

    expect(result.rows[0].category).to.equal('misc.');
    expect(result.rows[0].notes).to.be.an('array').that.is.empty;
  });

  it('updated_at updates on row modification', async () => {
    const insertResult = await testPool.query(`
      INSERT INTO chefs_recipes (slug, title, label, steps) 
      VALUES ('update-test', 'Update Test', 'Update Label', ARRAY['Step 1']) 
      RETURNING id, updated_at;
    `);

    const recipeId = insertResult.rows[0].id;
    const initialUpdatedAt = new Date(insertResult.rows[0].updated_at);

    // Small delay to ensure timestamps change
    await new Promise(res => setTimeout(res, 1000));

    await testPool.query(`
      UPDATE chefs_recipes SET title = 'Updated Title' WHERE id = $1
    `, [recipeId]);

    const updateResult = await testPool.query(`
      SELECT updated_at FROM chefs_recipes WHERE id = $1
    `, [recipeId]);

    const updatedTimestamp = new Date(updateResult.rows[0].updated_at);

    expect(updatedTimestamp).to.be.greaterThan(initialUpdatedAt);
  });

});