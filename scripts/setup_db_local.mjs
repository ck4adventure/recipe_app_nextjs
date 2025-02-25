import { pool } from '../db/db.mjs'

import { dropLocalTables } from '../db/utils/local/drop.mjs'
import { migrateLocalTables } from '../db/utils/local/migrate.mjs';
// import { loadLocalData } from '../db/utils/local/loadData.mjs';
// import { loadData2 } from '../db/utils/local/loadData2.mjs';
import { loadIngrsLocal } from '../db/utils/local/loadIngrsLocal.mjs';
import { loadIngredientRecipes } from '../db/utils/local/loadIngredientRecipes.mjs';
import { loadChefsRecipesAndIngrs } from '../db/utils/local/loadChefsRecipesAndIngrs.mjs';


// sets up LOCAL PG instance according to that syntax
const setupDB = async () => {
	const client = await pool.connect();
	console.log("pool connected");
	try {

		await dropLocalTables(client);
		
		await migrateLocalTables(client);
		
		// await loadLocalData(client);
		// await loadData2(client);
		await loadIngrsLocal(client);


		await loadIngredientRecipes(client);
		await loadChefsRecipesAndIngrs(client);
	
	} catch (error) {
		console.error(error);
		throw error;
	} finally {
		client.release();
		console.log("pool should be closed now");
	}
}

setupDB();