// recipe_categories
// schema/table tests
// columns: id, FK recipe_id, FK category_id
import { testPool } from '../../db/db.mjs';
describe('recipe_categories joins table', () => {
	context('columns', () => {
		it('should have a column id', async () => {
			const result = await testPool.query(`
				SELECT constraint_name
				FROM information_schema.table_constraints
				WHERE table_name = 'recipe_categories' AND constraint_type = 'FOREIGN KEY'
			`);
			const constraintNames = result.rows.map((row) => row.constraint_name);
			expect(constraintNames).to.include('recipe_categories_recipe_id_fkey');
		});
		it('should have a column category_id', async () => {
			const result = await testPool.query(`
				SELECT column_name
				FROM information_schema.columns
				WHERE table_name = 'recipe_categories'
			`);
			const columnNames = result.rows.map((row) => row.column_name);
			expect(columnNames).to.include('category_id');
		});
		it('category key should be a foreign key to the categories table', async () => {
			const result = await testPool.query(`
				SELECT constraint_name
				FROM information_schema.table_constraints
				WHERE table_name = 'recipe_categories' AND constraint_type = 'FOREIGN KEY'
			`);
			const constraintNames = result.rows.map((row) => row.constraint_name);
			expect(constraintNames).to.include('recipe_categories_category_id_fkey');
		});
	});
});