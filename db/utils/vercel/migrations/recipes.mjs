export const createRecipesTable = async (client) => {
			// recipes
		await client.sql`CREATE TABLE recipes (
	  	id SERIAL PRIMARY KEY,
			title VARCHAR(255) NOT NULL CONSTRAINT recipe_title_unique UNIQUE,
			slug VARCHAR(255) GENERATED ALWAYS AS (lower(regexp_replace(regexp_replace(title, '[^a-zA-Z0-9 ]', '', 'g'), ' +', '-', 'g'))) STORED,
			CONSTRAINT recipe_slug_unique UNIQUE (slug),
			author_id INTEGER REFERENCES authors(id) ON DELETE SET NULL,
			source_id INTEGER REFERENCES sources(id) ON DELETE SET NULL,
			category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL
		);`

		console.log('recipes table created');
};