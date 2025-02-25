import { Pool } from 'pg';

const pool = new Pool({
  user: 'your_user',
  host: 'your_host',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

describe('chefs_recipe_ingrs table', () => {
  beforeAll(async () => {
    // Run the migration script to create the table
    await pool.query(`
      BEGIN;
      CREATE TYPE IF NOT EXISTS measure_type AS ENUM ('drop', 'g', 'ml', 'l', 'tsp', 'Tbsp', 'whole', 'pinch', 'percent', 'piece', 'cup', 'ounce');
      CREATE TABLE IF NOT EXISTS chefs_recipe_ingrs (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
        recipe_id INT REFERENCES chefs_recipes(id),
        ingr_id INT REFERENCES ingrs(id),
        qty NUMERIC NOT NULL,
        measure measure_type NOT NULL,
        note TEXT
      );
      CREATE TRIGGER IF NOT EXISTS update_chefs_recipes_ingrs_updated_at
      BEFORE UPDATE ON chefs_recipe_ingrs
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
      COMMIT;
    `);
  });

  afterAll(async () => {
    // Clean up the database
    await pool.query(`
      DROP TRIGGER IF EXISTS update_chefs_recipes_ingrs_updated_at ON chefs_recipe_ingrs;
      DROP TABLE IF EXISTS chefs_recipe_ingrs;
      DROP TYPE IF EXISTS measure_type;
    `);
    await pool.end();
  });

  test('table exists', async () => {
    const result = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'chefs_recipe_ingrs'
      );
    `);
    expect(result.rows[0].exists).toBe(true);
  });

  test('columns have correct data types and constraints', async () => {
    const result = await pool.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'chefs_recipe_ingrs';
    `);
    const columns = result.rows;
    expect(columns).toEqual(expect.arrayContaining([
      { column_name: 'id', data_type: 'integer', is_nullable: 'NO' },
      { column_name: 'created_at', data_type: 'timestamp with time zone', is_nullable: 'NO' },
      { column_name: 'updated_at', data_type: 'timestamp with time zone', is_nullable: 'NO' },
      { column_name: 'recipe_id', data_type: 'integer', is_nullable: 'YES' },
      { column_name: 'ingr_id', data_type: 'integer', is_nullable: 'YES' },
      { column_name: 'qty', data_type: 'numeric', is_nullable: 'NO' },
      { column_name: 'measure', data_type: 'USER-DEFINED', is_nullable: 'NO' },
      { column_name: 'note', data_type: 'text', is_nullable: 'YES' },
    ]));
  });

  test('measure_type enum exists and has correct values', async () => {
    const result = await pool.query(`
      SELECT unnest(enum_range(NULL::measure_type)) AS value;
    `);
    const values = result.rows.map(row => row.value);
    expect(values).toEqual(['drop', 'g', 'ml', 'l', 'tsp', 'Tbsp', 'whole', 'pinch', 'percent', 'piece', 'cup', 'ounce']);
  });

  test('trigger exists', async () => {
    const result = await pool.query(`
      SELECT tgname
      FROM pg_trigger
      WHERE tgname = 'update_chefs_recipes_ingrs_updated_at';
    `);
    expect(result.rows.length).toBe(1);
  });
});