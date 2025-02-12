import authorsData from '../../../../data/authors-sources.json' assert { type: "json" };

export const loadAuthorsAndSources = async (client) => {

	try {
		// first read in authors and sources data
		for (const authorObject of authorsData) {
			const { author_name, author_slug, is_profi, sources } = authorObject;

			// create author
			await client.sql`INSERT INTO authors (name, is_profi) VALUES (${author_name}, ${is_profi});`

			// iterate the authors sources
			if (sources) {
				for (const sourceObject of sources) {
					const { source_title, source_url, source_type } = sourceObject;

					// create source
					await client.sql`INSERT INTO sources (title, source_url, source_type) VALUES (${source_title}, ${source_url}, ${source_type})`;
				}
			}
		}
	} catch (error) {
		console.error('Error loading authors and sources ', error);
	}
}
