export const createRecipeSteps = async (client) => {
			// recipe_steps
		await client.sql`CREATE TABLE recipe_steps (
			id SERIAL PRIMARY KEY,
			step text NOT NULL,
			recipe_id INTEGER NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
			UNIQUE (recipe_id, step)
		);`

		console.log('recipe_steps table created');
}