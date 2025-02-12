export const createLeavenTable = async (client) => {
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

		console.log('leaven table created');
};