// scripts/seed.ts

// runs with  node --loader ts-node/esm scripts/seed_users_neon.ts
// use bcryptjs (pure JS, no native build) so it runs with `npx tsx`/ts-node
import bcrypt from "bcryptjs"

import { createClient } from '@vercel/postgres';
import * as dotenv from "dotenv";

import { v4 as uuidv4 } from "uuid";

// Load environment variables from .env file
dotenv.config();


const seedUsers = async () => {
	// console.log("setting up db", process.env.POSTGRES_URL_NON_POOLING);
	const client = createClient({
		connectionString: process.env.POSTGRES_URL_NON_POOLING
	});
	try {
		await client.connect();
		console.log("client connected");


		const users = [
			{ id: uuidv4(), username: process.env.CLAY_USERNAME, password: process.env.CLAY_PASSWORD },
		];

		for (const { id, username, password } of users) {
			if (!username || !password || !id) {
				throw new Error("Id, Username, and password must be defined");
			}

			// bcryptjs doesn't provide a Promise-based hash by default — use the
			// synchronous variant for this small one-off script.
			const hash = bcrypt.hashSync(password, 12);
			await client.query(
				`INSERT INTO users (id, username, password_hash)
       VALUES ($1, $2, $3)
       ON CONFLICT (username) DO NOTHING`,
				[id, username, hash]
			);
			console.log("seeded user: ", username);
		}
		console.log("users seeded")

	} catch (error) {
		console.error(error);
		throw error;
	} finally {
		await client.end();
		console.log("should be disconnected")
	}


}

seedUsers();
