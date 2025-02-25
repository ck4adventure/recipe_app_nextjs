		// -- Create a function to update the updated_at column, to be used as needed
export const createUpdateFunction = async (client) => {		
		await client.sql`CREATE OR REPLACE FUNCTION update_updated_at_column()
			RETURNS TRIGGER AS $$
			BEGIN
				NEW.updated_at = CURRENT_TIMESTAMP;
				RETURN NEW;
			END;
			$$ LANGUAGE plpgsql;
		`;
		console.log("update_updated_at_column function created");
};