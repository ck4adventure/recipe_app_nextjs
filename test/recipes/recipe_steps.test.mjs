// recipe steps table
// should exist
// columns: step, recipe_id
// FK recipe_id references recipes.id, on delete cascade
// step is required, text field
// deleting a step does NOT delete the recipe
// deleting a recipe deletes all steps

import { expect } from 'chai';
import { testPool } from '../../db/db.mjs';

describe('recipe_steps table', () => {
		afterEach(async () => {
		// delete all entries in the recipes, categories, recipe_categories and recipe_ingredients table
		await testPool.query('DELETE FROM recipe_steps');
		await testPool.query('DELETE FROM recipes');
	});
	context('columns', () => {
		it('has a recipe_id column', async () => {
			const result = await testPool.query(`
				SELECT column_name
				FROM information_schema.columns
				WHERE table_name = 'recipe_steps'
			`);
			const columnNames = result.rows.map((row) => row.column_name);
			expect(columnNames).to.include('recipe_id');
		});
		it('recipe_id should be a foreign key to the recipes table', async () => {
			const result = await testPool.query(`
				SELECT constraint_name
				FROM information_schema.table_constraints
				WHERE table_name = 'recipe_steps' AND constraint_type = 'FOREIGN KEY'
			`);
			const constraintNames = result.rows.map((row) => row.constraint_name);
			expect(constraintNames).to.include('recipe_steps_recipe_id_fkey');
		});
		it('has a step column', async () => {
			const result = await testPool.query(`
				SELECT column_name
				FROM information_schema.columns
				WHERE table_name = 'recipe_steps'
			`);
			const columnNames = result.rows.map((row) => row.column_name);
			expect(columnNames).to.include('step');
		});
		it('step should be a text field', async () => {
			const result = await testPool.query(`
				SELECT data_type
				FROM information_schema.columns
				WHERE table_name = 'recipe_steps' AND column_name = 'step'
			`);
			const dataType = result.rows[0].data_type;
			expect(dataType).to.equal('text');
		});
	});
	context('creating entries', () => {
		it('should allow a recipe to have multiple steps', async () => {
			// create a recipe with a title
			const recipeResult = await testPool.query('INSERT INTO recipes (title) VALUES ($1) RETURNING id', ['step test recipe']);
			const recipeId = recipeResult.rows[0].id;
			// create multiple steps for the recipe
			await testPool.query('INSERT INTO recipe_steps (recipe_id, step) VALUES ($1, $2)', [recipeId, 'step 1']);
			await testPool.query('INSERT INTO recipe_steps (recipe_id, step) VALUES ($1, $2)', [recipeId, 'step 2']);
			await testPool.query('INSERT INTO recipe_steps (recipe_id, step) VALUES ($1, $2)', [recipeId, 'step 3']);
			// get the steps for the recipe
			const { rows } = await testPool.query('SELECT step FROM recipe_steps WHERE recipe_id = $1', [recipeId]);
			expect(rows.length).to.equal(3);
			expect(rows[0].step).to.equal('step 1');
			expect(rows[1].step).to.equal('step 2');
			expect(rows[2].step).to.equal('step 3');
		});
		it('should allow a step to be deleted without deleting the recipe', async () => {
			// create a recipe with a title
			const recipeResult = await testPool.query('INSERT INTO recipes (title) VALUES ($1) RETURNING id', ['step test recipe']);
			const recipeId = recipeResult.rows[0].id;
			// create a step for the recipe
			const stepResult = await testPool.query('INSERT INTO recipe_steps (recipe_id, step) VALUES ($1, $2) RETURNING id', [recipeId, 'step 1']);
			const stepId = stepResult.rows[0].id;
			// delete the step
			await testPool.query('DELETE FROM recipe_steps WHERE id = $1', [stepId]);
			// get the steps for the recipe
			const { rows } = await testPool.query('SELECT step FROM recipe_steps WHERE recipe_id = $1', [recipeId]);
			expect(rows.length).to.equal(0);
		});
	});
	context('deleting a recipe', () => {
		it('should delete all steps associated with the recipe', async () => {
			// create a recipe with a title
			const recipeResult = await testPool.query('INSERT INTO recipes (title) VALUES ($1) RETURNING id', ['step test recipe']);
			const recipeId = recipeResult.rows[0].id;
			// create multiple steps for the recipe
			await testPool.query('INSERT INTO recipe_steps (recipe_id, step) VALUES ($1, $2)', [recipeId, 'step 1']);
			await testPool.query('INSERT INTO recipe_steps (recipe_id, step) VALUES ($1, $2)', [recipeId, 'step 2']);
			await testPool.query('INSERT INTO recipe_steps (recipe_id, step) VALUES ($1, $2)', [recipeId, 'step 3']);
			// delete the recipe
			await testPool.query('DELETE FROM recipes WHERE id = $1', [recipeId]);
			// get the steps for the recipe
			const { rows } = await testPool.query('SELECT step FROM recipe_steps WHERE recipe_id = $1', [recipeId]);
			expect(rows.length).to.equal(0);
		});
	});
	context("deleting a step", () => {
		it("should not delete the recipe", async () => {
			// create a recipe with a title
			const recipeResult = await testPool.query('INSERT INTO recipes (title) VALUES ($1) RETURNING id', ['step test recipe']);
			const recipeId = recipeResult.rows[0].id;
			// create a step for the recipe
			const stepResult = await testPool.query('INSERT INTO recipe_steps (recipe_id, step) VALUES ($1, $2) RETURNING id', [recipeId, 'step 1']);
			const stepId = stepResult.rows[0].id;
			// delete the step
			await testPool.query('DELETE FROM recipe_steps WHERE id = $1', [stepId]);
			// get the recipe
			const recipe = await testPool.query('SELECT * FROM recipes WHERE id = $1', [recipeId]);
			expect(recipe.rows.length).to.equal(1);
		});
	});
});