
export const createUsersTable = async (client) => {

	await client.sql`BEGIN;`;

	await client.sql`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`;

	await client.sql`CREATE TABLE users (
		id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
		username TEXT UNIQUE NOT NULL,
		password_hash TEXT NOT NULL,
		created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
	);`;

	await client.sql`CREATE TRIGGER trigger_update_updated_at
		BEFORE UPDATE ON users
		FOR EACH ROW
		EXECUTE FUNCTION update_updated_at_column();`;

	await client.sql`BEGIN;`;

	console.log('users table created');
};