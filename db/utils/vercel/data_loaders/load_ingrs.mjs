// import foods from '../../../../data/foods.json' assert { type: "json" };
import chocolates from '../../../../recipe_store/ingrs/chocolates.mjs'

export const loadIngrsData = async (client) => {
	try {
		const keys = Object.keys(chocolates);
		for (const key of keys) {
			const item = chocolates[key];
			console.log('processing: ', key)
			if (!item.allergens) item.allergens = [];
			await client.sql`INSERT INTO ingrs (
					category,
					slug,
					brand, 
					packaged_name, 
					label_name, 
					ingredients, 
					allergens
			) VALUES (        
					'chocolate',
					${key},
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