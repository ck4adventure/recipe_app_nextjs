// recipe_categories
// schema/table tests
// columns: id, FK recipe_id, FK category_id
import exp from 'constants';
import { testPool } from '../../db/db.mjs';
import { expect } from 'chai';
describe('recipe_categories joins table', () => {
	afterEach(async () => {
		// delete anything created during testing
		await testPool.query('DELETE FROM recipe_categories WHERE id < 100');
		await testPool.query('DELETE FROM recipes WHERE id < 100');
		await testPool.query('DELETE FROM categories WHERE id < 100');
	});
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
		it('recipes key should be a foreign key to the recipes table', async () => {
			const result = await testPool.query(`
				SELECT constraint_name
				FROM information_schema.table_constraints
				WHERE table_name = 'recipe_categories' AND constraint_type = 'FOREIGN KEY'
			`);
			const constraintNames = result.rows.map((row) => row.constraint_name);
			expect(constraintNames).to.include('recipe_categories_recipe_id_fkey');
		});
		it('should delete all of a recipes entries when a recipe is deleted', async () => {
			// create a recipe with a title
			const recipeResult = await testPool.query('INSERT INTO recipes (title) VALUES ($1) RETURNING id', ['delete test recipe']);
			const recipeId = recipeResult.rows[0].id;
			expect(recipeId).to.be.a('number');
			// create a category
			const catResult = await testPool.query('INSERT INTO categories (name) VALUES ($1) RETURNING id', ['delete test category']);
			const catId = catResult.rows[0].id;
			expect(catId).to.be.a('number');
			// add recipe to existing category
			const entryRow = await testPool.query('INSERT INTO recipe_categories (recipe_id, category_id) VALUES ($1, $2) RETURNING id', [recipeId, catId]);
			const entryId = entryRow.rows[0].id;
			expect(entryId).to.be.a('number');
			// delete the recipe
			await testPool.query('DELETE FROM recipes WHERE id = $1', [recipeId]);
			// verify that the entry was deleted
			const result = await testPool.query('SELECT * FROM recipe_categories WHERE recipe_id = $1', [recipeId]);
			expect(result.rows).to.be.empty;
		})
	});
});