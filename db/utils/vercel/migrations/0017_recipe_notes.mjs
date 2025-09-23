export const createRecipeNotesTable = async (client) => {
			// recipe_notes
		await client.sql`CREATE TABLE recipe_notes (
			id SERIAL PRIMARY KEY,
			note text NOT NULL,
			recipe_id INTEGER NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
			UNIQUE (recipe_id, note)
		);`

		console.log('recipe_notes table created');
}