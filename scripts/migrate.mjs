import fs from 'fs';
import path from 'path';


export const migrateTables = async (pool) => {
	try {
		// first read in the files
		// then sort
		// then open the connection to client
		// then read in each file
		// catch any errors
		// and finallly end the client connection
		const files = fs.readdirSync(path.join(process.cwd(), 'db', 'migrations'));
		const sortedFiles = files.sort((a, b) => a.split('_')[0] - b.split('_')[0]);
		
		// await client.connect();
		console.log('Client connected successfully');
		
		for (const file of sortedFiles) {
			const sql = fs.readFileSync(path.join(process.cwd(), 'db', 'migrations', file), 'utf-8');
			await pool.query(sql);
		}
		console.log('Tables created successfully');
	} catch (error) {
		console.error(error);
	} 
}

// migrateTables();