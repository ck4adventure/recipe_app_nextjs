

// first read in the files, then sort
// then open the connection to client
// then read in each file
// catch any errors
// and finallly end the client connection
// migrateTables takes a pool/client and runs all sql migrations in numerical order
export const migrateTables = async (client) => {
	try {
		console.log('Migrating tables...');
		// -- Create a function to update the updated_at column, to be used as needed
		await client.sql`CREATE OR REPLACE FUNCTION update_updated_at_column()
			RETURNS TRIGGER AS $$
			BEGIN
				NEW.updated_at = CURRENT_TIMESTAMP;
				RETURN NEW;
			END;
			$$ LANGUAGE plpgsql;
		`;

		// authors
		await client.sql`CREATE TABLE authors (
			id serial primary key,
			name VARCHAR(255) NOT NULL CONSTRAINT author_name_unique UNIQUE,
			is_profi boolean DEFAULT true,
			slug VARCHAR(255) GENERATED ALWAYS AS (lower(regexp_replace(regexp_replace(name, '[^a-zA-Z0-9 ]', '', 'g'), ' +', '-', 'g'))) STORED,
			CONSTRAINT author_slug_unique UNIQUE (slug)
		);`
		console.log('Authors table created');

		// source types enum
		await client.sql`CREATE TYPE sourcetyp AS ENUM ('BOOK', 'SITE', 'PERSONAL');`

		// sources
		await client.sql`CREATE TABLE sources (
			id serial primary key,
			source_type sourcetyp DEFAULT 'BOOK',
			title varchar(500) NOT NULL CONSTRAINT source_title_unique UNIQUE,
			source_url varchar(2000) CONSTRAINT source_url_required_for_site CHECK ((source_type = 'SITE' AND source_url IS NOT NULL) OR source_type <> 'SITE'),
			slug VARCHAR(255) GENERATED ALWAYS AS (lower(regexp_replace(regexp_replace(title, '[^a-zA-Z0-9 ]', '', 'g'), ' +', '-', 'g'))) STORED,
			CONSTRAINT source_slug_unique UNIQUE (slug),
			single_author boolean DEFAULT TRUE
		);`

		console.log('Sources table created');

		// foods
		await client.sql`CREATE TABLE foods (
			id SERIAL PRIMARY KEY,
			name VARCHAR(255) NOT NULL CONSTRAINT food_name_unique UNIQUE
		);`

		console.log('Foods table created');

		// categories
		await client.sql`CREATE TABLE IF NOT EXISTS categories (
			id SERIAL PRIMARY KEY,
			name VARCHAR(40) NOT NULL CONSTRAINT category_name_unique UNIQUE,
			slug VARCHAR(255) GENERATED ALWAYS AS (lower(regexp_replace(regexp_replace(name, '[^a-zA-Z0-9 ]', '', 'g'), ' +', '-', 'g'))) STORED,
			CONSTRAINT category_slug_unique UNIQUE (slug)
		);`

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

		// recipe_ingredients
		await client.sql`CREATE TABLE recipe_ingredients (
			id SERIAL PRIMARY KEY,
			ingredient VARCHAR(255) NOT NULL,
			recipe_id INTEGER NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
			UNIQUE (recipe_id, ingredient)
		);`

		// recipe_steps
		await client.sql`CREATE TABLE recipe_steps (
			id SERIAL PRIMARY KEY,
			step text NOT NULL,
			recipe_id INTEGER NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
			UNIQUE (recipe_id, step)
		);`

		// loafer
		
		await client.sql`CREATE TABLE leaven (
			id SERIAL PRIMARY KEY,
			created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
			updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
			water_amt INTEGER,
			water_temp INTEGER,
			starter_amt INTEGER,
			flour_amt INTEGER,
			start_time TIMESTAMPTZ,
			start_temp INTEGER,
			end_time TIMESTAMPTZ,
			end_temp INTEGER
		);`;

		// -- Create a trigger to automatically update the updated_at column on update
		await client.sql`CREATE TRIGGER update_leaven_updated_at
			BEFORE UPDATE ON leaven
			FOR EACH ROW
			EXECUTE FUNCTION update_updated_at_column();
		`;

		// create flour_blend_type enum before table
		await client.sql`CREATE TYPE flour_blend_type AS ENUM ('white', 'cottage', 'rye', '50/50', 'complet', 'integraal');`

		// dough
		await client.sql`CREATE TABLE dough (
			id SERIAL PRIMARY KEY,
			created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
			updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
			water_amt INTEGER,
			water_temp INTEGER,
			leaven_amt INTEGER,
			flour_amt INTEGER,
			flour_blend flour_blend_type,
			start_time TIMESTAMPTZ,
			start_temp INTEGER,
			salt_time TIMESTAMPTZ,
			end_time TIMESTAMPTZ,
			end_temp INTEGER
		);`;

			// -- Create a trigger to automatically update the updated_at column on update
		await client.sql`CREATE TRIGGER update_leaven_updated_at
			BEFORE UPDATE ON dough
			FOR EACH ROW
			EXECUTE FUNCTION update_updated_at_column();
		`;
		
		console.log('Tables migrated successfully');
	} catch (error) {
		console.error(error);
	}
}

// migrateTables();