import fs from 'fs';
import path from 'path';
import { client } from '../db/db.mjs';

export const migrateTables = async () => {
	try {
		// first read in the files
		// then sort
		// then open the connection to client
		// then read in each file
		// catch any errors
		// and finallly end the client connection
		const files = fs.readdirSync(path.join(process.cwd(), 'db', 'migrations'));
		const sortedFiles = files.sort((a, b) => a.split('_')[0] - b.split('_')[0]);
		
		await client.connect();
		console.log('Client connected successfully');
		
		for (const file of sortedFiles) {
			const sql = fs.readFileSync(path.join(process.cwd(), 'db', 'migrations', file), 'utf-8');
			await client.query(sql);
		}
		console.log('Tables created successfully');
	} catch (error) {
		console.error(error);
	} finally {
		await client.end();
		console.log('Client disconnected successfully');
	}
}

migrateTables();