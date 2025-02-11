import foods from '../../../data/foods.json' assert { type: "json" };
export const loadFoods = async (client) => {
	try {
		for (const food of foods) {
			await client.sql`INSERT INTO foods (name) VALUES (${food})`;
		}
		console.log('Foods loaded');
	} catch (err) {
		console.error('Error loading foods ', err);
	}
}