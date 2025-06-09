import bcrypt from "bcrypt";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();
export const loadUsers = async (client) => {

	try {
			const users = [
					{ username: process.env.MY_USERNAME, password: process.env.MY_PASSWORD },
				];
		
				for (const { username, password } of users) {
					if (!username || !password) {
						throw new Error("Username and password must be defined");
					}
					const hash = await bcrypt.hash(password, 12);
					await client.sql`INSERT INTO users (username, password_hash)
					 VALUES (${username}, ${hash})`;
				}
				console.log("users seeded")


	} catch (err) {
		console.error('Error loading users ', err);
	}
}