export const createRecipeIngredientsTable = async (client) => {
			// recipe_ingredients
		await client.sql`CREATE TABLE recipe_ingredients (
			id SERIAL PRIMARY KEY,
			ingredient VARCHAR(255) NOT NULL,
			recipe_id INTEGER NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
			UNIQUE (recipe_id, ingredient)
		);`

		console.log('recipe_ingredients table created');
}