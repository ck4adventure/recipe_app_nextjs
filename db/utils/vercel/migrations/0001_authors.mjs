		// authors
export const createAuthorsTable = async (client) => { 
		await client.sql`CREATE TABLE authors (
			id serial primary key,
			name VARCHAR(255) NOT NULL CONSTRAINT author_name_unique UNIQUE,
			is_profi boolean DEFAULT true,
			slug VARCHAR(255) GENERATED ALWAYS AS (lower(regexp_replace(regexp_replace(name, '[^a-zA-Z0-9 ]', '', 'g'), ' +', '-', 'g'))) STORED,
			CONSTRAINT author_slug_unique UNIQUE (slug)
		);`
		console.log('Authors table created');
};