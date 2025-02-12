// import foods from '../../../../data/foods.json' assert { type: "json" };
import chocolates from '../../../../recipe_store/ingrs/chocolates.mjs'

export const loadFoods = async (client) => {
	try {
		for (const item of chocolates) {
			await client.sql`INSERT INTO ingrs (
					brand, 
					packaged_name, 
					label_name, 
					ingredients, 
					allergens
			) VALUES (          
					${item.brand}, 
          ${item.name}, 
          ${item.label}, 
          ${item.ingredients}, 
          ${item.allergens})`;
		}
		console.log('ingrs loaded');
	} catch (err) {
		console.error('Error loading ingrs lists ', err);
	}
}