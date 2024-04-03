// read the folders of the data folder and parse
// author name then types, then source title, finally recipes
// and insert them into the database

import fs from 'fs';
import path from 'path';
import authorsData from '../../data/authors-sources.json' assert { type: "json" };

const dataDir = path.join(process.cwd(), 'data');
const dataFolders = fs.readdirSync(dataDir);

const createAuthorQuery = `
	INSERT INTO authors (author_name, author_slug, is_profi) VALUES ($1, $2, $3) RETURNING id
`;

export const loadData = async (client) => {
	// first read in authors and sources data
	try {
		for (const authorObject of authorsData) {
			const { author_name, author_slug, is_profi, sources } = authorObject;
			const authorResult = await client.query(createAuthorQuery, [author_name, author_slug, is_profi]);
			const authorId = authorResult.rows[0].id;
			console.log(`Author ${author_name} inserted with id ${authorId}`);
		}
	} catch (error) {
		console.error('Error loading authors and sources', error);
		throw error;
	} 

}