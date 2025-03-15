import { testPool } from "../../db/db.mjs";
import { expect } from "chai";


describe('chefs_recipe_ingrs table', () => {

  it('table exists', async () => {
    const result = await testPool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'chefs_recipe_ingrs'
      );
    `);
    expect(result.rows[0].exists).to.equal(true);
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
    expect(values).to.have.members(['drop', 'g', 'ml', 'liter', 'tsp', 'Tbsp', 'whole', 'pinch', 'percent', 'piece', 'cup', 'ounce']);
  });

  it('trigger exists', async () => {
    const result = await testPool.query(`
      SELECT tgname
      FROM pg_trigger
      WHERE tgname = 'update_chefs_recipes_ingrs_updated_at';
    `);
    expect(result.rows.length).to.equal(1);
  });
});