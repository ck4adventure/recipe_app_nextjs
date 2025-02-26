import categoriesData from '../../../../data/categories.json' assert { type: "json" };

export const loadCategories = async (client) => {

	try {

		// next create the categories
		for (const category of categoriesData) {
			await client.sql`INSERT INTO categories (name) VALUES (${category})`;
		}
		console.log('Categories loaded');
	} catch (err) {
		console.error('Error loading categories ', err);
	}
}