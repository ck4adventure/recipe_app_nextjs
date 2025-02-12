export const createFoodsTable = async (client) => {
			// foods
		await client.sql`CREATE TABLE foods (
			id SERIAL PRIMARY KEY,
			name VARCHAR(255) NOT NULL CONSTRAINT food_name_unique UNIQUE
		);`

		console.log('Foods table created');
} 