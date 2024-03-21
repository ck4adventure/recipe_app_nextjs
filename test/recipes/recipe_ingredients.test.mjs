// recipe_ingredients table tests
// should exist
// columns: id, recipe_id, ingredient 
// FK recipe_id references recipes.id, on delete cascade
// ingredient is required, varchar(255) (simple string for now)
// deleting an ingredient does NOT delete the recipe

describe('RecipeIngredients table', () => {
	context('columns', () => {
		it('has a recipe_id column', async () => {
			const result = await testPool.query(`
				SELECT column_name
				FROM information_schema.columns
				WHERE table_name = 'recipe_ingredients'
			`);
			const columnNames = result.rows.map((row) => row.column_name);
			expect(columnNames).to.include('recipe_id');
		});
		it('recipe_id should be a foreign key to the recipes table', async () => {
			const result = await testPool.query(`
				SELECT constraint_name
				FROM information_schema.table_constraints
				WHERE table_name = 'recipe_ingredients' AND constraint_type = 'FOREIGN KEY'
			`);
			const constraintNames = result.rows.map((row) => row.constraint_name);
			expect(constraintNames).to.include('recipe_ingredients_recipe_id_fkey');
		});

		it('has an ingredient column', async () => {
			const result = await testPool.query(`
				SELECT column_name
				FROM information_schema.columns
				WHERE table_name = 'recipe_ingredients'
			`);
			const columnNames = result.rows.map((row) => row.column_name);
			expect(columnNames).to.include('ingredient');
		});
		it('ingredient should be a varchar(255)', async () => {
			const result = await testPool.query(`
				SELECT data_type
				FROM information_schema.columns
				WHERE table_name = 'recipe_ingredients' AND column_name = 'ingredient'
			`);
			const dataType = result.rows[0].data_type;
			expect(dataType).to.equal('character varying');
		});
	});
	context('creating entries', () => {
		it('should allow a recipe to have multiple ingredients', async () => {
			// create a recipe with a title
			const recipeResult = await testPool.query('INSERT INTO recipes (title) VALUES ($1) RETURNING id', ['ingredient test recipe']);
			const recipeId = recipeResult.rows[0].id;
			expect(recipeId).to.be.a('number');
			// add ingredients to the recipe
			const ingredientResult = await testPool.query('INSERT INTO recipe_ingredients (recipe_id, ingredient) VALUES ($1, $2), ($1, $3)', [recipeId, 'ingredient1', 'ingredient2']);
			expect(ingredientResult.rowCount).to.equal(2);
		});
		it('should not allow a recipe to have duplicate ingredients', async () => {
			// create a recipe with a title
			const recipeResult = await testPool.query('INSERT INTO recipes (title) VALUES ($1) RETURNING id', ['ingredient test recipe']);
			const recipeId = recipeResult.rows[0].id;
			expect(recipeId).to.be.a('number');
			// add ingredients to the recipe
			const ingredientResult = await testPool.query('INSERT INTO recipe_ingredients (recipe_id, ingredient) VALUES ($1, $2), ($1, $2)', [recipeId, 'ingredient1']);
			// probably this will need to be changed, likely db will error out before this point
			expect(ingredientResult.rowCount).to.equal(1);
		});
	});
	context('deleting entries', () => {
		it('should delete all of a recipes entries when a recipe is deleted', async () => {
			// create a recipe with a title
			const recipeResult = await testPool.query('INSERT INTO recipes (title) VALUES ($1) RETURNING id', ['delete test recipe']);
			const recipeId = recipeResult.rows[0].id;
			expect(recipeId).to.be.a('number');
			// add ingredients to the recipe
			const ingredientResult = await testPool.query('INSERT INTO recipe_ingredients (recipe_id, ingredient) VALUES ($1, $2), ($1, $3)', [recipeId, 'ingredient1', 'ingredient2']);
			expect(ingredientResult.rowCount).to.equal(2);
			// delete the recipe
			await testPool.query('DELETE FROM recipes WHERE id = $1', [recipeId]);
			// verify that the entries were deleted
			const result = await testPool.query('SELECT * FROM recipe_ingredients WHERE recipe_id = $1', [recipeId]);
			expect(result.rows).to.be.empty;
		});
		it('should not delete the recipe when an ingredient is deleted', async () => {
			// create a recipe with a title
			const recipeResult = await testPool.query('INSERT INTO recipes (title) VALUES ($1) RETURNING id', ['delete test recipe']);
			const recipeId = recipeResult.rows[0].id;
			expect(recipeId).to.be.a('number');
			// add ingredients to the recipe
			const ingredientResult = await testPool.query('INSERT INTO recipe_ingredients (recipe_id, ingredient) VALUES ($1, $2), ($1, $3)', [recipeId, 'ingredient1', 'ingredient2']);
			expect(ingredientResult.rowCount).to.equal(2);
			// delete the first ingredient
			await testPool.query('DELETE FROM recipe_ingredients WHERE recipe_id = $1 AND ingredient = $2', [recipeId, 'ingredient1']);
			// verify that the first ingredient was deleted
			const result = await testPool.query('SELECT * FROM recipe_ingredients WHERE recipe_id = $1 AND ingredient = $2', [recipeId, 'ingredient1']);
			expect(result.rows).to.be.empty;
			// verify that the recipe still exists
			const recipeResult2 = await testPool.query('SELECT * FROM recipes WHERE id = $1', [recipeId]);
			expect(recipeResult2.rowCount).to.be.gte(1);
		});
	});
});