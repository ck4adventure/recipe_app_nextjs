export const createDoughTable = async (client) => {

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
		await client.sql`CREATE TRIGGER update_dough_updated_at
			BEFORE UPDATE ON dough
			FOR EACH ROW
			EXECUTE FUNCTION update_updated_at_column();
		`;
		
		console.log('dough table created');
}