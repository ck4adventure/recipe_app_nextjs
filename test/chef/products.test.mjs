import { testPool } from "../../db/db.mjs";
import { expect } from "chai";

// CREATE TABLE if NOT EXISTS products (
// 		id SERIAL PRIMARY KEY,
// 		created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
//    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
// 		name VARCHAR(255) NOT NULL,
// 		slug VARCHAR(255) NOT NULL CONSTRAINT product_slug_unique UNIQUE,
// 		category VARCHAR(255) DEFAULT 'misc.' NOT NULL,
// 		description VARCHAR(255),
// 		steps TEXT [] NOT NULL DEFAULT '{}',
// 		notes TEXT [] NOT NULL DEFAULT '{}'
// );

describe('products table schema', () => {
  
  it('table exists', async () => {
    const result = await testPool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables WHERE table_name = 'products'
      );
    `);
    expect(result.rows[0].exists).to.be.true;
  });

  it('columns have correct data types and constraints', async () => {
    const result = await testPool.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'products';
    `);
    const columns = result.rows;

    expect(columns).to.deep.include.members([
      { column_name: 'id', data_type: 'integer', is_nullable: 'NO' },
      { column_name: 'created_at', data_type: 'timestamp with time zone', is_nullable: 'NO' },
      { column_name: 'updated_at', data_type: 'timestamp with time zone', is_nullable: 'NO' },
      { column_name: 'name', data_type: 'character varying', is_nullable: 'NO' },
      { column_name: 'slug', data_type: 'character varying', is_nullable: 'NO' },
      { column_name: 'category', data_type: 'character varying', is_nullable: 'NO' },
      { column_name: 'description', data_type: 'character varying', is_nullable: 'YES' },
      { column_name: 'steps', data_type: 'ARRAY', is_nullable: 'NO' },
      { column_name: 'notes', data_type: 'ARRAY', is_nullable: 'NO' },
    ]);
  });

  it('slug column enforces uniqueness', async () => {
    await testPool.query(`
      INSERT INTO products (name, slug, category, description, steps)
      VALUES ('Test Product', 'unique_slug', 'tart', 'Test desc', ARRAY['Step 1']);
    `);

    try {
      await testPool.query(`
        INSERT INTO products (name, slug, category, description, steps)
        VALUES ('Another Product', 'unique_slug', 'tart', 'Another desc', ARRAY['Step A']);
      `);
      throw new Error('Expected unique constraint violation, but query succeeded');
    } catch (error) {
      expect(error.code).to.equal('23505'); // Unique constraint violation
      expect(error.constraint).to.equal('product_slug_unique');
    }
  });

  it('slug column has a unique constraint in schema', async () => {
    const result = await testPool.query(`
      SELECT constraint_name 
      FROM information_schema.constraint_column_usage 
      WHERE table_name = 'products' AND column_name = 'slug';
    `);
    
    const constraints = result.rows.map(row => row.constraint_name);
    expect(constraints).to.include('product_slug_unique');
  });

  it('default values are set correctly in schema', async () => {
    const result = await testPool.query(`
      SELECT column_name, column_default 
      FROM information_schema.columns 
      WHERE table_name = 'products' AND column_name IN ('category', 'steps', 'notes');
    `);

    const defaults = result.rows.reduce((acc, row) => {
      acc[row.column_name] = row.column_default;
      return acc;
    }, {});

    expect(defaults.category).to.include("'misc.'"); // Default category
    expect(defaults.steps).to.include("'{}'"); // Default empty array
    expect(defaults.notes).to.include("'{}'"); // Default empty array
  });

  it('default values are set correctly on insert', async () => {
    const result = await testPool.query(`
      INSERT INTO products (name, slug, description, steps)
      VALUES ('Default Test', 'test-defaults', 'Default desc', ARRAY['Step 1'])
      RETURNING category, notes;
    `);

    expect(result.rows[0].category).to.equal('misc.');
    expect(result.rows[0].notes).to.be.an('array').that.is.empty;
  });

  it('updated_at updates on row modification', async () => {
    const insertResult = await testPool.query(`
      INSERT INTO products (name, slug, description, steps) 
      VALUES ('Update Test', 'update-test', 'Update Description', ARRAY['Step 1']) 
      RETURNING id, updated_at;
    `);

    const productId = insertResult.rows[0].id;
    const initialUpdatedAt = new Date(insertResult.rows[0].updated_at);

    // Small delay to ensure timestamps change
    await new Promise(res => setTimeout(res, 1000));

    const updateResult = await testPool.query(`
      UPDATE products SET name = 'Updated Name' WHERE id = $1 RETURNING updated_at;
    `, [productId]);

    const updatedTimestamp = new Date(updateResult.rows[0].updated_at);

    expect(updatedTimestamp).to.be.greaterThan(initialUpdatedAt);
  });

});
